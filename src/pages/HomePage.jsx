import { Link } from 'react-router-dom'

function HomePage() {
	return (
		<section className="space-y-6">
			<div>
				<p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">Admin Dashboard</p>
				<h1 className="mt-2 text-3xl font-bold tracking-tight">Nike Control Panel</h1>
				<p className="mt-2 text-sm text-zinc-600">Product va order boshqaruvi shu yerdan qilinadi.</p>
			</div>

		<div className="grid gap-4 md:grid-cols-2">
			<Link
				to="/admin/products"
				className="cursor-pointer rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-zinc-900 hover:shadow-md"
			>
				<p className="text-xs uppercase tracking-wide text-zinc-500">Product</p>
				<h2 className="mt-1 text-xl font-semibold text-zinc-900">List • Create • Update • Delete</h2>
			</Link>

			<Link
				to="/admin/orders"
				className="cursor-pointer rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-zinc-900 hover:shadow-md"
			>
				<p className="text-xs uppercase tracking-wide text-zinc-500">Order</p>
				<h2 className="mt-1 text-xl font-semibold text-zinc-900">List • Cancel • Delivered</h2>
			</Link>
		</div>
		</section>
	)
}

export default HomePage
