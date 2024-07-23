import getPrice from './getPrice'
import getSwaps from './getSwaps'
import getLatestSwapId from './getLatestSwapId'
import { GraphQLRequestParams } from '../../../types'
import { gql } from 'graphql-request'
import utils from '../../../utils'
import getHourChange from './getHourChange'

export default {
  getPrice,
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
