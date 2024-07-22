import { IssuanceTokenModel } from '../../models'
import { getTokenQuery } from '.'

export default async function ({ address }: { address: string }) {
  const freshExists = await IssuanceTokenModel.exists({
    ...getTokenQuery(address),
    fresh: true,
  })

  return !!freshExists
}
