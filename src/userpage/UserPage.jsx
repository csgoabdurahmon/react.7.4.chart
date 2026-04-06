import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import firstHeroImage from '../assets/Image.svg'
import secondHeroImage from '../assets/run.svg'
import jordanImage from '../assets/jordan.svg'
import essentialsMenImage from '../assets/shirt.svg'
import essentialsWomenImage from '../assets/shirt2.svg'
import essentialsKidsImage from '../assets/shirt3.svg'
import { PUBLIC_PRODUCTS_ENDPOINT, SUPPORTED_LANGUAGES } from './constants'
import { TRANSLATIONS } from './translations'
import { getProductsArray, getVisibleProducts } from './utils'
import PublicNavbar from './components/PublicNavbar'
import HeroSection from './components/HeroSection'
import ProductsSection from './components/ProductsSection'
import JordanSection from './components/JordanSection'
import EssentialsSection from './components/EssentialsSection'
import LinksColumnsSection from './components/LinksColumnsSection'
import MainFooter from './components/MainFooter'

function UserPage() {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('nike-theme') === 'dark')
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [productsLoading, setProductsLoading] = useState(true)
  const [productsError, setProductsError] = useState('')
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('nike-language')
    return SUPPORTED_LANGUAGES.includes(savedLanguage) ? savedLanguage : 'en'
  })
  const [carousel2Index, setCarousel2Index] = useState(0)
  const navigate = useNavigate()

  const t = TRANSLATIONS[language]

  useEffect(() => {
    localStorage.setItem('nike-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  useEffect(() => {
    localStorage.setItem('nike-language', language)
  }, [language])

  useEffect(() => {
    let isCancelled = false

    const fetchFeaturedProducts = async () => {
      const requestStartedAt = Date.now()

      try {
        setProductsLoading(true)
        setProductsError('')
        const response = await fetch(PUBLIC_PRODUCTS_ENDPOINT)

        if (!response.ok) {
          throw new Error('Products request failed')
        }

        const payload = await response.json()

        if (!isCancelled) {
          const normalizedProducts = getProductsArray(payload)
          setFeaturedProducts(normalizedProducts)
          setCarouselIndex(0)
          setCarousel2Index(0)
        }
      } catch {
        if (!isCancelled) {
          setProductsError('failed')
          setFeaturedProducts([])
          setCarouselIndex(0)
          setCarousel2Index(0)
        }
      } finally {
        const elapsedMs = Date.now() - requestStartedAt
        const remainingMs = Math.max(0, 1000 - elapsedMs)

        if (remainingMs > 0) {
          await new Promise((resolve) => setTimeout(resolve, remainingMs))
        }

        if (!isCancelled) {
          setProductsLoading(false)
        }
      }
    }

    fetchFeaturedProducts()

    return () => {
      isCancelled = true
    }
  }, [])

  const handleToggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode)
  }

  const handleLanguageChange = (nextLanguage) => {
    if (SUPPORTED_LANGUAGES.includes(nextLanguage)) {
      setLanguage(nextLanguage)
    }
  }

  const isAtStart = carouselIndex === 0
  const isAtEnd = featuredProducts.length === 0 || carouselIndex >= featuredProducts.length - 1

  const handlePrevProducts = () => {
    if (!isAtStart) setCarouselIndex((index) => index - 1)
  }

  const handleNextProducts = () => {
    if (!isAtEnd) setCarouselIndex((index) => index + 1)
  }

  const visibleProducts = getVisibleProducts(featuredProducts, carouselIndex, 3)

  const secondProducts = featuredProducts.slice(3)
  const isAt2Start = carousel2Index === 0
  const isAt2End = secondProducts.length === 0 || carousel2Index >= secondProducts.length - 1

  const handlePrev2 = () => {
    if (!isAt2Start) setCarousel2Index((index) => index - 1)
  }

  const handleNext2 = () => {
    if (!isAt2End) setCarousel2Index((index) => index + 1)
  }

  const visibleProducts2 = getVisibleProducts(secondProducts, carousel2Index, 3)

  const essentialsCards = [
    { image: essentialsMenImage, label: t.essentialsMen },
    { image: essentialsWomenImage, label: t.essentialsWomen },
    { image: essentialsKidsImage, label: t.essentialsKids },
  ]

  return (
    <div className={`flex min-h-screen flex-col ${isDarkMode ? 'bg-zinc-900 text-zinc-100' : 'bg-white text-zinc-900'}`}>
      <PublicNavbar
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        language={language}
        onLanguageChange={handleLanguageChange}
        t={t}
      />

      <main className="flex-1 w-full">
        <HeroSection isDarkMode={isDarkMode} t={t} imageSrc={firstHeroImage} imageAlt="Hero" />

        <ProductsSection
          isDarkMode={isDarkMode}
          t={t}
          title={t.bestOfAirMax}
          products={visibleProducts}
          loading={productsLoading}
          error={Boolean(productsError)}
          onPrev={handlePrevProducts}
          onNext={handleNextProducts}
          isAtStart={isAtStart}
          isAtEnd={isAtEnd}
          onProductClick={(product) => navigate('/product/' + (product.id || product.name), { state: { product } })}
        />

        <HeroSection isDarkMode={isDarkMode} t={t} imageSrc={secondHeroImage} imageAlt="Featured" />

        {(productsLoading || secondProducts.length > 0) && (
          <ProductsSection
            isDarkMode={isDarkMode}
            t={t}
            title="Gear Up"
            products={visibleProducts2}
            loading={productsLoading}
            onPrev={handlePrev2}
            onNext={handleNext2}
            isAtStart={isAt2Start}
            isAtEnd={isAt2End}
            onProductClick={(product) => navigate('/product/' + (product.id || product.name), { state: { product } })}
          />
        )}

        <JordanSection isDarkMode={isDarkMode} t={t} imageSrc={jordanImage} />

        <EssentialsSection isDarkMode={isDarkMode} t={t} cards={essentialsCards} />

        <LinksColumnsSection isDarkMode={isDarkMode} t={t} />

        <MainFooter t={t} />
      </main>
    </div>
  )
}

export default UserPage
