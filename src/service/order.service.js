import api from '../config/axios.config'

// Barcha orderlarni olish
export const getOrders = async () => {
	const response = await api.get('/orders')
	return response.data
}

// Order statusini yangilash (cancelled, delivered)
export const updateOrderStatus = async (orderId, newStatus) => {
	const response = await api.patch(`/orders/${orderId}`, { status: newStatus })
	return response.data
}

export const createOrder = async (orderData) => {
	const response = await api.post('/orders', orderData)
	return response.data
}