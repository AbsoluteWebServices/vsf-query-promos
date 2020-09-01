import { Route } from 'vue-router'
import config from 'config'
import { isServer } from '@vue-storefront/core/helpers'
import { KEY, defaultModuleSettings } from '../index'
import rootStore from '@vue-storefront/core/store'
import * as types from '../store/mutation-types'

function beforeEach (to: Route, from: Route, next): void {
  const settings = config.queryPromos || defaultModuleSettings

  if (!isServer && Object.keys(to.query).length !== 0) {
    let changed = false

    for (const promo of settings) {
      if (to.query.hasOwnProperty(promo.param)) {
        rootStore.commit(`${KEY}/${types.SET_PARAM}`, { param: promo.param, value: to.query[promo.param] })
        delete to.query[promo.param]
        changed = true
      }
    }

    if (changed) return next(to)
  }

  next()
}

export { beforeEach }
