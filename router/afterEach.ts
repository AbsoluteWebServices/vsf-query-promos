import { Route } from 'vue-router'
import config from 'config'
import { isServer } from '@vue-storefront/core/helpers'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { KEY, defaultModuleSettings } from '../index'
import functions from '../functions/'
import rootStore from '@vue-storefront/core/store'

function afterEach (to: Route, from: Route): void {
  const settings = config.queryPromos || defaultModuleSettings

  if (!isServer) {
    rootStore.dispatch(`${KEY}/loadParams`).then(() => {
      for (const promo of settings) {
        if (rootStore.getters[`${KEY}/hasParam`](promo.param)) {
          const promoFunction = () => {
            const paramValue = rootStore.getters[`${KEY}/getParamValue`](promo.param)

            functions[promo.function](paramValue)
            rootStore.dispatch(`${KEY}/removeParam`, { param: promo.param })

            if (promo.event) {
              EventBus.$off(promo.event, promoFunction)
            }
          }

          if (promo.event && !rootStore.getters[`${KEY}/isFired`](promo.event)) {
            EventBus.$on(promo.event, promoFunction)
          } else {
            promoFunction()
          }
        }
      }
    })
  }
}

export { afterEach }
