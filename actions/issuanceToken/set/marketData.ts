import { IssuanceTokenModel } from '../../../models'
import issuanceToken, { getTokenQuery } from '..'
import type { SetMarketDataParams } from '../../../types'

export default async function (params: SetMarketDataParams) {
  // this has to be orchestrator address because initially there is no other address
  const address = params.token.orchestratorAddress

  await issuanceToken.status.set({ address, status: 'PENDING' })

  const marketData = await issuanceToken.get.marketData(params)

  const newToken = await IssuanceTokenModel.findOneAndUpdate(
    getTokenQuery(address),
    { $set: { ...marketData, status: 'FRESH' } },
    {
      new: true,
    }
  )

  if (!newToken) throw new Error('Token not found')

  const { _id, ...rest } = newToken.toObject()
  const pruned = { ...rest, id: _id.toString() }

  return pruned
}
