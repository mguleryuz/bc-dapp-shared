export type ApiSecret = {
  uid: string
  title: string
  hashedSecret: string
  createdAt: Date
  updatedAt: Date
}

export enum EEventType {
  USER_CHANGE = 'USER_CHANGE',
  ISSUANCE_TOKEN_INSERT = 'ISSUANCE_TOKEN_INSERT',
  ISSUANCE_TOKEN_UPDATE = 'ISSUANCE_TOKEN_UPDATE',
}

export type EventType = keyof typeof EEventType

export type EventData = {
  operationType: EventType
  uid: string
}

export type PaginationResult = {
  page: number
  limit: number
  totalPages: number
  totalCount: number
}
