import { IssuanceTokenModel } from '../../models'
import { getTokenQuery } from '.'

async function set({
  address,
  pending,
}: {
  address: string
  pending: boolean
}) {
  await IssuanceTokenModel.updateOne(getTokenQuery(address), {
    $set: { pending },
  })

  return pending
}

async function get({ address }: { address: string }) {
  const isPending = await IssuanceTokenModel.exists({
    ...getTokenQuery(address),
    pending: true,
  })

  return !!isPending
}

async function waitUntilNot({
  address,
  timeout = 60_000,
  interval = 1000,
}: {
  address: string
  timeout?: number
  interval?: number
}) {
  const start = Date.now()
  let isPending = await get({ address })

  while (isPending) {
    if (Date.now() - start > timeout) break

    await new Promise((resolve) => setTimeout(resolve, interval))
    isPending = await get({ address })
  }

  return !isPending
}

export default {
  set,
  get,
  waitUntilNot,
}
