import React from 'react'
import { Menu as UikitMenu, useMatchBreakpoints } from '@crystals/uikit'
import { useWeb3React } from '@web3-react/core'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import { usePriceCrystlBusd } from 'state/hooks'
import getTokenInfoUrl from 'utils/getTokenInfoUrl'
import { getCrystlAddress } from 'utils/addressHelpers'
import config from './config'

const Menu = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { isDark } = useTheme()
  const crystlPriceUsd = usePriceCrystlBusd()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const infoLink = getTokenInfoUrl(getCrystlAddress())
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  return (
    <UikitMenu
      account={account}
      login={login}
      logout={logout}
      isDark={isDark}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      crystlPriceUsd={crystlPriceUsd.toNumber()}
      links={config(t, isMobile)}
      infoLink={infoLink}
      {...props}
    />
  )
}

export default Menu
