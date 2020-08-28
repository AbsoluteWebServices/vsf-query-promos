import { Module } from 'vuex'
import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'
import { state } from './state'
import QueryPromosState from '../types/QueryPromosState'

export const module: Module<QueryPromosState, any> = {
  namespaced: true,
  mutations,
  actions,
  getters,
  state
}
