import { useState } from 'react'

function PhotoUpload({ value, onChange, error, touched }) {
	const [imagePreview, setImagePreview] = useState('')

	// Fayl tanlanganida rasm ko'rsatish va base64 ga o'tkazish
	const handleImageSelect = (event) => {
		const selectedFile = event.target.files?.[0]
		if (selectedFile) {
			// Rasm preview uchun FileReader
			const fileReader = new FileReader()
			fileReader.onloadend = () => {
				// Base64 formatda rasm tayyorlash
				const base64Image = fileReader.result
				setImagePreview(base64Image)
				onChange(base64Image)
			}
			fileReader.readAsDataURL(selectedFile)
		}
	}

	// Tanlangan rasmni o'chirib tashlash
	const removeImage = () => {
		setImagePreview('')
		onChange('')
	}

	return (
		<div>
			<label htmlFor="photo" className="block mb-1 text-sm text-zinc-700">
				Rasm Tanlash
			</label>

			{/* Rasm preview */}
			{imagePreview ? (
				<div className="relative mb-3">
					<img
						src={imagePreview}
						alt="Tanlangan rasm"
						className="object-cover w-full h-32 border rounded-lg border-zinc-300"
					/>
					<button
						type="button"
						onClick={removeImage}
						className="absolute right-2 top-2 cursor-pointer rounded bg-red-500 px-2 py-1 text-xs text-white transition-colors hover:bg-red-600"
					>
						O'chirish
					</button>
				</div>
			) : null}

			{/* Fayl input */}
			<input
				id="photo"
				type="file"
				accept="image/*"
				onChange={handleImageSelect}
				className="block w-full cursor-pointer text-sm file:mr-2 file:cursor-pointer file:rounded-lg file:border file:border-zinc-300 file:bg-white file:px-3 file:py-2 file:text-zinc-700 file:transition-colors file:hover:border-zinc-900"
			/>

			{/* Xato xabari */}
			{touched && error ? <p className="mt-1 text-xs text-red-400">{error}</p> : null}
		</div>
	)
}

export default PhotoUpload
