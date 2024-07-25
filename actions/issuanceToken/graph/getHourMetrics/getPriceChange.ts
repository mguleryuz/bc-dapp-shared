export default function (swaps: { priceInCol: string }[]) {
  let result = '0.00'

  if (swaps.length === 0) return result

  const initialValue = Number(swaps[0].priceInCol)
  const latestValue = Number(swaps[swaps.length - 1].priceInCol)
  const change = ((latestValue - initialValue) / initialValue) * 100

  if (change === 0) return result

  result = String(change)

  return result
}
