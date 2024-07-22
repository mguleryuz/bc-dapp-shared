import { Schema } from 'mongoose'
import { EEventType, type EventCache } from '../types'

export const EventCacheSchema = new Schema<EventCache>({
  data: {
    uid: {
      type: String,
      required: true,
    },
    operationType: {
      type: String,
      enum: EEventType,
      required: true,
    },
    _id: false,
  },
})
