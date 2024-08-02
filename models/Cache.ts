import { model, models, Schema } from 'mongoose'
import { ECacheType } from '../types'
import type { CacheBase, EventCache, RateLimitCache } from '../types'
import { EventCacheSchema } from '../schemas/EventCache'
import { RateLimitCacheSchema } from '../schemas/RateLimitCache'

// Define the base schema
const CacheBaseSchema = new Schema<CacheBase>(
  {
    type: {
      type: String,
      enum: ECacheType,
      required: true,
    },
    idle: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, discriminatorKey: 'type' }
)

const setModels = () => {
  const Base = model('cache', CacheBaseSchema)

  return {
    [ECacheType.RATE_LIMIT]: Base.discriminator<CacheBase & RateLimitCache>(
      ECacheType.RATE_LIMIT,
      RateLimitCacheSchema
    ),
    [ECacheType.EVENT]: Base.discriminator<CacheBase & EventCache>(
      ECacheType.EVENT,
      EventCacheSchema
    ),
  }
}

if (!models.cache) setModels()

const cachedModels = {
  [ECacheType.RATE_LIMIT]: models.cache.discriminators![ECacheType.RATE_LIMIT],
  [ECacheType.EVENT]: models.cache.discriminators![ECacheType.EVENT],
} as ReturnType<typeof setModels>

export default cachedModels
