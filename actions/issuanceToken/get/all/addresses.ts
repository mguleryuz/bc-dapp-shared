import { IssuanceTokenModel } from '../../../../models'

export default async function () {
  const count = await IssuanceTokenModel.find({}, 'address')
  return count.map((item) => item.address!)
}
