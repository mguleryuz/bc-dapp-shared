import request, { gql } from 'graphql-request'
import { IssuanceTokenPrice, Swap, SwapsResponse } from '../../../types'
import { queryURL } from '.'
import utils from '../../../utils'

export default async function (
  fundingManagerAddress: string
): Promise<IssuanceTokenPrice> {
  try {
    const document = gql`
        {
          Swap${utils.graph.formatParams<Swap>({
            where: {
              bondingCurve_id: {
                _eq: fundingManagerAddress,
              },
            },
            order_by: {
              blockTimestamp: 'desc',
            },
            limit: 1,
          })} {
            priceInCol
          }
        }
      `
    const response = <SwapsResponse>await request(queryURL, document)

    const priceInCol = response.Swap[0].priceInCol

    return {
      collateral: priceInCol,
      usd: '0.00',
    }
  } catch (error) {
    return {
      collateral: '0.00',
      usd: '0.00',
    }
  }
}
