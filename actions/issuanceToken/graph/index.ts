import getCollateralPrice from './getCollateralPrice'
import getSwaps from './getSwaps'
import getLatestSwapId from './getLatestSwapId'
import type { GraphQLRequestParams } from '../../../types'
import { gql } from 'graphql-request'
import utils from '../../../utils'
import getHourChange from './getHourChange'

export default {
  getCollateralPrice,
  getSwaps,
  getLatestSwapId,
  getHourChange,
}

export const queryURL = 'https://indexer.bigdevenergy.link/a414bf3/v1/graphql'

export const getDocument = <T extends object>(params: {
  name: string
  params?: GraphQLRequestParams<T>
  fields: Array<keyof T>
}) => {
  return gql`{
    ${params.name}${utils.graph.formatParams(params.params)} {
      ${utils.graph.selectGraphQLFields(params.fields)}
      }
    }`
}
