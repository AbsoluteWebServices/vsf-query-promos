import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { afterEach as routerAfterEach } from './router/afterEach'

export const QueryPromosModule: StorefrontModule = function ({ router }) {
  router.afterEach(routerAfterEach)
}
