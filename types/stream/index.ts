import { EventType } from '../api'
import type { IssuanceTokenStramEvent } from './issuanceToken'
export * from './issuanceToken'

export type SSEMessage<T extends EventType = EventType> = {
  data: IssuanceTokenStramEvent<T>
  event?: T
  id?: string
  retry?: number
}
