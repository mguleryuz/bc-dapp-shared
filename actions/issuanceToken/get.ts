import { IssuanceTokenModel } from '../../models'
import issuanceToken, { getTokenQuery } from '.'
import type { GetIssuanceTokenParams } from '../../types'

export default async function (params: GetIssuanceTokenParams) {
  const { address, latestTransactionId } = params

  await issuanceToken.pending.waitUntilNot({ address })

  await issuanceToken.fresh.checkAndSet({ address, latestTransactionId })

  const token = await IssuanceTokenModel.findOne(getTokenQuery(address))

  if (!token) throw new Error('Token not found')

  const { _id, ...rest } = token.toObject()
  const pruned = { ...rest, id: _id.toString() }

  // if not fresh or not found, set market data
  if (!pruned?.fresh)
    return await issuanceToken.setMarketData({
      chainId: pruned.chainId,
      orchestratorAddress: pruned.orchestratorAddress,
      address: pruned.address,
      decimals: pruned.decimals,
      fundingManagerAddress: pruned.fundingManagerAddress,
    })

  return pruned
}
