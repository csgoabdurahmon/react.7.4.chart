function EssentialsSection({ isDarkMode, t, cards }) {
  return (
    <section className="px-4 pb-12 mx-auto" style={{ maxWidth: '1420px' }}>
      <h3 className={`mb-6 text-5xl font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>{t.essentialsTitle}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article key={card.label} className="relative overflow-hidden rounded-sm">
            <img src={card.image} alt={card.label} className="object-cover w-full h-140" />
            <button
              type="button"
              className="absolute bottom-6 left-6 cursor-pointer rounded-full bg-white px-7 py-3 text-xl font-medium text-zinc-900 transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              {card.label}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default EssentialsSection
