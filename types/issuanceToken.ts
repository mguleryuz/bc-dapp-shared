import { Simplify } from 'type-fest'
import { PaginationResult } from './api'
import { PrunedBlob } from '.'

export type IssuanceTokenMarketCap = {
  usd: string
  collateral: string
}

export type IssuanceTokenPrice = {
  usd: string
  collateral: string
}

export type IssuanceTokenMarketData = {
  fresh: boolean
  totalSupply: string
  marketCap: IssuanceTokenMarketCap
  price: IssuanceTokenPrice
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

export type InsertIssuanceTokenInsertParams = {
  blob: PrunedBlob
} & Omit<IssuanceToken, 'imageId' | keyof IssuanceTokenMarketData>

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
