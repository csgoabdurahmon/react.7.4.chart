import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5555'

const api = axios.create({
	baseURL: apiBaseUrl,
	headers: {
		'Content-Type': 'application/json',
	},
})

export default api
