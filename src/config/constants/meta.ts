import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_URL = `https://${process.env.REACT_APP_DOMAIN}`

export const SITE_TITLE = process.env.REACT_APP_DEFAULT_TITLE

export const DEFAULT_META_DESCRIPTION = process.env.REACT_APP_META_DESCRIPTION

export const DEFAULT_META: PageMeta = {
  title: SITE_TITLE,
  description: DEFAULT_META_DESCRIPTION,
  image: `${DEFAULT_URL}/twitter-card.png?v=${process.env.REACT_APP_VERCEL_GIT_COMMIT_SHA}`,
  url: DEFAULT_URL,
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  const url = `${DEFAULT_URL}${path}`
  switch (path) {
    case '/':
      return {
        title: t(SITE_TITLE),
        url: DEFAULT_URL,
      }
    case '/farms':
    case '/farms/history':
      return {
        title: `${t('Farms')} | ${t(SITE_TITLE)}`,
        url,
      }
    case '/pools':
    case '/pools/history':
      return {
        title: `${t('Pools')} | ${t(SITE_TITLE)}`,
      }
    case '/hidden-gems':
    case '/hidden-gems/history':
      return {
        title: `${t('Hidden Gems')} | ${t(SITE_TITLE)}`,
      }
    case '/jewels':
    case '/jewels/history':
      return {
        title: `${t('Jewels')} | ${t(SITE_TITLE)}`,
        url,
      }
    case '/vaults':
    case '/vaults/history':
      return {
        title: `${t('Vaults V1')} | ${t(SITE_TITLE)}`,
        url,
      }
    case path.match('^/vaults-v2')?.input:
      return {
        title: `${t('Vaults V2')} | ${t(SITE_TITLE)}`,
        url,
      }
    default:
      return {
        title: `${t('Not Found')} | ${t(SITE_TITLE)}`,
        url,
      }
  }
}
