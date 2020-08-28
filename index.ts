import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { afterEach as routerAfterEach } from './router/afterEach'

export const defaultModuleSettings = [
  {
    param: 'cart',
    function: 'addToCartFromQuery'
  }
]

export const KEY = 'query-promos'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  router: { afterEach: routerAfterEach }
}

export const QueryPromosModule = new VueStorefrontModule(moduleConfig)
