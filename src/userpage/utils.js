import { PUBLIC_MEDIA_BASE } from './constants'

export const formatPrice = (value) => {
  const numericValue = Number(value)

  if (Number.isNaN(numericValue) || numericValue <= 0) {
    return '₹ 13 995'
  }

  return `₹ ${numericValue.toLocaleString('en-IN').replace(/,/g, ' ')}`
}

export const getProductsArray = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data
  }

  return []
}

export const getProductImageUrl = (product) => {
  if (Array.isArray(product.photos) && product.photos[0]) {
    return product.photos[0]
  }

  if (typeof product.image === 'string' && product.image.trim()) {
    if (product.image.startsWith('http://') || product.image.startsWith('https://')) {
      return product.image
    }

    return `${PUBLIC_MEDIA_BASE}${product.image}`
  }

  return ''
}

export const getVisibleProducts = (products, startIndex, visibleCount = 3) => {
  if (!Array.isArray(products) || products.length === 0) {
    return []
  }

  const count = Math.min(visibleCount, products.length)
  return Array.from({ length: count }, (_, offset) => products[(startIndex + offset) % products.length])
}
