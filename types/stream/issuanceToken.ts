import { EEventType } from "../api";
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

export type IssuanceTokenStramEvent<T extends EEventType = EEventType> =
  Extract<IssuanceTokenStramEventBase, { type: T }>;
