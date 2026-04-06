import { useEffect, useState } from 'react'
import ProductSection from '../components/ProductSection'
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../service/product.service'

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const fetchProducts = async () => {
    try {
      setError('')
      setLoading(true)
      const data = await getProducts()
      setProducts(Array.isArray(data) ? data : [])
    } catch {
      setError('Productlarni olishda xatolik. Backendni tekshiring.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSubmitProduct = async (values) => {
    try {
      setSubmitting(true)
      setError('')
      if (editingProduct) {
        await updateProduct(editingProduct.id, values)
      } else {
        await createProduct(values)
      }
      setEditingProduct(null)
      await fetchProducts()
    } catch {
      setError('Product saqlashda xatolik bo‘ldi.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteProduct = async (productId) => {
    try {
      setError('')
      await deleteProduct(productId)
      await fetchProducts()
    } catch {
      setError('Product o‘chirishda xatolik bo‘ldi.')
    }
  }

  if (loading) {
    return <p className="text-zinc-600">Loading products...</p>
  }

  return (
    <section className="space-y-5">
      <div>
        <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">Products</p>
        <h1 className="text-3xl font-bold tracking-tight">Product List • Create • Update • Delete</h1>
      </div>

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      ) : null}

      <ProductSection
        products={products}
        editingProduct={editingProduct}
        onSubmitProduct={handleSubmitProduct}
        onDeleteProduct={handleDeleteProduct}
        onEditProduct={setEditingProduct}
        onCancelEdit={() => setEditingProduct(null)}
        submitting={submitting}
      />
    </section>
  )
}

export default ProductsPage