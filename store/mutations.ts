import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import QueryPromosState from '../types/QueryPromosState'

export const mutations: MutationTree<QueryPromosState> = {
  [types.SET_EVENT] (state, { event, value }) {
    state.events[event] = value
  },
  [types.SET_PARAM] (state, { param, value }) {
    state.params[param] = value
  },
  [types.CLEAR_PARAM] (state, { param }) {
    delete state.params[param]
  }
}
