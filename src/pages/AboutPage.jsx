import { useNavigate } from 'react-router-dom'

function AboutPage() {
  const navigate = useNavigate()
  const isDarkMode = localStorage.getItem('nike-theme') === 'dark'

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-900 text-zinc-100' : 'bg-white text-zinc-900'}`}>
      <header className={`border-b px-6 py-4 ${isDarkMode ? 'border-zinc-700 bg-zinc-900' : 'border-zinc-200 bg-white'}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`cursor-pointer text-sm font-medium transition-colors ${isDarkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'}`}
          >
            ← Orqaga
          </button>
          <p className={`text-lg font-bold ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>About</p>
          <div className="w-16" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className={`text-4xl font-bold tracking-tight ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
          Nike Product Experience
        </h1>
        <p className={`mt-4 text-base leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
          Bu bo‘limda mahsulot sahifasi haqida ma’lumot beriladi. Endi product card bosilganda alohida
          sahifa ochiladi va unda rasm, narx, description, size va boshqa ma’lumotlar ko‘rinadi.
        </p>

        <div className={`mt-8 rounded-2xl border p-6 ${isDarkMode ? 'border-zinc-700 bg-zinc-800' : 'border-zinc-200 bg-zinc-50'}`}>
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>Nimalar bor:</h2>
          <ul className={`mt-3 list-disc pl-5 text-sm leading-7 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            <li>Product rasmi va gallery</li>
            <li>Narx va category</li>
            <li>Size tanlash</li>
            <li>Add to Bag va Favourite</li>
            <li>Description va qo‘shimcha info</li>
          </ul>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-6 cursor-pointer rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Bosh sahifaga qaytish
          </button>
        </div>
      </main>
    </div>
  )
}

export default AboutPage
