export type ApiSecret = {
  uid: string
  title: string
  hashedSecret: string
  createdAt: Date
  updatedAt: Date
}

export type RateLimitData = {
  key: string
  count: number
  expiresAt: number
  limit: number
}

// ==========EVENTS==========
export enum EEventType {
  USER_CHANGE = 'USER_CHANGE',
  ISSUANCE_TOKEN_INSERT = 'ISSUANCE_TOKEN_INSERT',
  ISSUANCE_TOKEN_UPDATE = 'ISSUANCE_TOKEN_UPDATE',
  ISSUANCE_TOKEN_SWAP = 'ISSUANCE_TOKEN_SWAP',
}

export type EventType = keyof typeof EEventType

export type EventData = {
  operationType: EventType
  uid: string
}

// ==========RESPONSE WRAPPERS==========
export type PaginationResult = {
  page: number
  limit: number
  totalPages: number
  totalCount: number
}
