import { useState } from 'react'
import { useT, countText, label } from '../i18n'
import { published, filterPrograms, sortPrograms, hasActiveFilters, NATIONWIDE, ALL_REGIONS } from '../lib/programs'
import Filters from '../components/Filters'
import SearchBar from '../components/SearchBar'
import QuickFilters from '../components/QuickFilters'
import ProgramCard from '../components/ProgramCard'

export default function Programs({ filters, setFilters, options, resetFilters }) {
  const { lang, t } = useT()
  const [sort, setSort] = useState('default')
  const [view, setView] = useState('grid')
  const results = sortPrograms(filterPrograms(published, filters), sort, lang)
  const active = hasActiveFilters(filters)
  const showNote = filters.region && filters.region !== ALL_REGIONS && filters.region !== NATIONWIDE
  const ctx = [filters.region && label(lang, 'Регион', filters.region), filters.sphere && label(lang, 'Сфера', filters.sphere), filters.type && label(lang, 'Тип', filters.type)].filter(Boolean)

  return (
    <div className="container section">
      <h1 className="page-title">{t('allPrograms')}</h1>
      <div className="panel filters-panel">
        <SearchBar value={filters.query} onChange={(query) => setFilters({ ...filters, query })} />
        <Filters filters={filters} setFilters={setFilters} options={options} />
        <QuickFilters activeType={filters.type} onPick={(type) => setFilters({ ...filters, type })} />
        {active && <button className="btn ghost small" onClick={resetFilters}>{t('reset')}</button>}
      </div>

      <div className="toolbar">
        <div>
          <strong className="count" aria-live="polite">{t('found')} {countText(lang, results.length)}</strong>
          {ctx.length > 0 && <span className="muted"> · {ctx.join(' → ')}</span>}
        </div>
        <div className="tools">
          <select aria-label={t('sort')} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">{t('sortDefault')}</option>
            <option value="name">{t('sortName')}</option>
            <option value="checked">{t('sortChecked')}</option>
          </select>
          <div className="seg" role="group">
            <button className={view === 'grid' ? 'on' : ''} onClick={() => setView('grid')}>{t('viewGrid')}</button>
            <button className={view === 'list' ? 'on' : ''} onClick={() => setView('list')}>{t('viewList')}</button>
          </div>
        </div>
      </div>
      {showNote && <p className="note-box">{t('natl')}</p>}

      {results.length > 0 ? (
        <div className={'grid ' + view}>{results.map((p) => <ProgramCard key={p.id} program={p} />)}</div>
      ) : (
        <div className="empty">
          <h2>{t('emptyTitle')}</h2>
          <p>{t('emptyText')}</p>
          <button className="btn" onClick={resetFilters}>{t('reset')}</button>
        </div>
      )}
    </div>
  )
}
