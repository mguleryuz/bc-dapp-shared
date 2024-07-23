import { EEventType, type EventType } from '../api'
import type { Swap } from '../graph'
import type {
  IssuanceTokenResponse,
  PreInitilizeIssuanceTokenResponse,
} from '../issuanceToken'

export type IssuanceTokenStreamEventBase =
  | {
      type: EEventType.ISSUANCE_TOKEN_UPDATE
      data: IssuanceTokenResponse
    }
  | {
      type: EEventType.ISSUANCE_TOKEN_INSERT
      data: PreInitilizeIssuanceTokenResponse
    }
  | {
      type: EEventType.ISSUANCE_TOKEN_SWAP
      data: {
        token: IssuanceTokenResponse
        swap: Swap
      }
    }

export type IssuanceTokenStreamEvent<T extends EventType = EventType> = Extract<
  IssuanceTokenStreamEventBase,
  { type: T }
>
