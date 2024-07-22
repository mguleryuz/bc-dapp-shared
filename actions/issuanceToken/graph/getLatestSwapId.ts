import request, { gql } from 'graphql-request'
import { Swap, SwapsResponse } from '../../../types'
import { queryURL } from '.'
import utils from '../../../utils'

export default async function (fundingManagerAddress: string) {
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
          id
        }
      }
    `
    const response = <SwapsResponse>await request(queryURL, document)

    const id = response.Swap[0]?.id
    return id
  } catch (error) {
    return undefined
  }
}
