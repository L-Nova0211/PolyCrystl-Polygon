import React, { useEffect, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useLocation, useParams } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Text, NewLogoIcon } from '@crystals/uikit'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import { usePollVaultV2Data, useVaultsV2 } from 'state/hooks'
import { Vault } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { orderBy } from 'lodash'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import { latinise } from 'utils/latinise'
import useDebounce from 'hooks/useDebounce'
import VaultsLogo from 'components/Logos/VaultsV2Logo'
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

const VaultsV2: React.FC = () => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { data: vaultList, isInitialized, isLoading } = useVaultsV2()
  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  const params = useParams<{ project: string; pair?: string }>()
  const defaultQuery =
    isActive && params.project
      ? `:${params.project.toLowerCase()}${params.pair ? `/${params.pair.toLowerCase()}` : ''}`
      : ''
  const [searchQuery, setQuery] = useState(defaultQuery)
  const debouncedSearchQuery = useDebounce(searchQuery, 100)
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('apy')

  usePollVaultV2Data(isArchived)

  const [stakedOnly, setStakedOnly] = useState(!isActive)
  useEffect(() => {
    setStakedOnly(!isActive)
  }, [isActive])

  const activeVaults = vaultList?.filter((vault) => vault.paused === false)
  const inactiveVaults = vaultList?.filter((vault) => vault.paused === true)

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

    const sortedVaults = sortVaults(vaultsStaked)

    if (debouncedSearchQuery && debouncedSearchQuery.length > 0) {
      const lowercaseQuery = latinise(debouncedSearchQuery.toLowerCase())
      if (lowercaseQuery.startsWith(':')) {
        const [projectQuery, pairQuery] = lowercaseQuery.split(':')[1].split('/')
        let pairQueryArray = []
        if (pairQuery) {
          pairQueryArray = pairQuery.split('_')
        }
        return sortedVaults?.filter(
          (vault) =>
            vault.farmType &&
            latinise(vault.farmType.toLowerCase()).includes(projectQuery) &&
            (pairQueryArray.length === 0 ||
              pairQueryArray.includes(latinise(vault.lpSymbol.toLowerCase().split(' ')[0]))),
        )
      }
      const sortResult = sortedVaults?.filter((vault) =>
        latinise(vault.lpSymbol.toLowerCase()).includes(lowercaseQuery),
      )
      return sortResult
    }

    return sortedVaults?.slice(0, numberOfVaultsVisible)
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

  let vaultContent

  if (isInitialized && (vaultsStakedMemoized.length > 0 || !isLoading)) {
    vaultContent = (
      <div>
        <Route exact path={`${path}`}>
          {vaultsStakedMemoized.map((vault) => (
            <VaultCard key={vault.pid} vault={vault} account={account} />
          ))}
        </Route>
        <Route exact path={`${path}/history`}>
          {vaultsStakedMemoized.map((vault) => (
            <VaultCard key={vault.pid} vault={vault} account={account} />
          ))}
        </Route>
      </div>
    )
  } else if (!isInitialized && !isLoading && vaultsStakedMemoized) {
    vaultContent = (
      <div>
        <StyledNotFound>
          <NewLogoIcon width="64px" mb="8px" />
          <Text mb="16px">{t('The network is currently experiencing issues. Please try again in a few minutes.')}</Text>
        </StyledNotFound>
      </div>
    )
  } else {
    vaultContent = (
      <div>
        <StyledNotFound>
          <NewLogoIcon width="64px" mb="8px" />
          <Text mb="16px">{t('Loading Vaults...')}</Text>
        </StyledNotFound>
      </div>
    )
  }
  const renderContent = (): JSX.Element => {
    return vaultContent
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
            <SearchInput onChange={handleChangeQuery} placeholder="Search Vaults" defaultText={defaultQuery} />
          </LabelWrapper>
        </FilterContainer>
      </ControlContainer>
      {renderContent()}
      <div ref={loadMoreRef} />
    </Page>
  )
}

export default VaultsV2
