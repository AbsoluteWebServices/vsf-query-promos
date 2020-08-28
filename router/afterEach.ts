import { Route } from 'vue-router'
import config from 'config'
import { isServer } from '@vue-storefront/core/helpers'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { KEY, defaultModuleSettings } from '../index'
import { changeLocationQuery } from '../helpers'
import functions from '../functions/'
import rootStore from '@vue-storefront/core/store'

function afterEach (to: Route, from: Route): void {
  const settings = config.queryPromos || defaultModuleSettings

  if (!isServer && Object.keys(to.query).length !== 0) {
    const params = { ...to.query }

    for (const promo of settings) {
      if (params.hasOwnProperty(promo.param)) {
        const paramValue = params[promo.param]
        const promoFunction = () => {
          functions[promo.function](paramValue)

          if (promo.event) {
            EventBus.$off(promo.event, promoFunction)
          }
        }

        if (promo.event && !rootStore.getters[`${KEY}/isFired`](promo.event)) {
          EventBus.$on(promo.event, promoFunction)
        } else {
          promoFunction()
        }

        delete params[promo.param]
      }
    }

    changeLocationQuery(to, params)
  }
}

export { afterEach }
