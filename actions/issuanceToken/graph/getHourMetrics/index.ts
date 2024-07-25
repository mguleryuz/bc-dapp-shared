import type { IssuanceTokenNominatedMetric } from '@/lib/types'
import getSwaps from '../getSwaps'
import getPriceChange from './getPriceChange'
import getVolume from './getVolume'

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
): Promise<{
  priceChange: string
  volume: IssuanceTokenNominatedMetric
}> {
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
    ['priceInCol', 'collateralAmount']
  )

  const priceChange = getPriceChange(data.Swap)
  const volume = getVolume(data.Swap)

  return {
    priceChange,
    volume,
  }
}
