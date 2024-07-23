import { IssuanceTokenModel } from '../../models'
import issuanceToken, { getTokenQuery } from '.'

export type SetMarketDataRequest = {
  chainId: number
  decimals: number
  orchestratorAddress: string
  address?: string
  fundingManagerAddress?: string
}

export default async function (params: SetMarketDataRequest) {
  // this has to be orchestrator address because initially there is no other address
  const address = params.orchestratorAddress

  await issuanceToken.pending.set({ address, pending: true })

  const marketData = await issuanceToken.getMarketData(params)

  const newToken = await IssuanceTokenModel.findOneAndUpdate(
    getTokenQuery(address),
    { $set: { ...marketData, fresh: true, pending: false } },
    {
      new: true,
    }
  )

  if (!newToken) throw new Error('Token not found')

  const { _id, ...rest } = newToken.toObject()
  const pruned = { ...rest, id: _id.toString() }

  return pruned
}
