import type { Simplify } from 'type-fest'
import type { PaginationResult } from '..'

export type IssuanceTokenNominatedMetric = {
  collateral: string
  usd: string
}

export type IssuanceTokenMarketCap = IssuanceTokenNominatedMetric

export type IssuanceTokenPrice = IssuanceTokenNominatedMetric

export type IssuanceTokenTimeDataBase = {
  oneHour: string
  fourHour: string
  twentyFourHour: string
}

export type IssuanceTokenPriceChange = IssuanceTokenTimeDataBase

export type IssuanceTokenVolume = {
  collateral: IssuanceTokenTimeDataBase
  usd: IssuanceTokenTimeDataBase
}

export enum EIssuanceTokenStatus {
  STALE = 'STALE',
  FRESH = 'FRESH',
  PENDING = 'PENDING',
}

export type IssuanceTokenStatus = keyof typeof EIssuanceTokenStatus

export type IssuanceTokenMarketData = {
  totalSupply: string
  marketCap: IssuanceTokenMarketCap
  price: IssuanceTokenPrice
  priceChange: IssuanceTokenPriceChange
  volume: IssuanceTokenVolume
  status: EIssuanceTokenStatus
  latestTransactionId?: string
}

export type IssuanceTokenBase = {
  chainId: number
  creatorAddress: `0x${string}`
  orchestratorAddress: `0x${string}`

  address?: `0x${string}`
  fundingManagerAddress?: `0x${string}`

  symbol: string
  name: string
  description: string
  decimals: number

  imageId: string

  collateralTokenName: string
  collateralTokenSymbol: string
  collateralTokenDecimals: number
  collateralTokenAddress: `0x${string}`
  collateralTokenLogoUrl: string
}

export type IssuanceToken = Simplify<
  IssuanceTokenBase & IssuanceTokenMarketData
>

export type IssuanceTokenResponse = IssuanceToken & {
  id: string
}

export type PreMarketDataIssuanceTokenResponse = Omit<
  IssuanceTokenResponse,
  keyof IssuanceTokenMarketData
>

export type PreInitilizeIssuanceTokenResponse = Omit<
  PreMarketDataIssuanceTokenResponse,
  'address' | 'fundingManagerAddress'
>

export type IsuanceTokensResponse = {
  data: IssuanceTokenResponse[]
  pagination: PaginationResult
}

export * from './actions'
