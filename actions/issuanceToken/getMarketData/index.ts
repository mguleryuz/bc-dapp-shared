import getTotalSupply from './getTotalSupply'
import getMarketCap from './getMarketCap'
// import getPrice from './getPrice'
import issuanceToken from '..'
import { type Hex } from 'viem'
import { type SetMarketDataRequest } from '../setMarketData'
import getHourChange from '../graph/getHourChange'

export default async function (params: SetMarketDataRequest) {
  const price = await issuanceToken.graph.getPrice(
      params.fundingManagerAddress as Hex
    ),
    // const price = await getPrice(
    //     token.chainId,
    //     token.fundingManagerAddress as Hex
    //   ),
    totalSupply = await getTotalSupply({
      chainId: params.chainId,
      issuanceTokenDecimals: params.decimals,
      issuanceTokenAddress: params.address,
    }),
    marketCap = getMarketCap({ price, totalSupply }),
    priceChange = {
      oneHour: await getHourChange(params.fundingManagerAddress!, 1),
      fourHour: await getHourChange(params.fundingManagerAddress!, 4),
      twentyFourHour: await getHourChange(params.fundingManagerAddress!, 24),
    }

  const marketData = {
    price,
    totalSupply,
    marketCap,
    priceChange,
  }

  return marketData
}
