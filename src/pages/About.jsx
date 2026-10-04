import { useT } from '../i18n'

export default function About() {
  const { t } = useT()
  return (
    <div className="container section">
      <article className="panel detail">
        <h1>{t('aboutTitle')}</h1>
        <p className="lead">{t('aboutText')}</p>
        <h2>{t('howTitle')}</h2>
        <ol className="steps">
          {t('steps').map((s, i) => <li key={s}><b>{i + 1}</b><span>{s}</span></li>)}
        </ol>
        <h3>{t('aboutSrcTitle')}</h3>
        <p>{t('aboutSrc')}</p>
        <h3>{t('aboutWhyTitle')}</h3>
        <p>{t('aboutWhy')}</p>
        <a className="btn" href="#/programs">{t('seeAll')}</a>
      </article>
    </div>
  )
}
