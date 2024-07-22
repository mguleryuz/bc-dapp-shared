import getTotalSupply from './getTotalSupply'
import getMarketCap from './getMarketCap'
// import getPrice from './getPrice'
import issuanceToken from '..'
import { type Hex } from 'viem'
import { type SetMarketDataRequest } from '../setMarketData'

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
    marketCap = getMarketCap({ price, totalSupply })

  const marketData = {
    price,
    totalSupply,
    marketCap,
  }

  return marketData
}
