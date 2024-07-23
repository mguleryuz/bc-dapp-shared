export type SortBy =
  | undefined
  | `${'price.collateral' | 'price.usd' | 'totalSupply' | 'marketCap.collateral' | 'marketCap.usd'}:${'asc' | 'desc'}`

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
  latestTransactionId?: string
}
