import issuanceToken from '..'
import type { GetIssuanceTokenParams } from '../../../types'

async function get(params: GetIssuanceTokenParams) {
  const { address, swap } = params

  await issuanceToken.status.waitUntilNotPending({ address })

  const token = await issuanceToken.status.checkAndSet({
    address,
    latestTransactionId: swap?.id,
  })

  // if not fresh or not found, set market data
  if (token.status === 'STALE') {
    const newToken = await issuanceToken.set.marketData({
      token,
    })
    return newToken
  }

  return token
}

import marketData from './marketData'
import all from './all'

export default Object.assign(get, {
  marketData,
  all,
})
