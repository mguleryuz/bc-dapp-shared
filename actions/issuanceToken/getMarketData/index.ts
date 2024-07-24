import getTotalSupply from './getTotalSupply'
import getMarketCap from './getMarketCap'
import getPrice from './getPrice'
import getHourChange from '../graph/getHourChange'
import type { SetMarketDataParams } from '../../../types'

export default async function (params: SetMarketDataParams) {
  const { address, chainId, decimals, fundingManagerAddress } = params.token
  const price = await getPrice({
      type: 'graph',
      fundingManagerAddress,
      swap: params.swap,
    }),
    totalSupply = await getTotalSupply({
      chainId,
      issuanceTokenDecimals: decimals,
      issuanceTokenAddress: address,
    }),
    marketCap = getMarketCap({ price, totalSupply }),
    priceChange = {
      oneHour: await getHourChange(fundingManagerAddress!, 1),
      fourHour: await getHourChange(fundingManagerAddress!, 4),
      twentyFourHour: await getHourChange(fundingManagerAddress!, 24),
    }

  const marketData = {
    price,
    totalSupply,
    marketCap,
    priceChange,
  }

  return marketData
}
