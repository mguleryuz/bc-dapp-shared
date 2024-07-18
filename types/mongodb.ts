import { GridFSBucket } from 'mongodb'
import { Mongoose } from 'mongoose'

declare global {
  var mongoose: {
    promise: ReturnType<Mongoose['connect']> | null
    conn: (Mongoose & { bucket: GridFSBucket }) | null
  }
}

export type WatchType = 'ISSUANCE_TOKEN_LIST' | 'SINGLE_ISSUANCE_TOKEN'
