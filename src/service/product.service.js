import api from '../config/axios.config'

const normalizeProductPhotos = (photos) => {
	if (Array.isArray(photos)) {
		return photos.filter((photo) => photo && String(photo).trim())
	}

	if (typeof photos === 'string') {
		return photos.trim() ? [photos] : []
	}

	return []
}

const prepareProductData = (formValues) => ({
	name: formValues.name?.trim() || '',
	size: formValues.size?.trim() || '',
	description: formValues.description?.trim() || '',
	photos: normalizeProductPhotos(formValues.photos),
})

// Barcha productlarni olish
export const getProducts = async () => {
	const response = await api.get('/products')
	return response.data
}

// Yangi product qoshish
export const createProduct = async (formValues) => {
	const productData = prepareProductData(formValues)
	const response = await api.post('/products', productData)
	return response.data
}

// Mavjud productni yangilash
export const updateProduct = async (productId, formValues) => {
	const productData = prepareProductData(formValues)
	const response = await api.patch(`/products/${productId}`, productData)
	return response.data
}

// Productni ochirib tashlash
export const deleteProduct = async (productId) => {
	await api.delete(`/products/${productId}`)
}
