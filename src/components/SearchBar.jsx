import { useT } from '../i18n'

export default function SearchBar({ value, onChange, onEnter }) {
  const { t } = useT()
  return (
    <input
      className="search"
      type="search"
      aria-label={t('searchLabel')}
      placeholder={t('searchPh')}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => { if (e.key === 'Enter' && onEnter) onEnter() }}
    />
  )
}
