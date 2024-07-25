import type { GetIssuanceTokenPriceInCollateral, IssuanceToken } from '..'
import type { Swap } from '../../graph'

export type SortByDirection = 'asc' | 'desc'

export type SortByTimeBase = 'oneHour' | 'fourHour' | 'twentyFourHour'

export type SortByNominator = 'collateral' | 'usd'

export type SortByPreDirection =
  | `volume.${SortByNominator}.${SortByTimeBase}`
  | `price.${SortByNominator}`
  | `totalSupply`
  | `marketCap.${SortByNominator}`
  | `priceChange.${SortByTimeBase}`

export type SortBy = undefined | `${SortByPreDirection}:${SortByDirection}`

export type SetIssuanceTokenAddressParams = {
  orchestratorAddress: string
  fundingManagerAddress: string
  address: string
}

export type GetAllIssuanceTokensParams = {
  page?: number
  limit?: number
  sortBy?: SortBy
}

export type GetIssuanceTokenParams = {
  address: string | `0x${string}`
  swap?: Swap
}

export type SetMarketDataParams = {
  token: IssuanceToken
  swap?: Swap
}

export type GetIssuanceTokenPriceParams = (
  | {
      type: 'rpc'
      chainId: number
      orchestratorAddress: string
    }
  | ({
      type: 'graph'
    } & GetIssuanceTokenPriceInCollateral)
) & {
  swap?: Swap
}

export * from './graph'
