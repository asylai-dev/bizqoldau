import { useT, countText } from '../i18n'
import { published } from '../lib/programs'
import Filters from '../components/Filters'
import SearchBar from '../components/SearchBar'
import QuickFilters from '../components/QuickFilters'

export default function Home({ filters, setFilters, options, goTo }) {
  const { lang, t } = useT()
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>{t('heroTitle')}</h1>
          <p className="hero-sub">{t('heroSub')}</p>
          <div className="hero-box">
            <Filters filters={filters} setFilters={setFilters} options={options} />
            <SearchBar value={filters.query} onChange={(query) => setFilters({ ...filters, query })} onEnter={() => goTo('/programs')} />
            <button className="btn" onClick={() => goTo('/programs')}>{t('find')}</button>
          </div>
          <QuickFilters dark activeType={filters.type} onPick={(type) => { setFilters({ ...filters, type }); goTo('/programs') }} />
        </div>
      </section>
      <section className="container section">
        <h2>{t('howTitle')}</h2>
        <ol className="steps">
          {t('steps').map((s, i) => <li key={s}><b>{i + 1}</b><span>{s}</span></li>)}
        </ol>
        <p className="muted">{t('inCatalog')}: {countText(lang, published.length)}. {t('notIssue')}</p>
      </section>
    </>
  )
}
