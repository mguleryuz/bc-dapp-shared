import { IssuanceTokenMarketCap, IssuanceTokenPrice } from '../../../types'

export default function getMarketCap(params: {
  price: IssuanceTokenPrice
  totalSupply: string
}): IssuanceTokenMarketCap {
  const collateral =
    String(Number(params.totalSupply) * Number(params.price.collateral)) ??
    '0.00'

  return {
    collateral,
    usd: '0.00',
  }
}
