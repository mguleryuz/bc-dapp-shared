import type { IssuanceTokenPrice } from '../../../types'
import { getWorkflow } from '../../inverter'

// TODO: turn into getStatic Price after HATS fix
export default async function getPrice(params: {
  chainId: number
  orchestratorAddress: string
}): Promise<IssuanceTokenPrice> {
  try {
    const workflow = await getWorkflow(
      params.chainId,
      params.orchestratorAddress
    )

    const collateral =
      await workflow.fundingManager.read.calculatePurchaseReturn.run('1')

    return {
      collateral,
      usd: '0.00',
    }
  } catch {
    return {
      collateral: '0.00',
      usd: '0.00',
    }
  }
}
