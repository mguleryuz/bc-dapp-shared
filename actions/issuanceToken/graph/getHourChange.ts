import { request } from 'graphql-request'
import { getDocument, queryURL } from '.'
import type { Swap, SwapsResponse } from '../../../types'

// Function to get the timestamp for one hour ago
const getTimeStamp = (hour: 24 | 4 | 1) => {
  const now = new Date()
  // Convert the timestamp to seconds
  return Math.floor((now.getTime() - hour * 60 * 60 * 1000) / 1000)
}

// Function to fetch the data and calculate the change
export default async function getHourChange(
  fundingManagerAddress: string,
  hour: 24 | 4 | 1
) {
  const timestampt = getTimeStamp(hour)

  const document = getDocument<Swap>({
    name: 'Swap',
    params: {
      where: {
        bondingCurve_id: {
          _eq: fundingManagerAddress,
        },
        blockTimestamp: { _gte: timestampt },
      },
    },
    fields: ['priceInCol', 'blockTimestamp'],
  })

  // Fetch the swaps from the last hour
  const data = <SwapsResponse>await request(queryURL, document)

  // Process the data to calculate the change
  const swaps = data.Swap
  if (swaps.length === 0) return 0

  const initialValue = Number(swaps[0].priceInCol)
  const latestValue = Number(swaps[swaps.length - 1].priceInCol)
  const change = ((latestValue - initialValue) / initialValue) * 100

  return String(change)
}
