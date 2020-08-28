import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { module } from './store'
import { afterEach as routerAfterEach } from './router/afterEach'
import { afterRegistration } from './hooks/afterRegistration'

export const defaultModuleSettings = [
  {
    param: 'cart',
    function: 'addToCartFromQuery'
  }
]

export const KEY = 'query-promos'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module }] },
  router: { afterEach: routerAfterEach },
  afterRegistration
}

export const QueryPromosModule = new VueStorefrontModule(moduleConfig)
