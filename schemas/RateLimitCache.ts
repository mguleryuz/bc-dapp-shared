import { Schema } from 'mongoose'
import { type RateLimitCache } from '../types'

export const RateLimitCacheSchema = new Schema<RateLimitCache>(
  {
    data: {
      key: { type: String, required: true },
      count: { type: Number, required: true },
      limit: { type: Number, required: true },
      expiresAt: { type: Number, required: true },
    } satisfies Record<keyof RateLimitCache['data'], any>,
  },
  { _id: false }
)
