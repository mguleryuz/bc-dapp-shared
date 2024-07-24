import * as restGraph from './graph'
import graph from './graph'
import get from './get'
import getAll from './getAll'
import setAddress from './setAddress'
import getAllCount from './getAllCount'
import setMarketData from './setMarketData'
import getMarketData from './getMarketData'
import getAllAddresses from './getAllAddresses'
import status from './status'

export const getTokenQuery = (address: string) => ({
  $or: [
    { orchestratorAddress: address },
    { fundingManagerAddress: address },
    { address },
  ],
})

export default {
  status,
  getTokenQuery,
  get,
  setAddress,
  getAll,
  getAllCount,
  setMarketData,
  getMarketData,
  getAllAddresses,
  graph,
  ...restGraph,
}
