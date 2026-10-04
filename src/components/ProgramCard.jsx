import { useT, label, formatDate } from '../i18n'
import { localized, statusKey } from '../lib/programs'

export default function ProgramCard({ program: p }) {
  const { lang, t } = useT()
  const st = statusKey(p)
  const suitable = localized(p, 'suitableFor', lang)
  const short = localized(p, 'shortDescription', lang)
  return (
    <article className="card">
      <span className={'badge' + (st === 'stOk' ? '' : ' warn')}>{t(st)}</span>
      <h3>{localized(p, 'name', lang)}</h3>
      <dl className="facts">
        <div><dt>📍</dt><dd>{p.region.map((r) => label(lang, 'Регион', r)).join(', ')}</dd></div>
        <div><dt>🏷️</dt><dd>{label(lang, 'Тип', p.type)}</dd></div>
        {p.sphere.length > 0 && <div><dt>🧩</dt><dd>{p.sphere.map((s) => label(lang, 'Сфера', s)).join(', ')}</dd></div>}
        {p.amount && <div><dt>💰</dt><dd className="amt">{localized(p, 'amount', lang)}</dd></div>}
      </dl>
      {short && <p className="short">{short}</p>}
      {suitable.length > 0 && (
        <>
          <div className="lbl">{t('suitable')}</div>
          <ul className="checks">{suitable.slice(0, 3).map((s) => <li key={s}>{s}</li>)}</ul>
        </>
      )}
      <div className="card-foot">
        <span>{t('checked')}: {formatDate(p.verified) || '—'}</span>
        <a className="btn small" href={`#/program/${p.id}`}>{t('more')}</a>
      </div>
    </article>
  )
}
