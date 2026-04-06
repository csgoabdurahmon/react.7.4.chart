import { useFormik } from 'formik'
import * as Yup from 'yup'
import ProductCard from './ProductCard'
import PhotoUpload from './PhotoUpload'

const validationSchema = Yup.object({
	name: Yup.string().required('Name majburiy'),
	size: Yup.string().required('Size majburiy'),
	description: Yup.string().required('Description majburiy'),
	photos: Yup.string().required('Rasm tanlang'),
})

function ProductSection({
	products,
	editingProduct,
	onSubmitProduct,
	onDeleteProduct,
	onEditProduct,
	onCancelEdit,
	submitting,
}) {
	const formik = useFormik({
		initialValues: {
			name: editingProduct?.name || '',
			size: editingProduct?.size || '',
			description: editingProduct?.description || '',
			photos: Array.isArray(editingProduct?.photos) ? editingProduct.photos.join(', ') : '',
		},
		enableReinitialize: true,
		validationSchema,
		onSubmit: async (values, helpers) => {
			await onSubmitProduct(values)
			helpers.resetForm()
		},
	})

	return (
		<section className="grid gap-6 lg:grid-cols-[380px_1fr]">
			<div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
				<h2 className="text-xl font-bold">{editingProduct ? 'Update Product' : 'Create Product'}</h2>
				<p className="mt-1 text-xs text-zinc-500">Formik form with required fields</p>

				<form className="mt-4 space-y-3" onSubmit={formik.handleSubmit}>
					<div>
						<label htmlFor="name" className="mb-1 block text-sm text-zinc-700">
							Name
						</label>
						<input
							id="name"
							name="name"
							type="text"
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 outline-none transition-colors focus:border-zinc-900"
						/>
						{formik.touched.name && formik.errors.name ? (
							<p className="mt-1 text-xs text-red-400">{formik.errors.name}</p>
						) : null}
					</div>

					<div>
						<label htmlFor="size" className="mb-1 block text-sm text-zinc-700">
							Size
						</label>
						<input
							id="size"
							name="size"
							type="text"
							value={formik.values.size}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 outline-none transition-colors focus:border-zinc-900"
						/>
						{formik.touched.size && formik.errors.size ? (
							<p className="mt-1 text-xs text-red-400">{formik.errors.size}</p>
						) : null}
					</div>

					<div>
						<label htmlFor="description" className="mb-1 block text-sm text-zinc-700">
							Description
						</label>
						<textarea
							id="description"
							name="description"
							rows={4}
							value={formik.values.description}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 outline-none transition-colors focus:border-zinc-900"
						/>
						{formik.touched.description && formik.errors.description ? (
							<p className="mt-1 text-xs text-red-400">{formik.errors.description}</p>
						) : null}
					</div>

					<PhotoUpload
						value={formik.values.photos}
						onChange={(value) => formik.setFieldValue('photos', value)}
						error={formik.errors.photos}
						touched={formik.touched.photos}
					/>

					<div className="flex gap-2 pt-1">
						<button
							type="submit"
							disabled={submitting}
							className="cursor-pointer rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{editingProduct ? 'Save Update' : 'Save'}
						</button>
						{editingProduct ? (
							<button
								type="button"
								onClick={onCancelEdit}
								className="cursor-pointer rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition-colors hover:border-zinc-900 hover:text-zinc-900"
							>
								Cancel
							</button>
						) : null}
					</div>
				</form>
			</div>

			<div>
				<h2 className="mb-4 text-xl font-bold">Product List</h2>
				{products.length === 0 ? (
					<div className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-500 shadow-sm">
						Product yo‘q
					</div>
				) : (
					<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
						{products.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								onEdit={onEditProduct}
								onDelete={onDeleteProduct}
							/>
						))}
					</div>
				)}
			</div>
		</section>
	)
}

export default ProductSection
