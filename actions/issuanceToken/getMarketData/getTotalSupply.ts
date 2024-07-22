import { type Hex, erc20Abi, formatUnits } from 'viem'
import { getChainPublicClient } from '../../inverter'

export default async function (params: {
  chainId: number
  issuanceTokenDecimals: number
  issuanceTokenAddress?: string
}): Promise<string> {
  try {
    const publicClient = await getChainPublicClient(params.chainId)

    const totalSupply = await publicClient.readContract({
      abi: erc20Abi,
      address: params.issuanceTokenAddress as Hex,
      functionName: 'totalSupply',
    })

    return formatUnits(totalSupply, params.issuanceTokenDecimals)
  } catch {
    return '0.00'
  }
}
