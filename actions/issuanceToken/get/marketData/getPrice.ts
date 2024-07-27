import issuanceToken from '../..'
import type {
  GetIssuanceTokenPriceParams,
  IssuanceTokenPrice,
} from '../../../../types'
import { getWorkflow } from '../../../inverter'

// TODO: turn into getStatic Price after HATS fix
export default async function getPrice(
  params: GetIssuanceTokenPriceParams
): Promise<IssuanceTokenPrice> {
  try {
    const result = {
      collateral: '0.00',
      usd: '0.00',
    }

    if (!!params.swap?.priceInCol) result.collateral = params.swap.priceInCol
    else {
      switch (params.type) {
        case 'rpc':
          const workflow = await getWorkflow(
            params.chainId,
            params.orchestratorAddress
          )

          result.collateral =
            await workflow.fundingManager.read.calculatePurchaseReturn.run('1')!
          break
        case 'graph':
          result.collateral = await issuanceToken.graph.get.collateralPrice({
            fundingManagerAddress: params.fundingManagerAddress,
          })!
          break
      }
    }

    return result
  } catch {
    return {
      collateral: '0.00',
      usd: '0.00',
    }
  }
}
