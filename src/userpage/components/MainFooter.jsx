function MainFooter({ t }) {
  return (
    <footer className="px-4 text-white bg-black py-14">
      <div className="mx-auto" style={{ maxWidth: '1340px' }}>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-6">
            {t.footerTopPrimary.map((item) => (
              <p key={item} className="text-sm font-semibold uppercase transition-colors cursor-pointer hover:text-zinc-300">
                {item}
              </p>
            ))}
            {t.footerTopSecondary.map((item) => (
              <p key={item} className="text-sm transition-colors cursor-pointer text-zinc-300 hover:text-white">
                {item}
              </p>
            ))}
          </div>

          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase">{t.footerHelpTitle}</p>
            <div className="space-y-4 text-sm text-zinc-400">
              {t.footerHelpItems.map((item) => (
                <p key={item} className="transition-colors cursor-pointer hover:text-white">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase">{t.footerAboutTitle}</p>
            <div className="space-y-4 text-sm text-zinc-400">
              {t.footerAboutItems.map((item) => (
                <p key={item} className="transition-colors cursor-pointer hover:text-white">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="flex justify-start md:justify-end">
            <div className="flex items-start gap-3">
              {['T', 'F', 'Y', 'I'].map((icon) => (
                <span
                  key={icon}
                  className="flex items-center justify-center w-10 h-10 text-xs font-semibold transition-colors rounded-full cursor-pointer bg-zinc-700 text-zinc-200 hover:bg-zinc-500"
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-12 mt-12 text-sm border-t border-zinc-800 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-6 text-zinc-300">
            <span className="text-white transition-colors cursor-pointer hover:text-zinc-300">{t.footerLocale}</span>
            <span>{t.footerCopyright}</span>
          </div>

          <div className="flex flex-wrap gap-6 text-zinc-400">
            {t.footerBottomLinks.map((item) => (
              <p key={item} className="transition-colors cursor-pointer hover:text-white">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default MainFooter
