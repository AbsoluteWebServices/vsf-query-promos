import { SearchQuery } from 'storefront-query-builder'
import store from '@vue-storefront/core/store'
import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'

async function getProducts (skus: string[]): Promise<CartItem[]> {
  let searchQuery = new SearchQuery()
  searchQuery = searchQuery.applyFilter({ key: 'sku', value: { 'in': skus } })
  const response = await store.dispatch('product/findProducts', { query: searchQuery, start: 0, size: skus.length, updateState: false })
  return response.items
}

export {
  getProducts
}
