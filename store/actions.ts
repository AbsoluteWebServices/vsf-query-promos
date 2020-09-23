import QueryPromosState from '../types/QueryPromosState'
import { ActionTree } from 'vuex'
import { cacheStorage } from '../index'
import * as types from './mutation-types'

export const actions: ActionTree<QueryPromosState, any> = {
  saveParams ({ state }): void {
    cacheStorage.setItem('params', state.params)
  },
  async loadParams ({ commit }): Promise<object[]> {
    const items = await cacheStorage.getItem('params')

    if (items) {
      commit(types.SET_PARAMS, items)
    }

    return items
  },
  async removeParam ({ commit }, { param }): Promise<void> {
    commit(types.CLEAR_PARAM, { param })
    const items = await cacheStorage.getItem('params')

    if (items) {
      delete items[param]
      cacheStorage.setItem('params', items)
    }
  }
}
