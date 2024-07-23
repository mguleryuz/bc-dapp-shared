import * as restGraph from './graph'
import graph from './graph'
import get from './get'
import getAll from './getAll'
import setAddress from './setAddress'
import getAllCount from './getAllCount'
import setMarketData from './setMarketData'
import getMarketData from './getMarketData'
import getAllAddresses from './getAllAddresses'
import fresh from './fresh'
import pending from './pending'

export const getTokenQuery = (address: string) => ({
  $or: [
    { orchestratorAddress: address },
    { fundingManagerAddress: address },
    { address },
  ],
})

export default {
  fresh,
  getTokenQuery,
  get,
  setAddress,
  getAll,
  getAllCount,
  setMarketData,
  getMarketData,
  getAllAddresses,
  pending,
  graph,
  ...restGraph,
}
