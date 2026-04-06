import UserNavbar from '../../components/UserNavbar'

function PublicNavbar({ isDarkMode, onToggleTheme, language, onLanguageChange, t }) {
  return (
    <UserNavbar
      isDarkMode={isDarkMode}
      onToggleTheme={onToggleTheme}
      language={language}
      onLanguageChange={onLanguageChange}
      t={t}
    />
  )
}

export default PublicNavbar
