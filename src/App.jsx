import { useEffect, useState } from 'react'
import { LangContext, STRINGS } from './i18n'
import { getOptions, EMPTY_FILTERS } from './lib/programs'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Programs from './pages/Programs'
import ProgramDetails from './pages/ProgramDetails'
import About from './pages/About'

// Маленький роутер на hash (#/programs): работает на любом хостинге без настройки сервера.
function parseHash() {
  const h = window.location.hash.replace(/^#\/?/, '')
  if (h.startsWith('program/')) return { name: 'program', id: h.slice('program/'.length) }
  if (h === 'programs') return { name: 'programs' }
  if (h === 'about') return { name: 'about' }
  return { name: 'home' }
}

function readLang() {
  try { const v = localStorage.getItem('bq_lang'); if (v === 'ru' || v === 'kk') return v } catch { /* ignore */ }
  return 'ru'
}

const options = getOptions()

export default function App() {
  const [route, setRoute] = useState(parseHash())
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [lang, setLangState] = useState(readLang())

  useEffect(() => {
    const onHash = () => { setRoute(parseHash()); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = STRINGS[lang].htmlTitle
  }, [lang])

  const setLang = (l) => { setLangState(l); try { localStorage.setItem('bq_lang', l) } catch { /* ignore */ } }
  const goTo = (path) => { window.location.hash = '#' + path }
  const resetFilters = () => setFilters(EMPTY_FILTERS)

  let page
  if (route.name === 'programs') page = <Programs filters={filters} setFilters={setFilters} options={options} resetFilters={resetFilters} />
  else if (route.name === 'program') page = <ProgramDetails id={route.id} />
  else if (route.name === 'about') page = <About />
  else page = <Home filters={filters} setFilters={setFilters} options={options} goTo={goTo} />

  return (
    <LangContext.Provider value={{ lang }}>
      <Header route={route} setLang={setLang} />
      <main>{page}</main>
      <Footer />
    </LangContext.Provider>
  )
}
