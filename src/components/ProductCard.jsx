function ProductCard({ product, onEdit, onDelete }) {
	const photo = Array.isArray(product.photos) ? product.photos[0] : ''

	return (
		<article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
			<div className="mb-3 h-44 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
				{photo ? (
					<img src={photo} alt={product.name} className="h-full w-full object-cover" />
				) : (
					<div className="flex h-full items-center justify-center text-sm text-zinc-500">No photo</div>
				)}
			</div>

			<h3 className="text-lg font-semibold text-zinc-900">{product.name}</h3>
			<p className="mt-1 text-sm text-zinc-500">Size: {product.size || 'N/A'}</p>
			<p className="mt-2 text-sm text-zinc-600">{product.description || 'No description'}</p>

			<div className="mt-4 flex gap-2">
				<button
					type="button"
					onClick={() => onEdit(product)}
					className="cursor-pointer rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-900 hover:text-zinc-900"
				>
					Update
				</button>
				<button
					type="button"
					onClick={() => onDelete(product.id)}
					className="cursor-pointer rounded-lg bg-zinc-900 px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
				>
					Delete
				</button>
			</div>
		</article>
	)
}

export default ProductCard
