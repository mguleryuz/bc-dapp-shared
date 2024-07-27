import type { SwapFields, SwapRequest, SwapsResponse } from '../../../../types'
import { request } from 'graphql-request'
import { queryURL } from '..'
import utils from '../../../../utils'

export default async function (
  params?: SwapRequest,
  fields: SwapFields = [
    'bondingCurve_id',
    'collateralAmount',
    'collateralToken',
    'blockTimestamp',
    'db_write_timestamp',
    'id',
    'initiator',
    'issuanceAmount',
    'issuanceToken',
    'priceInCol',
    'recipient',
    'swapType',
  ]
): Promise<SwapsResponse> {
  try {
    const document = utils.graph.getDocument({
      name: 'Swap',
      params,
      fields,
    })
    const response = <SwapsResponse>await request(queryURL, document)

    return response
  } catch (error) {
    return {
      Swap: [],
    }
  }
}
