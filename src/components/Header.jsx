import { useState } from 'react'
import { useT } from '../i18n'

export default function Header({ route, setLang }) {
  const { lang, t } = useT()
  const [open, setOpen] = useState(false)
  const items = [
    { href: '#/', key: 'navHome', active: route.name === 'home' },
    { href: '#/programs', key: 'navAll', active: route.name === 'programs' || route.name === 'program' },
    { href: '#/about', key: 'navAbout', active: route.name === 'about' },
  ]
  return (
    <header className="header">
      <div className="container header-in">
        <a className="logo" href="#/" onClick={() => setOpen(false)}>Biz<span>Qoldau</span></a>
        <button className="burger" aria-label={t('menu')} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? '✕' : '☰'}
        </button>
        <nav className={'nav' + (open ? ' open' : '')}>
          {items.map((i) => (
            <a key={i.href} href={i.href} className={i.active ? 'on' : ''} onClick={() => setOpen(false)}>{t(i.key)}</a>
          ))}
          <span className="lang" role="group" aria-label="Language">
            <button className={lang === 'ru' ? 'on' : ''} onClick={() => setLang('ru')}>RU</button>
            <button className={lang === 'kk' ? 'on' : ''} onClick={() => setLang('kk')}>ҚАЗ</button>
          </span>
        </nav>
      </div>
    </header>
  )
}
