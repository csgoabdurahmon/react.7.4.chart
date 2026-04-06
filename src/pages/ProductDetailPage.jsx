import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { formatPrice, getProductImageUrl } from '../userpage/utils'
import { TRANSLATIONS } from '../userpage/translations'
import { SUPPORTED_LANGUAGES } from '../userpage/constants'
import { createOrder } from '../service/order.service'

const SIZES = [
  'UK 6', 'UK 6.5', 'UK 7', 'UK 7.5', 'UK 8', 'UK 8.5',
  'UK 9', 'UK 9.5', 'UK 10', 'UK 10.5', 'UK 11', 'UK 11.5', 'UK 12',
]

function ProductDetailPage() {
  const location = useLocation()
  const navigate = useNavigate()

  const product = location.state?.product || null

  const isDarkMode = localStorage.getItem('nike-theme') === 'dark'
  const savedLang = localStorage.getItem('nike-language')
  const language = SUPPORTED_LANGUAGES.includes(savedLang) ? savedLang : 'en'
  const t = TRANSLATIONS[language]

  const [selectedSize, setSelectedSize] = useState(null)
  const [activeImg, setActiveImg] = useState(0)
  const [addedToBag, setAddedToBag] = useState(false)
  const [isFavourite, setIsFavourite] = useState(false)
  const [isAddingToBag, setIsAddingToBag] = useState(false)
  const [addToBagError, setAddToBagError] = useState('')

  if (!product) {
    return (
      <div className={`flex min-h-screen flex-col items-center justify-center gap-4 ${isDarkMode ? 'bg-zinc-900 text-zinc-100' : 'bg-white text-zinc-900'}`}>
        <p className="text-lg text-zinc-500">Product topilmadi.</p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="cursor-pointer rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          ← Bosh sahifaga qaytish
        </button>
      </div>
    )
  }

  const photos = Array.isArray(product.photos) && product.photos.length > 0
    ? product.photos
    : [getProductImageUrl(product)].filter(Boolean)

  const productTitle = product.name || 'Nike Air Max'
  const productCategory = product.category || t.fallbackCategory
  const productPrice = formatPrice(product.price)
  const productDescription = product.description || ''
  const productSize = product.size || ''
  const unitPrice = Number(product.price)
  const safeUnitPrice = Number.isFinite(unitPrice) && unitPrice > 0 ? unitPrice : 0

  const handleAddToBag = async () => {
    try {
      setAddToBagError('')
      setIsAddingToBag(true)

      const orderPayload = {
        customerName: 'Guest User',
        status: 'pending',
        total: safeUnitPrice,
        createdAt: new Date().toISOString(),
        items: [
          {
            productId: product.id || null,
            name: productTitle,
            category: productCategory,
            image: getProductImageUrl(product),
            size: selectedSize || productSize || null,
            quantity: 1,
            price: safeUnitPrice,
          },
        ],
      }

      await createOrder(orderPayload)
      setAddedToBag(true)
      setTimeout(() => setAddedToBag(false), 2000)
    } catch {
      setAddToBagError('Order yaratishda xatolik bo‘ldi. Backendni tekshiring.')
    } finally {
      setIsAddingToBag(false)
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-900 text-zinc-100' : 'bg-white text-zinc-900'}`}>
      {/* Simple Navbar */}
      <header className={`sticky top-0 z-10 border-b px-6 py-4 ${isDarkMode ? 'border-zinc-700 bg-zinc-900' : 'border-zinc-200 bg-white'}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`cursor-pointer flex items-center gap-2 text-sm font-medium transition-colors ${isDarkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'}`}
          >
            ← Orqaga
          </button>
          <span className={`text-lg font-bold tracking-tight ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>NIKE</span>
          <div className="w-16" />
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">

          {/* Chap: rasmlar */}
          <div>
            {/* Asosiy rasm */}
            <div className={`mb-4 overflow-hidden rounded-xl ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`} style={{ aspectRatio: '1/1' }}>
              {photos[activeImg] ? (
                <img
                  src={photos[activeImg]}
                  alt={productTitle}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-500 text-sm">No image</div>
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
                        ? isDarkMode ? 'border-white' : 'border-zinc-900'
                        : isDarkMode
                          ? 'border-zinc-600 hover:border-zinc-400'
                          : 'border-zinc-200 hover:border-zinc-400'
                    }`}
                    style={{ aspectRatio: '1/1' }}
                  >
                    <img src={photo} alt={`${productTitle} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* O'ng: ma'lumotlar */}
          <div className="flex flex-col gap-6">
            {/* Sarlavha */}
            <div>
              <h1 className={`text-3xl font-bold leading-tight ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
                {productTitle}
              </h1>
              <p className={`mt-2 text-base ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{productCategory}</p>
            </div>

            {/* Narx */}
            <div>
              <p className={`text-xl font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
                MRP : {productPrice}
              </p>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                incl. of taxes
              </p>
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
                    className={`cursor-pointer rounded-lg border py-3 text-sm transition-all ${
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
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleAddToBag}
                disabled={isAddingToBag}
                className={`w-full cursor-pointer rounded-full py-4 text-base font-semibold transition-all ${
                  addedToBag
                    ? 'bg-green-600 text-white'
                    : 'bg-zinc-900 text-white hover:opacity-90'
                }`}
              >
                {isAddingToBag ? 'Adding...' : addedToBag ? '✓ Added to Bag' : 'Add to Bag'}
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
              {addToBagError ? <p className="text-sm text-red-500">{addToBagError}</p> : null}
            </div>

            {/* Description */}
            {productDescription ? (
              <div className={`border-t pt-5 ${isDarkMode ? 'border-zinc-700' : 'border-zinc-200'}`}>
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
      </main>
    </div>
  )
}

export default ProductDetailPage
