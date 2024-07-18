import type { EventType } from '../api'
import type { IssuanceTokenStramEvent } from './issuanceToken'
export * from './issuanceToken'

// NOTE:
// event: 'message'
// id?: string
// retry?: number
export type SSEMessageData<T extends EventType = EventType> =
  IssuanceTokenStramEvent<T>
