import store from '@vue-storefront/core/store'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { Logger } from '@vue-storefront/core/lib/logger'
import prepareProductsToAdd from '../helpers/coreFallback/prepareProductsToAdd'
import { getProducts } from '../helpers'

export default async function addToCartFromQuery (queryParams: string | string[]): Promise<void> {
  let items = []

  if (typeof queryParams === 'undefined' || !queryParams) {
    return
  }

  if (typeof queryParams === 'string') {
    items = queryParams.split(',')
  } else {
    for (const element of queryParams) {
      items = items.concat(element.split(','))
    }
  }

  const skus = {}

  for (const item of items) {
    if (item.indexOf(':') === -1) {
      skus[item] = 1
    } else {
      const elements = item.split(':')

      skus[elements[0]] = parseInt(elements[1])
    }
  }

  const products = await getProducts(Object.keys(skus))

  if (!products.length) {
    Logger.warn('Products not found', 'vsf-query-promos')()
    return
  }

  let productsToAdd = []

  for (const product of products) {
    productsToAdd = productsToAdd.concat(prepareProductsToAdd({
      ...product,
      qty: skus[product.sku]
    }))
  }

  const addItems = () => {
    console.log('addItems')
    EventBus.$off('servercart-after-diff', addItems)
    store.dispatch('cart/addItems', { productsToAdd })
  }

  console.log(store.getters['cart/isSyncRequired'])
  EventBus.$on('servercart-after-diff', () => {
    console.log('servercart-after-diff')
  })
  if (store.getters['cart/isSyncRequired']) {
    EventBus.$on('servercart-after-diff', addItems)
  } else {
    addItems()
  }
}
