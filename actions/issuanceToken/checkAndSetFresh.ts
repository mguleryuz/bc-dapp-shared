import { IssuanceTokenModel } from '../../models'
import issuanceToken, { getTokenQuery } from '.'

export default async function ({
  address,
  latestTransactionId: latestTransactionIdParam,
}: {
  address: string
  latestTransactionId?: string
}) {
  // Retrieve the previous token for the address
  let prevToken = (
    await IssuanceTokenModel.findOne(
      getTokenQuery(address),
      'fresh fundingManagerAddress latestTransactionId'
    )
  )?.toObject()

  // If token not found, throw an error
  if (!prevToken?.fundingManagerAddress) throw new Error('Token not found')

  // Retrieve the latest transaction ID
  const latestTransactionId =
    latestTransactionIdParam ??
    (await issuanceToken.graph.getLatestSwapId(prevToken.fundingManagerAddress))
  // Define previous transaction ID
  const prevTransactionId = prevToken.latestTransactionId

  const isNotInitialized =
    !prevToken.fresh && !prevTransactionId && !latestTransactionId
  const hasSameTransactionId = prevTransactionId === latestTransactionId

  const fresh = !isNotInitialized && hasSameTransactionId

  // If not fresh, update the token's state
  if (!fresh)
    issuanceToken.setFresh({
      address,
      fresh,
      latestTransactionId,
    })

  return fresh
}
