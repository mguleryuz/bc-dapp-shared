import { IssuanceTokenModel } from '../../../../models'

export default async function () {
  const count = await IssuanceTokenModel.countDocuments()
  return count
}
