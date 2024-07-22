import { IssuanceTokenModel } from '../../models'
import { getTokenQuery } from '.'

export default async function ({
  address,
  fresh,
  latestTransactionId,
}: {
  address: string
  fresh: boolean
  latestTransactionId?: string
}) {
  await IssuanceTokenModel.updateOne(getTokenQuery(address), {
    // if latestTransactionId is provided, set it else just set fresh
    $set: latestTransactionId ? { fresh, latestTransactionId } : { fresh },
  })

  return fresh
}
