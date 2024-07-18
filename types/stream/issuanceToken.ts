import { EEventType, type EventType } from "../api";
import type {
  IssuanceTokenResponse,
  PreInitilizeIssuanceTokenResponse,
} from "../issuanceToken";

export type IssuanceTokenStramEventBase =
  | {
      type: EEventType.ISSUANCE_TOKEN_UPDATE;
      data: IssuanceTokenResponse;
    }
  | {
      type: EEventType.ISSUANCE_TOKEN_INSERT;
      data: PreInitilizeIssuanceTokenResponse;
    };

export type IssuanceTokenStramEvent<T extends EventType = EventType> = Extract<
  IssuanceTokenStramEventBase,
  { type: T }
>;
