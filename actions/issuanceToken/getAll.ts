import { IssuanceTokenModel } from '../../models'
import type {
  GetAllIssuanceTokensParams,
  IsuanceTokensResponse,
} from '../../types'
import issuanceToken from '.'

export default async function (
  options?: GetAllIssuanceTokensParams
): Promise<IsuanceTokensResponse> {
  const { page = 1, limit = 10, sortBy } = options || {}

  const skip = (page - 1) * limit // Calculate the number of items to skip

  // Prepare sorting options for MongoDB
  let sortOptions: any = { 'marketCap.collateral': 'desc' }

  if (sortBy) {
    const [field, order] = sortBy.split(':')
    sortOptions = { [field]: order }
  }

  // Fetch paginated and sorted tokens
  const orchestratorAddresses = await IssuanceTokenModel.find(
    {},
    { orchestratorAddress: 1 }
  )
    .sort(sortOptions)
    .collation({ locale: 'en_US', numericOrdering: true })
    .skip(skip)
    .limit(limit)

  const pruned = await Promise.all(
    orchestratorAddresses.map(async ({ orchestratorAddress }) => {
      return await issuanceToken.get({ address: orchestratorAddress })
    })
  )

  // Optionally, fetch the total count of items for pagination metadata
  const totalCount = await IssuanceTokenModel.countDocuments()

  // Return paginated data along with pagination details
  const result = {
    data: pruned,
    pagination: {
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    },
  } satisfies IsuanceTokensResponse

  return result
}
