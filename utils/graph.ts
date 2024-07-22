import type { GraphQLRequestParams } from '../types'

const formatOrderBy = <T extends object>(
  orderBy: Partial<Record<keyof T, string>>
): string => {
  return `{ ${Object.entries(orderBy)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ')} }`
}

const formatWhere = <T extends object>(
  where: Partial<Record<keyof T, any>>
): string => {
  const formatValue = (value: any): string =>
    typeof value === 'object' && value !== null && !Array.isArray(value)
      ? `{ ${Object.entries(value)
          .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
          .join(', ')} }`
      : JSON.stringify(value)

  return `{ ${Object.entries(where)
    .map(([key, value]) => `${key}: ${formatValue(value)}`)
    .join(', ')} }`
}

export const formatParams = <T extends object>(
  params?: GraphQLRequestParams<T>
): string => {
  if (!params || Object.keys(params).length === 0) return ''

  const parts: string[] = []

  if (params.distinct_on) parts.push(`distinct_on: ${params.distinct_on}`)
  if (params.limit) parts.push(`limit: ${params.limit}`)
  if (params.offset) parts.push(`offset: ${params.offset}`)
  if (params.order_by) parts.push(`order_by: ${formatOrderBy(params.order_by)}`)
  if (params.where) parts.push(`where: ${formatWhere(params.where)}`)

  return `(${parts.join(', ')})`
}
