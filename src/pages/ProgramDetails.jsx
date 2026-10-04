import { useT, label, formatDate } from '../i18n'
import { getProgram, localized, statusKey } from '../lib/programs'

function Section({ title, children }) {
  return <section className="d-sec"><h3>{title}</h3>{children}</section>
}

export default function ProgramDetails({ id }) {
  const { lang, t } = useT()
  const p = getProgram(id)
  if (!p) {
    return (
      <div className="container section">
        <div className="empty"><h2>{t('notFound')}</h2><a className="btn" href="#/programs">{t('toCatalog')}</a></div>
      </div>
    )
  }
  const L = (f) => localized(p, f, lang)
  const list = (arr, ordered) => arr.length
    ? (ordered ? <ol>{arr.map((x) => <li key={x}>{x}</li>)}</ol> : <ul>{arr.map((x) => <li key={x}>{x}</li>)}</ul>)
    : <p className="muted">{t('noData')}</p>
  const st = statusKey(p)
  const officialOk = p.officialWebsiteVerified && /^https?:\/\//.test(p.officialWebsite)
  const sourceIsUrl = /^https?:\/\//.test(p.source)

  return (
    <div className="container section">
      <a className="btn ghost small" href="#/programs">{t('back')}</a>
      <article className="panel detail">
        <span className={'badge' + (st === 'stOk' ? '' : ' warn')}>{t(st)}</span>
        <h1>{L('name')}</h1>
        <dl className="kv">
          <dt>{t('operator')}</dt><dd>{L('operator') || '—'}</dd>
          <dt>{t('region')}</dt><dd>{p.region.map((r) => label(lang, 'Регион', r)).join(', ')}</dd>
          <dt>{t('type')}</dt><dd>{label(lang, 'Тип', p.type)}</dd>
          <dt>{t('sphere')}</dt><dd>{p.sphere.map((s) => label(lang, 'Сфера', s)).join(', ') || '—'}</dd>
          <dt>{t('amount')}</dt><dd className="amt">{L('amount') || '—'}</dd>
          {p.deadline && <><dt>{t('deadline')}</dt><dd>{formatDate(p.deadline)}</dd></>}
          <dt>{t('lastCheck')}</dt><dd>{formatDate(p.verified) || '—'}</dd>
        </dl>
        {L('conditions') && <Section title={t('conditions')}><p>{L('conditions')}</p></Section>}
        <Section title={t('fullDesc')}>{L('fullDescription') ? <p>{L('fullDescription')}</p> : <p className="muted">{t('noData')}</p>}</Section>
        <Section title={t('whoFor')}>
          {L('suitableFor').length ? <ul className="checks">{L('suitableFor').map((x) => <li key={x}>{x}</li>)}</ul> : <p className="muted">{t('noData')}</p>}
        </Section>
        <Section title={t('requirements')}>{list(L('requirements'))}</Section>
        <Section title={t('documents')}>{list(L('documents'))}{L('documents').length > 0 && <p className="muted small-note">{t('docsNote')}</p>}</Section>
        <Section title={t('howToGet')}>{list(L('howToGet'), true)}</Section>
        <Section title={t('source')}>
          {sourceIsUrl
            ? <p><a href={p.source} target="_blank" rel="noopener noreferrer">{p.source.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]} ↗</a></p>
            : <p>{p.source || t('noSource')}</p>}
        </Section>
        <p className="disclaimer inline">{t('disclaimer')}</p>
        <div className="official">
          {officialOk ? (
            <a className="btn big" href={p.officialWebsite} target="_blank" rel="noopener noreferrer">{t('official')}</a>
          ) : (
            <div className="warn-box"><strong>{t('officialPending')}</strong><p>{t('officialWhy')}</p></div>
          )}
        </div>
      </article>
    </div>
  )
}
