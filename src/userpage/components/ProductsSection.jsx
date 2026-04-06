import { formatPrice, getProductImageUrl } from '../utils'

function ProductsSection({
  isDarkMode,
  t,
  title,
  products,
  loading = false,
  error = false,
  onPrev,
  onNext,
  isAtStart,
  isAtEnd,
  onProductClick,
  sectionPaddingClass = 'px-4 pb-10',
}) {
  return (
    <section className={`${sectionPaddingClass} mx-auto`} style={{ maxWidth: '1340px' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-4xl font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>{title}</h3>
        <div className="flex items-center gap-3">
          <span className={`text-lg font-medium ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>{t.shop}</span>
          <button
            type="button"
            onClick={onPrev}
            disabled={isAtStart}
            className={`h-12 w-12 rounded-full border transition-all ${
              isAtStart
                ? `cursor-not-allowed opacity-30 ${isDarkMode ? 'border-zinc-600 bg-zinc-800 text-zinc-500' : 'border-zinc-200 bg-zinc-100 text-zinc-400'}`
                : `cursor-pointer ${isDarkMode ? 'border-white bg-zinc-800 text-white hover:bg-zinc-700' : 'border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`
            }`}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={isAtEnd}
            className={`h-12 w-12 rounded-full border transition-all ${
              isAtEnd
                ? `cursor-not-allowed opacity-30 ${isDarkMode ? 'border-zinc-600 bg-zinc-800 text-zinc-500' : 'border-zinc-200 bg-zinc-100 text-zinc-400'}`
                : `cursor-pointer ${isDarkMode ? 'border-white bg-zinc-800 text-white hover:bg-zinc-700' : 'border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`
            }`}
          >
            ›
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4" role="status" aria-live="polite" aria-busy="true">
          <div className="flex items-center gap-3">
            <span
              className={`h-5 w-5 animate-spin rounded-full border-2 border-t-transparent ${
                isDarkMode ? 'border-zinc-300' : 'border-zinc-500'
              }`}
            />
            <p className={isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}>{t.loadingProducts}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <article key={`skeleton-${index}`} className="animate-pulse">
                <div className={`mb-4 aspect-4/3 ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
                <div className="space-y-2">
                  <div className={`h-5 w-2/3 rounded ${isDarkMode ? 'bg-zinc-700' : 'bg-zinc-200'}`} />
                  <div className={`h-4 w-1/2 rounded ${isDarkMode ? 'bg-zinc-700' : 'bg-zinc-200'}`} />
                  <div className={`h-4 w-1/3 rounded ${isDarkMode ? 'bg-zinc-700' : 'bg-zinc-200'}`} />
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : error ? (
        <p className={isDarkMode ? 'text-red-300' : 'text-red-600'}>{t.productsUnavailable}</p>
      ) : products.length === 0 ? (
        <p className={isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}>{t.noDataYet}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.map((product, index) => {
            const firstPhoto = getProductImageUrl(product)
            const productTitle = product.name || 'Nike Air Max'
            const productCategory = product.category || t.fallbackCategory
            const productPrice = formatPrice(product.price)

            return (
              <article
                key={`${product.id || productTitle}-${index}`}
                className="cursor-pointer"
                onClick={() => onProductClick && onProductClick(product)}
              >
                <div className={`mb-4 aspect-4/3 overflow-hidden transition-opacity hover:opacity-90 ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                  {firstPhoto ? (
                    <img src={firstPhoto} alt={productTitle} className="object-cover w-full h-full" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-sm text-zinc-500">No image</div>
                  )}
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className={`text-xl font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>{productTitle}</p>
                    <p className={`mt-1 text-base ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>{productCategory}</p>
                  </div>
                  <p className={`text-xl font-semibold whitespace-nowrap ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
                    {productPrice}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default ProductsSection
