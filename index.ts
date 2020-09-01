import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { module } from './store'
import { beforeEach as routerBeforeEach } from './router/beforeEach'
import { afterEach as routerAfterEach } from './router/afterEach'
import { afterRegistration } from './hooks/afterRegistration'

export const defaultModuleSettings = [
  {
    param: 'cart',
    function: 'addToCartFromQuery'
  }
]

export const KEY = 'query-promos'

export const QueryPromosModule: StorefrontModule = function ({ store, router, appConfig }) {
  router.beforeEach(routerBeforeEach)
  router.afterEach(routerAfterEach)

  store.registerModule(KEY, module)

  afterRegistration(appConfig, store)
}
