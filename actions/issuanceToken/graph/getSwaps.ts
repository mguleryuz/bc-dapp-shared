import type { SwapRequest, SwapsResponse } from "../../../types";
import { gql, request } from "graphql-request";
import { queryURL } from ".";
import utils from "../../../utils";

export default async function (params?: SwapRequest): Promise<SwapsResponse> {
  try {
    const document = gql`{
    Swap${utils.graph.formatParams(params)} {
         bondingCurve_id
         collateralAmount
         collateralToken
         blockTimestamp
         db_write_timestamp
         id
         initiator
         issuanceAmount
         issuanceToken
         priceInCol
         recipient
         swapType
      }
    }`;
    const response = <SwapsResponse>await request(queryURL, document);

    return response;
  } catch (error) {
    return {
      Swap: [],
    };
  }
}
