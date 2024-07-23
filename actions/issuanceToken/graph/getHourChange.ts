import getSwaps from './getSwaps'

// Function to get the timestamp for one hour ago
const getTimeStamp = (hour: number) => {
  const now = new Date()
  // Convert the timestamp to seconds
  return Math.floor((now.getTime() - hour * 60 * 60 * 1000) / 1000)
}

// Function to fetch the data and calculate the change
export default async function getHourChange(
  fundingManagerAddress: string,
  hour: number
) {
  const timestampt = getTimeStamp(hour)

  const data = await getSwaps(
    {
      where: {
        bondingCurve_id: {
          _eq: fundingManagerAddress,
        },
        blockTimestamp: { _gte: timestampt },
      },
      order_by: { blockTimestamp: 'asc' }, // Ensure swaps are ordered by timestamp
    },
    ['priceInCol']
  )

  // Process the data to calculate the change
  const swaps = data.Swap
  if (swaps.length === 0) return 0

  const initialValue = Number(swaps[0].priceInCol)
  const latestValue = Number(swaps[swaps.length - 1].priceInCol)
  const change = ((latestValue - initialValue) / initialValue) * 100

  return String(change)
}
