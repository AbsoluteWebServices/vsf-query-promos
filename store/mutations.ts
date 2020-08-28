import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import QueryPromosState from '../types/QueryPromosState'

export const mutations: MutationTree<QueryPromosState> = {
  [types.SET_EVENT] (state, { event, value }) {
    state.events[event] = value
  }
}
