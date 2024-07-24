import type { GetIssuanceTokenPriceInCollateral } from '../../../types'
import issuanceToken from '..'

export default async function (
  params: GetIssuanceTokenPriceInCollateral
): Promise<string> {
  try {
    const swaps = await issuanceToken.graph.getSwaps(
      {
        where: {
          bondingCurve_id: {
            _eq: params.fundingManagerAddress,
          },
        },
        order_by: {
          blockTimestamp: 'desc',
        },
        limit: 1,
      },
      ['priceInCol']
    )

    const priceInCol = swaps.Swap[0].priceInCol

    return priceInCol
  } catch (error) {
    return '0.00'
  }
}
