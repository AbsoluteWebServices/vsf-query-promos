import QueryPromosState from '../types/QueryPromosState'
import { GetterTree } from 'vuex'

export const getters: GetterTree<QueryPromosState, any> = {
  isFired: state => event => state.events[event],
  hasParam: state => param => state.params.hasOwnProperty(param),
  getParamValue: state => param => state.params[param]
}
