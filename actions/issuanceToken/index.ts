import * as restGraph from './graph'
import graph from './graph'
import get from './get'
import set from './set'
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
  set,
  graph,
  ...restGraph,
}
