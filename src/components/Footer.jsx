import { useT } from '../i18n'

export default function Footer() {
  const { t } = useT()
  return (
    <footer className="footer">
      <div className="container">
        <p className="disclaimer">{t('disclaimer')}</p>
        <p className="copy">© BizQoldau MVP</p>
      </div>
    </footer>
  )
}
