import { useT } from '../i18n'

// Быстрые кнопки выбирают тип поддержки (значения совпадают с колонкой «Тип» в Excel).
const QUICK = [
  { icon: '🎁', key: 'qGrant', type: 'Грант' },
  { icon: '💰', key: 'qCredit', type: 'Льготный кредит' },
  { icon: '📉', key: 'qSubsidy', type: 'Субсидия ставки' },
  { icon: '🧾', key: 'qTax', type: 'Налоговая льгота' },
]

export default function QuickFilters({ activeType, onPick, dark }) {
  const { t } = useT()
  return (
    <div className={'quick' + (dark ? ' dark' : '')}>
      {QUICK.map((q) => (
        <button
          key={q.type}
          className={'chip' + (activeType === q.type ? ' on' : '')}
          aria-pressed={activeType === q.type}
          onClick={() => onPick(activeType === q.type ? '' : q.type)}
        >
          <span aria-hidden="true">{q.icon}</span> {t(q.key)}
        </button>
      ))}
    </div>
  )
}
