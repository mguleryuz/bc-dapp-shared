import type { EventType } from '../api'
import type { IssuanceTokenStreamEvent } from './issuanceToken'
export * from './issuanceToken'

// NOTE:
// event: 'message'
// id?: string
// retry?: number
export type SSEMessageData<T extends EventType = EventType> =
  IssuanceTokenStreamEvent<T>
