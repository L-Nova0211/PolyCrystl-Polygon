import React, { lazy, useEffect } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { ResetCSS } from '@crystals/uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import useScrollOnRouteChange from 'hooks/useScrollOnRouteChange'
import { usePollCoreFarmData, useFetchProfile, usePollBlockNumber } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
import EasterEgg from './components/EasterEgg'
import Pools from './views/Pools'
import history from './routerHistory'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Vaults = lazy(() => import('./views/Vaults'))
const VaultsV2 = lazy(() => import('./views/VaultsV2'))
const SingleFarms = lazy(() => import('./views/SingleFarms'))
const HiddenGems = lazy(() => import('./views/HiddenGems'))
const NotFound = lazy(() => import('./views/NotFound'))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  usePollBlockNumber()
  useEagerConnect()
  useFetchProfile()
  usePollCoreFarmData()
  useScrollOnRouteChange()

  const { account } = useWeb3React()

  useEffect(() => {
    if (account) window.dataLayer?.push({ event: 'wallet_connect', user_id: account })
  }, [account])

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Redirect from="/gems" to="/jewels" />
            <Route path="/jewels">
              <SingleFarms />
            </Route>
            <Route path="/vaults">
              <Vaults />
            </Route>
            <Route path="/vaults-v2/:project?/:pair?">
              <VaultsV2 />
            </Route>
            <Route path="/hidden-gems">
              <HiddenGems />
            </Route>
            <Route path="/pools">
              <Pools />
            </Route>
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      <EasterEgg iterations={2} />
      <ToastListener />
    </Router>
  )
}

export default React.memo(App)
