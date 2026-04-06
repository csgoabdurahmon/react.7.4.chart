import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function RootLayout() {
	return (
		<div className="flex flex-col min-h-screen bg-zinc-50 text-zinc-900">
			<Navbar />
			<main className="flex-1 w-full px-4 py-8 mx-auto max-w-7xl">
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default RootLayout
