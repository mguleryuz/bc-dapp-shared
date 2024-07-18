import { EEventType } from "../api";
import type { IssuanceTokenStramEvent } from "./issuanceToken";
export * from "./issuanceToken";

export type SSEMessage<T extends EEventType = EEventType> = {
  data: IssuanceTokenStramEvent<T>;
  event?: T;
  id?: string;
  retry?: number;
};
