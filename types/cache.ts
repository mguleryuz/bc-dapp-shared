import { RateLimitData, type EventData } from './api'

export enum ECacheType {
  EVENT = 'EVENT',
  RATE_LIMIT = 'RATE_LIMIT',
}

export type CacheType = keyof typeof ECacheType

export interface CacheBase {
  type: CacheType
  idle?: boolean
  createdAt: Date
  updatedAt: Date
}

export interface EventCache extends CacheBase {
  type: 'EVENT'
  data: EventData
}

export interface RateLimitCache extends CacheBase {
  type: 'RATE_LIMIT'
  data: RateLimitData
}

// export interface TokenBalancesCache extends Omit<CacheBase, 'type'> {
//   data: TokenAmount[]
// }

// export interface FiatRateCache extends CacheBase {
//   type: CacheType.FIAT_RATE
//   data: FiatRate
// }
