import { MenuEntry } from '@crystals/uikit'
import { ContextApi } from 'contexts/Localization/types'
import { getCrystlAddress } from 'utils/addressHelpers'
import getLiquidityUrl from 'utils/getLiquidityUrl'
import getSwapUrl from 'utils/getSwapUrl'
import getTokenInfoUrl from 'utils/getTokenInfoUrl'

const crystlAddress = getCrystlAddress()
const exchangeUrl = getSwapUrl(crystlAddress)
const lpUrl = getLiquidityUrl(`${crystlAddress}/ETH`)
const overviewUrl = getTokenInfoUrl(crystlAddress)
const coinGeckoUrl = `https://www.coingecko.com/en/coins/crystl-finance`
const dexGuruUrl = 'https://dex.guru/token/0x76bf0c28e604cc3fe9967c83b3c3f31c213cfe64-polygon'
const githubUrl = 'https://github.com/polycrystal'
const docsUrl = 'https://polycrystal.gitbook.io/polycrystal-finance/'
const rugDocUrl = 'https://rugdoc.io/project/5405/'
const communityUrl = 'https://linktr.ee/Crystl.Finance'
const suggestionsUrl = 'https://crystlfinance-featuresuggestions.nolt.io/'
const auditUrl = 'https://polycrystal.gitbook.io/polycrystal-finance/security/audits'
const bridgeUrl = 'https://app.relaychain.com/#/cross-chain-bridge-transfer'
const governanceUrl = 'https://vote.crystl.finance/#/'
const getStartedUrl =
  'https://polycrystal.gitbook.io/polycrystal-finance/crystal-clear-education/ultimate-guide-to-polycrystal'
const vaultsLearnUrl =
  'https://polycrystal.gitbook.io/polycrystal-finance/crystal-clear-education/ultimate-guide-to-polycrystal/unmasking-vaults'
const poolsLearnUrl =
  'https://polycrystal.gitbook.io/polycrystal-finance/crystal-clear-education/ultimate-guide-to-polycrystal#pools'
const bridgeLearnUrl =
  'https://polycrystal.gitbook.io/polycrystal-finance/crystal-clear-education/fundamental-tools-for-success/guide-to-bridging-from-polygon-to-cronos'
const troubleshootLearnUrl = 'https://polycrystal.gitbook.io/polycrystal-finance/troubleshooting'
const minesLearnUrl =
  'https://polycrystal.gitbook.io/polycrystal-finance/crystal-clear-education/ultimate-guide-to-polycrystal#mines'

export {
  exchangeUrl,
  lpUrl,
  overviewUrl,
  coinGeckoUrl,
  dexGuruUrl,
  githubUrl,
  docsUrl,
  rugDocUrl,
  communityUrl,
  suggestionsUrl,
  auditUrl,
}

const config: (t: ContextApi['t'], isMobile: boolean) => MenuEntry[] = (t, isMobile) =>
  [
    {
      label: t('Home'),
      icon: 'HomeIcon',
      href: '/',
    },
    {
      label: t('Earn'),
      icon: 'PoolIcon',
      items: [
        {
          label: t('Vaults'),
          href: '/vaults-v2',
        },
        {
          label: t('Legacy Vaults'),
          href: '/vaults',
        },
        {
          label: t('Pools'),
          href: '/pools',
        },
        {
          label: t('Mines'),
          href: '/farms',
        },
        {
          label: t('Hidden Gems'),
          href: '/hidden-gems',
        },
        {
          label: t('Jewels'),
          href: '/jewels',
        },
      ],
    },
    {
      label: t('Learn'),
      icon: 'PoolIcon',
      items: [
        {
          label: t('Get Started'),
          href: getStartedUrl,
        },
        {
          label: t('Vaults'),
          href: vaultsLearnUrl,
        },
        {
          label: t('Pools'),
          href: poolsLearnUrl,
        },
        {
          label: t('Mines'),
          href: minesLearnUrl,
        },
        {
          label: t('Bridge'),
          href: bridgeLearnUrl,
        },
        {
          label: t('Troubleshoot'),
          href: troubleshootLearnUrl,
        },
      ],
    },
    {
      label: t('Trade'),
      icon: 'TradeIcon',
      items: [
        {
          label: t('Exchange'),
          href: exchangeUrl,
        },
        {
          label: t('Liquidity'),
          href: lpUrl,
        },
      ],
    },
    {
      label: t('Vote'),
      icon: 'GovernanceIcon',
      href: governanceUrl,
    },
    {
      label: t('Bridge'),
      icon: 'Bridge',
      href: bridgeUrl,
    },
    {
      label: t('Info'),
      icon: 'InfoCronos',
      items: [
        {
          label: t('Overview'),
          href: overviewUrl,
        },
        {
          label: t('Community'),
          href: communityUrl,
        },
        {
          label: t('Docs'),
          href: docsUrl,
        },
        {
          label: t('Audit'),
          href: auditUrl,
        },
        {
          label: t('CoinGecko'),
          href: coinGeckoUrl,
        },
        {
          label: t('Charts'),
          href: dexGuruUrl,
        },
        {
          label: t('Suggestions'),
          href: suggestionsUrl,
        },
        {
          label: t('Github'),
          href: githubUrl,
        },
      ],
    },
  ].filter((x) => isMobile || x.label !== 'Home')

export default config
