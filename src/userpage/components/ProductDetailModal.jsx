import { useEffect, useState } from 'react'
import { formatPrice, getProductImageUrl } from '../utils'

const SIZES = ['UK 6', 'UK 6.5', 'UK 7', 'UK 7.5', 'UK 8', 'UK 8.5', 'UK 9', 'UK 9.5', 'UK 10', 'UK 10.5', 'UK 11', 'UK 11.5', 'UK 12']

function ProductDetailModal({ product, isDarkMode, t, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null)
  const [activeImg, setActiveImg] = useState(0)
  const [addedToBag, setAddedToBag] = useState(false)
  const [isFavourite, setIsFavourite] = useState(false)

  const photos = Array.isArray(product.photos) && product.photos.length > 0
    ? product.photos
    : [getProductImageUrl(product)].filter(Boolean)

  const productTitle = product.name || 'Nike Air Max'
  const productCategory = product.category || t.fallbackCategory
  const productPrice = formatPrice(product.price)
  const productDescription = product.description || ''
  const productSize = product.size || ''

  // ESC tugmasini bosganda yopilsin
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleAddToBag = () => {
    setAddedToBag(true)
    setTimeout(() => setAddedToBag(false), 2000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
          isDarkMode ? 'bg-zinc-900 text-zinc-100' : 'bg-white text-zinc-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className={`absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition-colors ${
            isDarkMode
              ? 'border-zinc-600 bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100'
          }`}
        >
          ✕
        </button>

        <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
          {/* Chap: rasmlar */}
          <div className={`p-6 ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-50'} rounded-tl-2xl rounded-bl-2xl`}>
            {/* Asosiy rasm */}
            <div className={`mb-4 overflow-hidden rounded-xl ${isDarkMode ? 'bg-zinc-700' : 'bg-zinc-100'}`} style={{ aspectRatio: '1/1' }}>
              {photos[activeImg] ? (
                <img
                  src={photos[activeImg]}
                  alt={productTitle}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-zinc-500">No image</div>
              )}
            </div>

            {/* Thumbnail rasmlar */}
            {photos.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {photos.map((photo, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveImg(index)}
                    className={`overflow-hidden rounded-lg border-2 cursor-pointer transition-all ${
                      activeImg === index
                        ? 'border-zinc-900'
                        : isDarkMode
                          ? 'border-zinc-600 hover:border-zinc-400'
                          : 'border-zinc-200 hover:border-zinc-400'
                    }`}
                    style={{ aspectRatio: '1/1' }}
                  >
                    <img src={photo} alt={`${productTitle} ${index + 1}`} className="object-cover w-full h-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* O'ng: ma'lumotlar */}
          <div className="flex flex-col gap-5 p-8">
            {/* Sarlavha */}
            <div>
              <h2 className={`text-2xl font-bold leading-tight ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
                {productTitle}
              </h2>
              <p className={`mt-1 text-base ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{productCategory}</p>
            </div>

            {/* Narx */}
            <div>
              <p className={`text-xl font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
                MRP : {productPrice}
              </p>
              <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>incl. of taxes</p>
            </div>

            {/* Size tanlash */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-zinc-900'}`}>Select Size</p>
                {productSize ? (
                  <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Available: {productSize}</p>
                ) : null}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`cursor-pointer rounded-lg border py-2.5 text-sm transition-all ${
                      selectedSize === size
                        ? 'border-zinc-900 bg-zinc-900 text-white'
                        : isDarkMode
                          ? 'border-zinc-600 text-zinc-200 hover:border-zinc-300'
                          : 'border-zinc-300 text-zinc-800 hover:border-zinc-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Bag + Favourite */}
            <div className="flex flex-col gap-3 mt-2">
              <button
                type="button"
                onClick={handleAddToBag}
                className={`w-full cursor-pointer rounded-full py-4 text-base font-semibold transition-all ${
                  addedToBag
                    ? 'bg-green-600 text-white'
                    : 'bg-zinc-900 text-white hover:opacity-90'
                }`}
              >
                {addedToBag ? '✓ Added to Bag' : 'Add to Bag'}
              </button>
              <button
                type="button"
                onClick={() => setIsFavourite((prev) => !prev)}
                className={`w-full cursor-pointer rounded-full border py-4 text-base font-semibold transition-all ${
                  isFavourite
                    ? isDarkMode
                      ? 'border-white bg-white text-zinc-900'
                      : 'border-zinc-900 bg-zinc-900 text-white'
                    : isDarkMode
                      ? 'border-zinc-500 text-zinc-200 hover:border-zinc-300'
                      : 'border-zinc-300 text-zinc-900 hover:border-zinc-900'
                }`}
              >
                {isFavourite ? '♥ Favourited' : '♡ Favourite'}
              </button>
            </div>

            {/* Description */}
            {productDescription ? (
              <div>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {productDescription}
                </p>
              </div>
            ) : null}

            {/* Qo'shimcha info */}
            <div className={`border-t pt-4 space-y-1 text-xs ${isDarkMode ? 'border-zinc-700 text-zinc-400' : 'border-zinc-200 text-zinc-500'}`}>
              {productSize ? <p>Size: {productSize}</p> : null}
              <p>Style: {product.id || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailModal
