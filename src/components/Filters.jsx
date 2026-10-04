import { useT, label } from '../i18n'

export default function Filters({ filters, setFilters, options }) {
  const { lang, t } = useT()
  const set = (key) => (e) => setFilters({ ...filters, [key]: e.target.value })
  return (
    <div className="filters">
      <select aria-label={t('pickRegion')} value={filters.region} onChange={set('region')}>
        <option value="">{t('pickRegion')}</option>
        {options.regions.map((v) => <option key={v} value={v}>{label(lang, 'Регион', v)}</option>)}
      </select>
      <select aria-label={t('pickSphere')} value={filters.sphere} onChange={set('sphere')}>
        <option value="">{t('pickSphere')}</option>
        {options.spheres.map((v) => <option key={v} value={v}>{label(lang, 'Сфера', v)}</option>)}
      </select>
      <select aria-label={t('pickType')} value={filters.type} onChange={set('type')}>
        <option value="">{t('pickType')}</option>
        {options.types.map((v) => <option key={v} value={v}>{label(lang, 'Тип', v)}</option>)}
      </select>
    </div>
  )
}
