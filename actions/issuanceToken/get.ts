import { IssuanceTokenModel } from '../../models'
import issuanceToken, { getTokenQuery } from '.'
import type { GetIssuanceTokenParams } from '../../types'

export default async function (params: GetIssuanceTokenParams) {
  const { address, swap } = params

  await issuanceToken.status.waitUntilNotPending({ address })

  await issuanceToken.status.checkAndSet({
    address,
    latestTransactionId: swap?.id,
  })

  const token = await IssuanceTokenModel.findOne(getTokenQuery(address))

  if (!token) throw new Error('Token not found')

  const { _id, ...rest } = token.toObject()
  const pruned = { ...rest, id: _id.toString() }

  // if not fresh or not found, set market data
  if (pruned?.status === 'STALE')
    return await issuanceToken.setMarketData({
      token: pruned,
    })

  return pruned
}
