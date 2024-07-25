import issuanceToken, { getTokenQuery } from '.'
import { IssuanceTokenModel } from '../../models'
import type { EIssuanceTokenStatus, IssuanceTokenStatus } from '../../types'

async function set({
  address,
  status,
  latestTransactionId,
}: {
  address: string
  status: IssuanceTokenStatus
  latestTransactionId?: string
}) {
  await IssuanceTokenModel.updateOne(getTokenQuery(address), {
    // if latestTransactionId is provided, set it else just set fresh
    $set: latestTransactionId ? { status, latestTransactionId } : { status },
  })

  return status
}

async function get({
  address,
  status,
}: {
  address: string
  status: IssuanceTokenStatus
}) {
  const statusRes = (
    await IssuanceTokenModel.findOne(
      {
        ...getTokenQuery(address),
        status: status,
      },
      'status'
    )
  )?.status

  return statusRes
}

async function checkAndSet({
  address,
  latestTransactionId: latestTransactionIdParam,
}: {
  address: string
  latestTransactionId?: string
}) {
  // Retrieve the previous token for the address
  const prevToken = (
    await IssuanceTokenModel.findOne(getTokenQuery(address))
  )?.toObject()

  // If token not found, throw an error
  if (!prevToken?.fundingManagerAddress) throw new Error('Token not found')

  // Retrieve the latest transaction ID
  const latestTransactionId =
    latestTransactionIdParam ??
    (await issuanceToken.graph.getLatestSwapId(prevToken.fundingManagerAddress))
  // Define previous transaction ID
  const prevTransactionId = prevToken.latestTransactionId

  const isStale = prevToken.status === 'STALE'
  const hasSameTransactionId = prevTransactionId === latestTransactionId

  const fresh = !isStale && hasSameTransactionId
  const status = (fresh ? 'FRESH' : 'STALE') as EIssuanceTokenStatus

  // If not fresh, update the token's state
  if (!fresh)
    set({
      address,
      status,
      latestTransactionId,
    })

  const { _id, ...rest } = prevToken
  const pruned = { ...rest, id: _id.toString() }
  const newToken = { ...pruned, status, latestTransactionId }

  return newToken
}

async function waitUntilNotPending({
  address,
  timeout = 60_000,
  interval = 1000,
}: {
  address: string
  timeout?: number
  interval?: number
}) {
  const start = Date.now()
  let isPending = !!(await get({ address, status: 'PENDING' }))

  while (isPending) {
    if (Date.now() - start > timeout) break

    await new Promise((resolve) => setTimeout(resolve, interval))
    isPending = !!(await get({ address, status: 'PENDING' }))
  }

  return !isPending
}

export default {
  set,
  get,
  checkAndSet,
  waitUntilNotPending,
}
