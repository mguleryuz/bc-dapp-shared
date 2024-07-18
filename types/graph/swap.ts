import { Hex } from 'viem'
import { GraphQLRequestParams, HexWithId } from '.'

export type SwapType = 'BUY' | 'SELL'

export type Swap = {
  blockTimestamp: string
  swapType: SwapType
  priceInCol: string
  bondingCurve_id: Hex
  initiator: Hex
  collateralAmount: string
  collateralToken: Hex
  db_write_timestamp: string
  id: HexWithId
  issuanceAmount: string
  issuanceToken: Hex
  recipient: Hex
}

export type SwapRequest = GraphQLRequestParams<Swap>

export type SwapsResponse = { Swap: Swap[] }
