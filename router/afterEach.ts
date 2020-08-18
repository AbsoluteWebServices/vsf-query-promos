import { Route } from 'vue-router'
import config from 'config'
import { isServer } from '@vue-storefront/core/helpers'
import { changeLocationQuery } from '../helpers'
import functions from '../functions/'

const defaultParamNames = {
  addToCartFromQuery: 'cart'
}

function afterEach (to: Route, from: Route): void {
  const paramNames = config.queryPromos ? config.queryPromos.paramNames : defaultParamNames

  if (!isServer && Object.keys(to.query).length !== 0) {
    const params = { ...to.query };

    (async () => {
      for (const key in paramNames) {
        if (Object.prototype.hasOwnProperty.call(paramNames, key) && params.hasOwnProperty(paramNames[key])) {
          await functions[key](params[paramNames[key]])
          delete params[paramNames[key]]
        }
      }

      changeLocationQuery(to, params)
    })()
  }
}

export { afterEach }
