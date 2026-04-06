import { Navigate, createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import OrdersPage from './pages/OrdersPage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage'
import PublicPage from './pages/PublicPage'
import ProductDetailPage from './pages/ProductDetailPage'
import { isAdminAuthenticated } from './service/auth.service'

const AdminLayout = () => {
	if (!isAdminAuthenticated()) {
		return <Navigate to="/login" replace />
	}
	return <RootLayout />
}

const LoginGuard = () => {
	if (isAdminAuthenticated()) {
		return <Navigate to="/admin" replace />
	}
	return <LoginPage />
}

const router = createBrowserRouter([
	{
		path: '/login',
		element: <LoginGuard />,
	},
	{
		path: '/admin',
		element: <AdminLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: 'products',
				element: <ProductsPage />,
			},
			{
				path: 'orders',
				element: <OrdersPage />,
			},
		],
	},
	{
		path: '/',
		element: <PublicPage />,
	},
	{
		path: '/',
		element: <PublicPage />,
	},
	{
		path: '/about',
		element: <AboutPage />,
	},
	{
		path: '/product/:id',
		element: <ProductDetailPage />,
	},
])

export default router
