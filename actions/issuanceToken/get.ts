import issuanceToken from '.'
import type { GetIssuanceTokenParams } from '../../types'

export default async function (params: GetIssuanceTokenParams) {
  const { address, swap } = params

  await issuanceToken.status.waitUntilNotPending({ address })

  const token = await issuanceToken.status.checkAndSet({
    address,
    latestTransactionId: swap?.id,
  })

  // if not fresh or not found, set market data
  if (token.status === 'STALE')
    return await issuanceToken.setMarketData({
      token,
    })

  return token
}
