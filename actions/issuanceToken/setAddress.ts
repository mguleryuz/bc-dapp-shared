import { IssuanceTokenModel } from '../../models'
import type { SetIssuanceTokenAddressParams } from '../../types'

export default async function ({
  orchestratorAddress,
  fundingManagerAddress,
  address,
}: SetIssuanceTokenAddressParams) {
  await IssuanceTokenModel.updateOne(
    { orchestratorAddress },
    { $set: { address, fundingManagerAddress } }
  )

  return {
    success: true,
  }
}
