import getTotalSupply from './getTotalSupply'
import getMarketCap from './getMarketCap'
import getPrice from './getPrice'
import getHourMetrics from '../graph/getHourMetrics'
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
    oneHour = await getHourMetrics(fundingManagerAddress!, 1),
    fourHour = await getHourMetrics(fundingManagerAddress!, 4),
    twentyFourHour = await getHourMetrics(fundingManagerAddress!, 24),
    priceChange = {
      oneHour: oneHour.priceChange,
      fourHour: fourHour.priceChange,
      twentyFourHour: twentyFourHour.priceChange,
    },
    volume = {
      collateral: {
        oneHour: oneHour.volume.collateral,
        fourHour: fourHour.volume.collateral,
        twentyFourHour: twentyFourHour.volume.collateral,
      },
      usd: {
        oneHour: oneHour.volume.usd,
        fourHour: fourHour.volume.usd,
        twentyFourHour: twentyFourHour.volume.usd,
      },
    }

  const marketData = {
    price,
    totalSupply,
    marketCap,
    priceChange,
    volume,
  }

  return marketData
}
