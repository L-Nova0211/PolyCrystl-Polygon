import React, { useEffect, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Text, NewLogoIcon } from '@crystals/uikit'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import { useVaults, usePollVaultData, usePriceCrystlBusd } from 'state/hooks'
import { Vault } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { orderBy } from 'lodash'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import { latinise } from 'utils/latinise'
import useDebounce from 'hooks/useDebounce'
import VaultsLogo from 'components/Logos/VaultsV1Logo'
import VaultCard from './components/VaultCard/VaultCard'
import VaultTabButtons from './components/VaultTabButtons'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const NUMBER_OF_FARMS_VISIBLE = 12

const Vaults: React.FC = () => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { data: vaultList, isInitialized } = useVaults()
  const crystlPrice = usePriceCrystlBusd()
  const [searchQuery, setQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 100)
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('apy')

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  usePollVaultData(isArchived)

  const [stakedOnly, setStakedOnly] = useState(!isActive)
  useEffect(() => {
    setStakedOnly(!isActive)
  }, [isActive])

  const activeVaults = vaultList?.filter((vault) => vault.paused === false && vault.inactive === false)
  const inactiveVaults = vaultList?.filter((vault) => vault.inactive === true || vault.paused === true)

  const stakedOnlyVaults = activeVaults?.filter(
    (vault) => vault.userData && new BigNumber(vault.userData.stakedWantBalance).isGreaterThan(0),
  )

  const stakedInactiveVaults = inactiveVaults?.filter(
    (vault) => vault.userData && new BigNumber(vault.userData.stakedWantBalance).isGreaterThan(0),
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const [numberOfVaultsVisible, setNumberOfVaultsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)

  const vaultsStakedMemoized = useMemo(() => {
    let vaultsStaked = []

    const sortVaults = (vaults: Vault[]): Vault[] => {
      switch (sortOption) {
        case 'staked':
          return orderBy(
            vaults,
            (vault: Vault) => (vault.userData ? Number(vault.userData.stakedBalanceUSD) : 0),
            'desc',
          )
        case 'tvl':
          return orderBy(vaults, (vault: Vault) => Number(vault.totalValueLocked), 'desc')
        default:
        case 'apy':
          return orderBy(vaults, (vault: Vault) => vault.apys.dailyApy, 'desc')
      }
    }

    if (isActive) {
      vaultsStaked = stakedOnly ? stakedOnlyVaults : activeVaults
    }
    if (isInactive) {
      vaultsStaked = stakedOnly ? stakedInactiveVaults : inactiveVaults
    }

    const sortedVaults = sortVaults(vaultsStaked)?.slice(0, numberOfVaultsVisible)

    if (debouncedSearchQuery && debouncedSearchQuery.length > 0) {
      const lowercaseQuery = latinise(debouncedSearchQuery.toLowerCase())
      return sortedVaults.filter((vault) => latinise(vault.lpSymbol.toLowerCase()).includes(lowercaseQuery))
    }

    return sortedVaults
  }, [
    debouncedSearchQuery,
    sortOption,
    activeVaults,
    inactiveVaults,
    isActive,
    isInactive,
    stakedInactiveVaults,
    stakedOnly,
    stakedOnlyVaults,
    numberOfVaultsVisible,
  ])

  useEffect(() => {
    const showMoreVaults = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfVaultsVisible((vaultsCurrentlyVisible) => vaultsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreVaults, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [vaultsStakedMemoized, observerIsSet])

  const renderContent = (): JSX.Element => {
    return (
      <>
        {isInitialized && vaultsStakedMemoized ? (
          <div>
            <Route exact path={`${path}`}>
              {vaultsStakedMemoized.map((vault) => (
                <VaultCard key={vault.pid} vault={vault} crystlPrice={crystlPrice} account={account} removed={false} />
              ))}
            </Route>
            <Route exact path={`${path}/history`}>
              {vaultsStakedMemoized.map((vault) => (
                <VaultCard key={vault.pid} vault={vault} crystlPrice={crystlPrice} account={account} removed />
              ))}
            </Route>
          </div>
        ) : (
          <>
            <div>
              <StyledNotFound>
                <NewLogoIcon width="64px" mb="8px" />
                <Text mb="16px">{t('Loading Vaults...')}</Text>
              </StyledNotFound>
            </div>
          </>
        )}
      </>
    )
  }

  return (
    <Page>
      <PageHeader>
        <VaultsLogo />
      </PageHeader>
      <ControlContainer>
        <ViewControls>
          <VaultTabButtons
            stakedOnly={stakedOnly}
            hasStakeInFinishedVaults={stakedInactiveVaults.length > 0}
            setStakedOnly={setStakedOnly}
          />
        </ViewControls>
        <FilterContainer>
          <LabelWrapper>
            <Text textTransform="uppercase">{t('Sort by')}</Text>
            <Select
              options={[
                {
                  label: t('APY'),
                  value: 'apy',
                },
                {
                  label: t('TVL'),
                  value: 'tvl',
                },
                {
                  label: t('Staked'),
                  value: 'staked',
                },
              ]}
              onChange={handleSortOptionChange}
            />
          </LabelWrapper>
          <LabelWrapper style={{ marginLeft: 16 }}>
            <Text textTransform="uppercase">{t('Search')}</Text>
            <SearchInput onChange={handleChangeQuery} placeholder="Search Vaults" />
          </LabelWrapper>
        </FilterContainer>
      </ControlContainer>
      {renderContent()}
      <div ref={loadMoreRef} />
    </Page>
  )
}

export default Vaults
