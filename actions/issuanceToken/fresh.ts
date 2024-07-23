import issuanceToken, { getTokenQuery } from '.'
import { IssuanceTokenModel } from '../../models'

async function set({
  address,
  fresh,
  latestTransactionId,
}: {
  address: string
  fresh: boolean
  latestTransactionId?: string
}) {
  await IssuanceTokenModel.updateOne(getTokenQuery(address), {
    // if latestTransactionId is provided, set it else just set fresh
    $set: latestTransactionId ? { fresh, latestTransactionId } : { fresh },
  })

  return fresh
}

async function get({ address }: { address: string }) {
  const freshExists = await IssuanceTokenModel.exists({
    ...getTokenQuery(address),
    fresh: true,
  })

  return !!freshExists
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
    await IssuanceTokenModel.findOne(
      getTokenQuery(address),
      'fresh fundingManagerAddress latestTransactionId'
    )
  )?.toObject()

  // If token not found, throw an error
  if (!prevToken?.fundingManagerAddress) throw new Error('Token not found')

  // Retrieve the latest transaction ID
  const latestTransactionId =
    latestTransactionIdParam ??
    (await issuanceToken.graph.getLatestSwapId(prevToken.fundingManagerAddress))
  // Define previous transaction ID
  const prevTransactionId = prevToken.latestTransactionId

  const isNotInitialized =
    !prevToken.fresh && !prevTransactionId && !latestTransactionId
  const hasSameTransactionId = prevTransactionId === latestTransactionId

  const fresh = !isNotInitialized && hasSameTransactionId

  // If not fresh, update the token's state
  if (!fresh)
    set({
      address,
      fresh,
      latestTransactionId,
    })

  return fresh
}

export default {
  set,
  get,
  checkAndSet,
}
