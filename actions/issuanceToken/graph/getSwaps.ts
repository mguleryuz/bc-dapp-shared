import type { SwapFields, SwapRequest, SwapsResponse } from '../../../types'
import { request } from 'graphql-request'
import { getDocument, queryURL } from '.'

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
    const document = getDocument({
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
