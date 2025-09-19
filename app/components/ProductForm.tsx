import React, { useState } from 'react'

interface ProductFormProps {
	onClose: () => void
}

const ProductForm: React.FC<ProductFormProps> = ({ onClose }) => {
	const [name, setName] = useState('')
	const [size, setSize] = useState<string>('')
	const [stock, setStock] = useState<string>('')
	const [orders, setOrders] = useState<string>('')
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState<string>('')
	const [image, setImage] = useState<File | null>(null)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		if (!name.trim()) {
			setError('Please enter a product name')
			return
		}
		if (!size) {
			setError('Please select a size')
			return
		}
		if (!image) {
			setError('Please add an image')
			return
		}
		setSubmitting(true)
		let imageUrl = ''
		if (image) {
			const formData = new FormData()
			formData.append('file', image)
			const uploadRes = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			})
			if (!uploadRes.ok) throw new Error('Image upload failed')
			const { url } = await uploadRes.json()
			imageUrl = url
		}
		const data = {
			name: name.trim(),
			imageUrl: imageUrl,
			size: parseInt(size) || 0,
			stock: stock === '' ? 0 : parseInt(stock) || 0,
			orders: orders === '' ? 0 : parseInt(orders) || 0,
		}
		try {
			const res = await fetch('/api/products', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})
			if (!res.ok) {
				const data = await res.json().catch(() => ({}))
				throw new Error(data.error || 'Failed to add product')
			}
			onClose()
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Something went wrong')
		} finally {
			setSubmitting(false)
		}
	}
	return (
		<div className="relative w-full flex justify-center">
			<div className="absolute top-10 z-30 w-full max-w-screen-md border border-[#D9D9D9] bg-white rounded-sm p-4 space-y-3">
				<div className="flex justify-between items-center">
					<h1 className="text-lg font-medium text-[#1A1A1A]">Add Product</h1>
					<button onClick={onClose} className="w-8 h-8 rounded-sm bg-[#D4D4D4] text-sm" >
						X
					</button>
				</div>
				<form className="space-y-3 flex flex-col justify-center items-center" onSubmit={handleSubmit}>
					<input type="text" placeholder="Product Name" value={name}
						onChange={(e) => setName(e.target.value)}
						className="h-[36px] w-full text-sm px-3 outline-none border border-[#D4D4D4] rounded-sm" />
					<div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 w-full">
						<select value={size} onChange={(e) => setSize(e.target.value)}
							className="h-[36px] text-sm px-2 border outline-none border-[#D4D4D4] rounded-sm appearance-none pr-8" >
							<option value="" className='text-[#D4D4D4]'>Item Size</option>
							<option value="1">Small</option>
							<option value="2">Medium</option>
							<option value="3">Large</option>
						</select>
						<input type="number" placeholder="Amount In Stock" value={stock}
							onChange={(e) => setStock(e.target.value)}
							className="h-[36px] w-full text-sm px-3 outline-none border border-[#D4D4D4] rounded-sm" />
						<input type="number" placeholder="Orders" value={orders}
							onChange={(e) => setOrders(e.target.value)}
							className="h-[36px] w-full text-sm px-3 outline-none border border-[#D4D4D4] rounded-sm" />
					</div>
					<label className="h-[36px] w-full flex items-center justify-center text-sm text-[#404040] border border-[#D4D4D4] rounded-sm cursor-pointer">
						<span>{image ? image.name : "Upload Image"}</span>
						<input type="file" accept="image/*"
							onChange={(e) => setImage(e.target.files?.[0] ?? null)}
							className="hidden" />
					</label>
					{error && (
						<div className="w-full text-sm text-red-600">{error}</div>
					)}
					<button type="submit" disabled={submitting} className='text-center mx-auto max-w-40 bg-[var(--blue)] text-white rounded-sm w-full p-2 disabled:opacity-50'>
						{submitting ? 'Submitting…' : 'Submit'}
					</button>
				</form>
			</div>
		</div>
	)
}

export default ProductForm
