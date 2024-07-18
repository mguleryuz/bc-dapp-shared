import { EEventType } from '../api'
import { IssuanceTokenStramEvent } from './issuanceToken'
export * from './issuanceToken'

export type StreamEvent<T extends EEventType = EEventType> =
  | IssuanceTokenStramEvent<T>
  | undefined
