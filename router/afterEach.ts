import { Route } from 'vue-router'
import config from 'config'
import { isServer } from '@vue-storefront/core/helpers'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { defaultModuleSettings } from '../index'
import { changeLocationQuery } from '../helpers'
import functions from '../functions/'

function afterEach (to: Route, from: Route): void {
  const settings = config.queryPromos || defaultModuleSettings

  if (!isServer && Object.keys(to.query).length !== 0) {
    const params = { ...to.query };

    for (const promo of settings) {
      if (params.hasOwnProperty(promo.param)) {
        const promoFunction = () => {
          functions[promo.function](params[promo.param])

          if (promo.event) {
            EventBus.$off(promo.event, promoFunction)
          }
        }

        if (promo.event) {
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
