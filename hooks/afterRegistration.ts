import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { KEY, defaultModuleSettings } from '../index'
import * as types from '../store/mutation-types'

export function afterRegistration (config, store) {
  const settings = config.queryPromos || defaultModuleSettings

  for (const promo of settings) {
    if (promo.event) {
      store.commit(`${KEY}/${types.SET_EVENT}`, { event: promo.event, value: false })

      const eventFunction = () => {
        store.commit(`${KEY}/${types.SET_EVENT}`, { event: promo.event, value: true })
        EventBus.$off(promo.event, eventFunction)
      }

      EventBus.$on(promo.event, eventFunction)
    }
  }
}
