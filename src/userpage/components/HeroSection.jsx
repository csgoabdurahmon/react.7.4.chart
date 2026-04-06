function HeroSection({ isDarkMode, t, imageSrc, imageAlt = 'Hero' }) {
  return (
    <section className="px-4 pt-6 mx-auto" style={{ maxWidth: '1340px' }}>
      <p className={`mb-3 text-sm font-medium ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
        {t.firstLook}
      </p>
      <div style={{ width: '100%', height: '700px', overflow: 'hidden' }}>
        <img src={imageSrc} alt={imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <div className="py-10 text-center">
        <h2 className={`text-5xl font-black tracking-tight uppercase ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
          {t.title}
        </h2>
        <p className={`mx-auto mt-4 max-w-xl text-base leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
          {t.description}
        </p>
        <div className="mt-6">
          <button
            type="button"
            className="cursor-pointer rounded-full bg-zinc-900 px-8 py-3 text-base font-medium text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            {t.shopAirMax}
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
