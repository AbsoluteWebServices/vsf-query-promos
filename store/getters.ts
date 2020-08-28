import QueryPromosState from '../types/QueryPromosState'
import { GetterTree } from 'vuex'

export const getters: GetterTree<QueryPromosState, any> = {
  isFired: state => event => state.events[event]
}
