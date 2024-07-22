import * as restGraph from './graph'
import graph from './graph'
import get from './get'
import getAll from './getAll'
import setAddress from './setAddress'
import getAllCount from './getAllCount'
import checkAndSetFresh from './checkAndSetFresh'
import setMarketData from './setMarketData'
import getIsFresh from './getIsFresh'
import getMarketData from './getMarketData'
import setFresh from './setFresh'
import getAllAddresses from './getAllAddresses'

export const getTokenQuery = (address: string) => ({
  $or: [
    { orchestratorAddress: address },
    { fundingManagerAddress: address },
    { address },
  ],
})

export default {
  getTokenQuery,
  get,
  setAddress,
  getAll,
  getAllCount,
  checkAndSetFresh,
  setFresh,
  setMarketData,
  getIsFresh,
  getMarketData,
  getAllAddresses,
  graph,
  ...restGraph,
}
