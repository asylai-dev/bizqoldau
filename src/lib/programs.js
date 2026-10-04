import { programs } from '../data/programs'
import { REGION_ORDER, LABELS_KK } from '../data/labels'

export const ALL_REGIONS = 'Все регионы'
export const ALL_SPHERES = 'Все сферы'
export const NATIONWIDE = 'Вся РК'

// Только программы со статусом «Опубликовано» попадают на сайт.
export const published = programs.filter((p) => p.status === 'Опубликовано')

export function getProgram(id) {
  return published.find((p) => p.id === Number(id))
}

// Значение поля на выбранном языке; если казахского нет — русское.
export function localized(p, field, lang) {
  if (lang === 'kk' && p.kk) {
    const v = p.kk[field]
    if (Array.isArray(v) ? v.length > 0 : v) return v
  }
  return p[field]
}

function unique(list, field, skip) {
  const out = []
  list.forEach((p) => p[field].forEach((v) => { if (v !== skip && !out.includes(v)) out.push(v) }))
  return out
}

// Варианты фильтров формируются из данных Excel.
export function getOptions() {
  const fromData = unique(programs, 'region')
  const regions = [...REGION_ORDER.filter((r) => r !== ALL_REGIONS && r !== NATIONWIDE)]
  fromData.forEach((r) => { if (r !== NATIONWIDE && !regions.includes(r)) regions.push(r) })
  regions.push(NATIONWIDE)
  const spheres = unique(published, 'sphere', ALL_SPHERES).sort()
  const types = [...new Set(published.map((p) => p.type))].sort()
  return { regions, spheres, types }
}

const STOP = ['для', 'на', 'по', 'и', 'в', 'с', 'от', 'до', 'или']

function stem(token) {
  return token.length <= 4 ? token : token.slice(0, Math.max(4, token.length - 2))
}

function searchWords(p) {
  const k = p.kk || {}
  const text = [
    p.name, p.shortDescription, p.sphere.join(' '), p.type, p.keywords.join(' '), p.suitableFor.join(' '), p.conditions,
    p.sphere.map((s) => LABELS_KK['Сфера']?.[s] || '').join(' '), LABELS_KK['Тип']?.[p.type] || '',
    k.name, k.shortDescription, (k.keywords || []).join(' '), (k.suitableFor || []).join(' '), k.conditions,
  ].join(' ').toLowerCase()
  return text.split(/[^\p{L}\p{N}]+/u).filter(Boolean)
}

function matchesQuery(p, query) {
  const tokens = query.toLowerCase().split(/\s+/).filter((w) => w && !STOP.includes(w))
  if (!tokens.length) return true
  const words = searchWords(p)
  return tokens.every((tk) => { const s = stem(tk); return words.some((w) => w.startsWith(s)) })
}

// Все фильтры работают одновременно. «Вся РК» и «Все сферы» в данных подходят под любой выбор.
export function filterPrograms(list, { region, sphere, type, query }) {
  return list.filter((p) => {
    const regionOk = !region || region === ALL_REGIONS || p.region.includes(region) || p.region.includes(NATIONWIDE)
    const sphereOk = !sphere || sphere === ALL_SPHERES || p.sphere.includes(sphere) || p.sphere.includes(ALL_SPHERES)
    const typeOk = !type || p.type === type
    return regionOk && sphereOk && typeOk && matchesQuery(p, query || '')
  })
}

export function sortPrograms(list, sort, lang) {
  const out = [...list]
  if (sort === 'name') out.sort((a, b) => localized(a, 'name', lang).localeCompare(localized(b, 'name', lang), lang === 'kk' ? 'kk' : 'ru'))
  if (sort === 'checked') out.sort((a, b) => (b.verified || '').localeCompare(a.verified || ''))
  return out
}

export function statusKey(p) {
  if (p.deadline) {
    const today = new Date(); today.setHours(0, 0, 0, 0)
    const days = Math.round((new Date(p.deadline + 'T00:00:00') - today) / 864e5)
    if (days < 0) return 'stOld'
    if (days <= 30) return 'stSoon'
  }
  return 'stOk'
}

export const hasActiveFilters = (f) => !!(f.region || f.sphere || f.type || f.query.trim())
export const EMPTY_FILTERS = { region: '', sphere: '', type: '', query: '' }
