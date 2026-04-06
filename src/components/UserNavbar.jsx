import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FrameLogo from '../assets/Frame.svg'
import FrameLogo2 from '../assets/nike.svg'
import Search from '../assets/search.svg'
import beg from '../assets/beg.svg'
import Lovies from '../assets/love.svg'

const LANGUAGE_OPTIONS = [
	{ code: 'en', label: 'ENG' },
	{ code: 'uz', label: 'UZB' },
	{ code: 'ru', label: 'RUS' },
]

function UserNavbar({
	isDarkMode = false,
	onToggleTheme = () => {},
	language = 'en',
	onLanguageChange = () => {},
	t,
}) {
	const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
	const languageMenuRef = useRef(null)

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (!languageMenuRef.current?.contains(event.target)) {
				setIsLanguageMenuOpen(false)
			}
		}

		document.addEventListener('mousedown', handleOutsideClick)
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick)
		}
	}, [])

	const activeLanguageLabel =
		LANGUAGE_OPTIONS.find((option) => option.code === language)?.label || 'ENG'

	const handleLanguageSelect = (nextLanguage) => {
		onLanguageChange(nextLanguage)
		setIsLanguageMenuOpen(false)
	}

	return (
		<header className={`${isDarkMode ? 'border-zinc-700 bg-zinc-900' : 'border-zinc-200 bg-white'} border-b`}>
			<div className={`${isDarkMode ? 'border-zinc-700' : 'border-zinc-100'} border-b`}>
				<div
					className={`mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2 text-xs ${
						isDarkMode ? 'text-zinc-300' : 'text-zinc-600'
					}`}
				>
					<img src={FrameLogo} alt="Jumpman" className="w-4 h-4" />
					<div className="flex items-center gap-3">
						<a href="#" className={`cursor-pointer transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-zinc-900'}`}>{t.findStore}</a>
						<span>|</span>
						<a href="#" className={`cursor-pointer transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-zinc-900'}`}>{t.help}</a>
						<span>|</span>
						<a href="#" className={`cursor-pointer transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-zinc-900'}`}>{t.joinUs}</a>
						<span>|</span>
						<Link to="/login" className={`cursor-pointer transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-zinc-900'}`}>{t.signIn}</Link>
					</div>
				</div>
			</div>

			<div className="flex items-center justify-between w-full px-4 py-4 mx-auto max-w-7xl">
				<img src={FrameLogo2} alt="NIKE photo" />

				<nav className={`hidden items-center gap-7 text-base font-medium md:flex ${isDarkMode ? 'text-zinc-200' : 'text-zinc-900'}`}>
					<a href="#" className={`cursor-pointer transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-zinc-600'}`}>{t.newFeatured}</a>
					<a href="#" className={`cursor-pointer transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-zinc-600'}`}>{t.men}</a>
					<a href="#" className={`cursor-pointer transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-zinc-600'}`}>{t.women}</a>
					<a href="#" className={`cursor-pointer transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-zinc-600'}`}>{t.kids}</a>
					<Link to="/about" className={`cursor-pointer transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-zinc-600'}`}>{t.about}</Link>
					<a href="#" className={`cursor-pointer transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-zinc-600'}`}>{t.sale}</a>
					<a href="#" className={`cursor-pointer transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-zinc-600'}`}>{t.snkrs}</a>
				</nav>

				<div className="flex items-center gap-3 text-sm">
					<div className={`hidden items-center rounded-full px-3 py-2 sm:flex ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
						<img className='mr-2 text-zinc-500' src={Search} alt="Search logo" />
						<input
							type="text"
							placeholder={t.searchPlaceholder}
							aria-label="Search products"
							className={`w-32 bg-transparent outline-none ${isDarkMode ? 'text-zinc-100 placeholder-zinc-400' : 'text-zinc-700 placeholder-zinc-400'}`}
						/>
					</div>
					<div className="relative" ref={languageMenuRef}>
						<button
							type="button"
							onClick={() => setIsLanguageMenuOpen((prev) => !prev)}
							className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
								isDarkMode
									? 'border-white bg-zinc-800 text-white hover:bg-zinc-700'
									: 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50'
							}`}
						>
							{activeLanguageLabel}
						</button>

						{isLanguageMenuOpen ? (
							<div
								className={`absolute right-0 z-20 mt-2 min-w-24 rounded-xl border p-1 shadow-lg transition-all ${
									isDarkMode ? 'border-white bg-zinc-800' : 'border-zinc-200 bg-white'
								}`}
							>
								{LANGUAGE_OPTIONS.map((option) => (
									<button
										key={option.code}
										type="button"
										onClick={() => handleLanguageSelect(option.code)}
										className={`block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${
											option.code === language
												? isDarkMode
													? 'bg-white text-zinc-900'
													: 'bg-zinc-900 text-white'
												: isDarkMode
													? 'text-zinc-100 hover:bg-zinc-700'
													: 'text-zinc-700 hover:bg-zinc-100'
										}`}
									>
										{option.label}
									</button>
								))}
							</div>
						) : null}
					</div>
					<button
						type="button"
						onClick={onToggleTheme}
						className={`group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-all duration-300 ${
							isDarkMode
								? 'border-white bg-zinc-800 text-white hover:bg-zinc-700'
								: 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50'
						}`}
						aria-label={t.themeToggle}
					>
						<span
							className={`absolute transition-all duration-300 ${
								isDarkMode ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
							}`}
						>
							<svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
								<circle cx="12" cy="12" r="4" />
								<path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
							</svg>
						</span>
						<span
							className={`absolute transition-all duration-300 ${
								isDarkMode ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'
							}`}
						>
							<svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
								<path d="M21 12.79A9 9 0 1 1 11.21 3c0 .3-.01.6-.01.9a7 7 0 0 0 8.9 8.89c.3 0 .6 0 .9-.01Z" />
							</svg>
						</span>
					</button>
					<button
						type="button"
						className={`cursor-pointer rounded-full border px-3 py-1.5 transition-all ${
							isDarkMode
								? 'border-white hover:border-white hover:bg-zinc-800'
								: 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
						}`}
					>
						<img src={Lovies} alt="" className={isDarkMode ? 'invert' : ''} />
					</button>
					<button
						type="button"
						className={`cursor-pointer rounded-full border px-3 py-1.5 transition-all ${
							isDarkMode
								? 'border-white hover:border-white hover:bg-zinc-800'
								: 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
						}`}
					>
						<img src={beg} alt="" className={isDarkMode ? 'invert' : ''} />
					</button>
				</div>
			</div>

			<div className={`border-t py-3 text-center text-sm ${isDarkMode ? 'border-zinc-700 bg-zinc-800 text-zinc-100' : 'border-zinc-100 bg-zinc-50 text-zinc-800'}`}>
				<p className="font-semibold">{t.helloNikeApp}</p>
				<p className={isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}>{t.downloadText}</p>
			</div>
		</header>
	)
}

export default UserNavbar
