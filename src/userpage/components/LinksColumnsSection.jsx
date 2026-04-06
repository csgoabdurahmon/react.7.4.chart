function LinksColumnsSection({ isDarkMode, t }) {
  const groups = [
    { title: t.footerIconsTitle, items: t.footerIconsItems },
    { title: t.footerShoesTitle, items: t.footerShoesItems },
    { title: t.footerClothingTitle, items: t.footerClothingItems },
    { title: t.footerKidsTitle, items: t.footerKidsItems },
  ]

  return (
    <section className="px-4 py-12 mx-auto" style={{ maxWidth: '1340px' }}>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-14">
        {groups.map((group) => (
          <div key={group.title}>
            <h4 className={`mb-5 text-3xl font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>{group.title}</h4>
            <div className="space-y-3">
              {group.items.map((item) => (
                <p key={item} className={`text-2xl leading-normal ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default LinksColumnsSection
