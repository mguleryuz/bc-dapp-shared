import type { IssuanceTokenNominatedMetric } from '../../../../../types'

export default function (
  swaps: { collateralAmount: string }[]
): IssuanceTokenNominatedMetric {
  const result = {
    collateral: '0.00',
    usd: '0.00',
  }

  if (swaps.length === 0) return result

  result.collateral = String(
    swaps.reduce((acc, swap) => acc + Number(swap.collateralAmount), 0)
  )

  return result
}
