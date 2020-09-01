import store from '@vue-storefront/core/store'
import { prepareProductsToAdd } from '@vue-storefront/core/modules/cart/helpers'
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
  let productsToAdd = []

  for (const product of products) {
    productsToAdd = productsToAdd.concat(prepareProductsToAdd({
      ...product,
      qty: skus[product.sku]
    }))
  }

  await store.dispatch('cart/addItems', { productsToAdd })
}
