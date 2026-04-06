import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { getAdminName, logoutAdmin } from '../service/auth.service'

const linkBaseClass =
	'rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200'

const getLinkClassName = ({ isActive }) =>
	`${linkBaseClass} ${
		isActive
			? 'border-zinc-900 bg-zinc-900 text-white shadow-sm'
			: 'border-zinc-300 bg-white text-zinc-700 hover:border-zinc-900 hover:text-zinc-900'
	}`

function Navbar() {
	const navigate = useNavigate()
	const adminName = getAdminName()
	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

	const handleLogoutClick = () => {
		setIsLogoutModalOpen(true)
	}

	const handleConfirmLogout = () => {
		logoutAdmin()
		setIsLogoutModalOpen(false)
		navigate('/login', { replace: true })
	}

	return (
		<>
			<header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/90 backdrop-blur">
				<div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4">
					<div>
						<p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">Nike Admin</p>
						<p className="text-sm font-semibold text-zinc-900">{adminName}</p>
					</div>

					<nav className="flex items-center gap-2">
						<NavLink to="/admin" end className={getLinkClassName}>
							Dashboard
						</NavLink>
						<NavLink to="/admin/products" className={getLinkClassName}>
							Products
						</NavLink>
						<NavLink to="/admin/orders" className={getLinkClassName}>
							Orders
						</NavLink>
						<button
							type="button"
							onClick={handleLogoutClick}
							className="cursor-pointer rounded-lg border border-zinc-900 bg-zinc-900 px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
						>
							Logout
						</button>
					</nav>
				</div>
			</header>

			{isLogoutModalOpen ? (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
					<div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
						<h3 className="text-lg font-bold text-zinc-900">Rostdan ham chiqasizmi?</h3>
						<p className="mt-2 text-sm text-zinc-600">Agar chiqsangiz, qayta login qilishingiz kerak bo‘ladi.</p>
						<div className="mt-5 flex justify-end gap-2">
							<button
								type="button"
								onClick={() => setIsLogoutModalOpen(false)}
								className="cursor-pointer rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-900 hover:text-zinc-900"
							>
								Yo‘q
							</button>
							<button
								type="button"
								onClick={handleConfirmLogout}
								className="cursor-pointer rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
							>
								Ha, chiqish
							</button>
						</div>
					</div>
				</div>
			) : null}
		</>
	)
}

export default Navbar
