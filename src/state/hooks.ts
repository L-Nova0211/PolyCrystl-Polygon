import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { orderBy } from 'lodash'
import { Team } from 'config/constants/types'
import Nfts from 'config/constants/nfts'
import { farmsConfig } from 'config/constants'
import { getWeb3NoAccount } from 'utils/web3'
import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import useRefresh from 'hooks/useRefresh'
import { filterFarmsByQuoteToken } from 'utils/farmsPriceHelpers'
import {
  fetchFarmsPublicDataAsync,
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  fetchCrystlVaultPublicData,
  fetchCrystlVaultUserData,
  fetchCrystlVaultFees,
  fetchVaults,
  fetchVaultsV2,
  setBlock,
} from './actions'
import {
  State,
  Farm,
  Pool,
  Vault,
  ProfileState,
  TeamsState,
  AchievementState,
  FarmsState,
  VaultState,
  VaultStateV2,
} from './types'
import { fetchProfile } from './profile'
import { fetchTeam, fetchTeams } from './teams'
import { fetchAchievements } from './achievements'
import { fetchWalletNfts } from './collectibles'
import { getCanClaim } from './predictions/helpers'
import { transformPool } from './pools/helpers'
import { fetchPoolsStakingLimitsAsync } from './pools'
import { fetchFarmUserDataAsync, nonArchivedFarms } from './farms'

export const usePollFarmsData = (includeArchive = false) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  const web3 = getWeb3NoAccount()
  const { account } = useWeb3React()

  useEffect(() => {
    const farmsToFetch = includeArchive ? farmsConfig : nonArchivedFarms
    const pids = farmsToFetch.map((farmToFetch) => farmToFetch.pid)

    dispatch(fetchFarmsPublicDataAsync(pids))

    if (account) {
      dispatch(fetchFarmUserDataAsync({ account, pids }))
    }
  }, [includeArchive, dispatch, slowRefresh, web3, account])
}

export const usePollVaultData = (includeArchive = false) => {
  const dispatch = useAppDispatch()
  const { fastRefresh } = useRefresh()
  const web3 = getWeb3NoAccount()
  const { account } = useWeb3React()
  useEffect(() => {
    dispatch(fetchVaults(account))
  }, [includeArchive, dispatch, fastRefresh, web3, account])
}

export const usePollVaultV2Data = (includeArchive = false) => {
  const dispatch = useAppDispatch()
  const { fastRefresh } = useRefresh()
  const web3 = getWeb3NoAccount()
  const { account } = useWeb3React()
  useEffect(() => {
    dispatch(fetchVaultsV2(account))
  }, [includeArchive, dispatch, fastRefresh, web3, account])
}
/**
 * Fetches the "core" farm data used globally
 * 251 = CRYSTL-MATIC LP
 * 252 = BUSD-BNB LP
 */
export const usePollCoreFarmData = () => {
  const dispatch = useAppDispatch()
  const { fastRefresh } = useRefresh()
  const web3 = getWeb3NoAccount()

  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync([1, 2]))
  }, [dispatch, fastRefresh, web3])
}

export const usePollBlockNumber = () => {
  const dispatch = useAppDispatch()
  const web3 = getWeb3NoAccount()

  useEffect(() => {
    const interval = setInterval(async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      dispatch(setBlock(blockNumber))
    }, 6000)

    return () => clearInterval(interval)
  }, [dispatch, web3])
}

// Vaults
export const useVaults = (): VaultState => {
  const { isInitialized, isLoading, data }: VaultState = useSelector((state: State) => state.vaults)
  const vaults = data
    ? data.filter((vault) => {
        return vault !== null
      })
    : []
  return { data: vaults, isInitialized, isLoading }
}

export const useVaultFromPid = (pid): Vault => {
  const vault = useSelector((state: State) => state.vaults.data.find((v) => v.pid === pid))
  return vault
}

export const useVaultFromLpSymbol = (lpSymbol: string): Vault => {
  const vault = useSelector((state: State) => state.vaults.data.find((v) => v.lpSymbol === lpSymbol))
  return vault
}

export const useVaultUser = (pid) => {
  const vault = useVaultFromPid(pid)

  return {
    allowance: vault.userData ? new BigNumber(vault.userData.allowance) : BIG_ZERO,
    tokenBalance: vault.userData ? new BigNumber(vault.userData.tokenBalance) : BIG_ZERO,
    stakedBalance: vault.userData ? new BigNumber(vault.userData.stakedBalance) : BIG_ZERO,
    stakedWantBalance: vault.userData ? new BigNumber(vault.userData.stakedWantBalance) : BIG_ZERO,
  }
}

// Vaults V2
export const useVaultsV2 = (): VaultState => {
  const { isInitialized, isLoading, data }: VaultStateV2 = useSelector((state: State) => state.vaultsV2)
  const vaults = data
    ? data.filter((vault) => {
        return vault !== null
      })
    : []
  return { data: vaults, isInitialized, isLoading }
}

export const useVaultV2FromPid = (pid): Vault => {
  const vault = useSelector((state: State) => state.vaults.data.find((v) => v.pid === pid))
  return vault
}

export const useVaultV2FromLpSymbol = (lpSymbol: string): Vault => {
  const vault = useSelector((state: State) => state.vaultsV2.data.find((v) => v.lpSymbol === lpSymbol))
  return vault
}

export const useVaultV2User = (pid) => {
  const vault = useVaultFromPid(pid)

  return {
    allowance: vault.userData ? new BigNumber(vault.userData.allowance) : BIG_ZERO,
    tokenBalance: vault.userData ? new BigNumber(vault.userData.tokenBalance) : BIG_ZERO,
    stakedBalance: vault.userData ? new BigNumber(vault.userData.stakedBalance) : BIG_ZERO,
    stakedWantBalance: vault.userData ? new BigNumber(vault.userData.stakedWantBalance) : BIG_ZERO,
  }
}

// Farms

export const useFarms = (): FarmsState => {
  const farms = useSelector((state: State) => state.farms)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromLpSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : BIG_ZERO,
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : BIG_ZERO,
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : BIG_ZERO,
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : BIG_ZERO,
  }
}

// Return a farm for a given token symbol. The farm is filtered based on attempting to return a farm with a quote token from an array of preferred quote tokens
export const useFarmFromTokenSymbol = (tokenSymbol: string, preferredQuoteTokens?: string[]): Farm => {
  const farms = useSelector((state: State) => state.farms.data.filter((farm) => farm.token.symbol === tokenSymbol))
  const filteredFarm = filterFarmsByQuoteToken(farms, preferredQuoteTokens)
  return filteredFarm
}

// Return the base token price for a farm, from a given pid
export const useBusdPriceFromPid = (pid: number): BigNumber => {
  const farm = useFarmFromPid(pid)
  return farm && new BigNumber(farm.token.busdPrice)
}

export const useBusdPriceFromToken = (tokenSymbol: string): BigNumber => {
  const tokenFarm = useFarmFromTokenSymbol(tokenSymbol)
  const tokenPrice = useBusdPriceFromPid(tokenFarm?.pid)
  return tokenPrice
}

export const useLpTokenPrice = (symbol: string) => {
  const farm = useFarmFromLpSymbol(symbol)
  const farmTokenPriceInUsd = useBusdPriceFromPid(farm.pid)
  let lpTokenPrice = BIG_ZERO

  if (farm.lpTotalSupply && farm.lpTotalInQuoteToken) {
    // Total value of base token in LP
    const valueOfBaseTokenInFarm = farmTokenPriceInUsd.times(farm.tokenAmountTotal)
    // Double it to get overall value in LP
    const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2)
    // Divide total value of all tokens, by the number of LP tokens
    const totalLpTokens = getBalanceAmount(new BigNumber(farm.lpTotalSupply))
    lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokens)
  }

  return lpTokenPrice
}

// Pools

export const useFetchPublicPoolsData = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  const web3 = getWeb3NoAccount()

  useEffect(() => {
    const fetchPoolsPublicData = async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      dispatch(fetchPoolsPublicDataAsync(blockNumber))
    }

    fetchPoolsPublicData()
    dispatch(fetchPoolsStakingLimitsAsync())
  }, [dispatch, slowRefresh, web3])
}

export const usePools = (account): { pools: Pool[]; userDataLoaded: boolean } => {
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const { pools, userDataLoaded } = useSelector((state: State) => ({
    pools: state.pools.data,
    userDataLoaded: state.pools.userDataLoaded,
  }))
  return { pools: pools.map(transformPool), userDataLoaded }
}

export const useAllPools = (): Pool[] => {
  const pools = useSelector((state: State) => state.pools.data)
  return pools
}

export const usePoolFromPid = (sousId: number): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))
  return transformPool(pool)
}

export const useFetchCrystlVault = () => {
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCrystlVaultPublicData())
  }, [dispatch, fastRefresh])

  useEffect(() => {
    dispatch(fetchCrystlVaultUserData({ account }))
  }, [dispatch, fastRefresh, account])

  useEffect(() => {
    dispatch(fetchCrystlVaultFees())
  }, [dispatch])
}

export const useCrystlVault = () => {
  const {
    totalShares: totalSharesAsString,
    pricePerFullShare: pricePerFullShareAsString,
    totalCrystlInVault: totalCrystlInVaultAsString,
    estimatedCrystlBountyReward: estimatedCrystlBountyRewardAsString,
    totalPendingCrystlHarvest: totalPendingCrystlHarvestAsString,
    fees: { performanceFee, callFee, withdrawalFee, withdrawalFeePeriod },
    userData: {
      isLoading,
      userShares: userSharesAsString,
      crystlAtLastUserAction: crystlAtLastUserActionAsString,
      lastDepositedTime,
      lastUserActionTime,
    },
  } = useSelector((state: State) => state.pools.crystlVault)

  const estimatedCrystlBountyReward = useMemo(() => {
    return new BigNumber(estimatedCrystlBountyRewardAsString)
  }, [estimatedCrystlBountyRewardAsString])

  const totalPendingCrystlHarvest = useMemo(() => {
    return new BigNumber(totalPendingCrystlHarvestAsString)
  }, [totalPendingCrystlHarvestAsString])

  const totalShares = useMemo(() => {
    return new BigNumber(totalSharesAsString)
  }, [totalSharesAsString])

  const pricePerFullShare = useMemo(() => {
    return new BigNumber(pricePerFullShareAsString)
  }, [pricePerFullShareAsString])

  const totalCrystlInVault = useMemo(() => {
    return new BigNumber(totalCrystlInVaultAsString)
  }, [totalCrystlInVaultAsString])

  const userShares = useMemo(() => {
    return new BigNumber(userSharesAsString)
  }, [userSharesAsString])

  const crystlAtLastUserAction = useMemo(() => {
    return new BigNumber(crystlAtLastUserActionAsString)
  }, [crystlAtLastUserActionAsString])

  return {
    totalShares,
    pricePerFullShare,
    totalCrystlInVault,
    estimatedCrystlBountyReward,
    totalPendingCrystlHarvest,
    fees: {
      performanceFee,
      callFee,
      withdrawalFee,
      withdrawalFeePeriod,
    },
    userData: {
      isLoading,
      userShares,
      crystlAtLastUserAction,
      lastDepositedTime,
      lastUserActionTime,
    },
  }
}

// Profile

export const useFetchProfile = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProfile(account))
  }, [account, dispatch])
}

export const useProfile = () => {
  const { isInitialized, isLoading, data, hasRegistered }: ProfileState = useSelector((state: State) => state.profile)
  return { profile: data, hasProfile: isInitialized && hasRegistered, isInitialized, isLoading }
}

// Teams

export const useTeam = (id: number) => {
  const team: Team = useSelector((state: State) => state.teams.data[id])
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTeam(id))
  }, [id, dispatch])

  return team
}

export const useTeams = () => {
  const { isInitialized, isLoading, data }: TeamsState = useSelector((state: State) => state.teams)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTeams())
  }, [dispatch])

  return { teams: data, isInitialized, isLoading }
}

// Achievements

export const useFetchAchievements = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (account) {
      dispatch(fetchAchievements(account))
    }
  }, [account, dispatch])
}

export const useAchievements = () => {
  const achievements: AchievementState['data'] = useSelector((state: State) => state.achievements.data)
  return achievements
}

export const usePriceBnbBusd = (): BigNumber => {
  // bnbBusdFarm.quoteToken.busdPrice
  return new BigNumber(10)
}

export const usePriceCrystlBusd = (): BigNumber => {
  const crystlMaticFarm = useFarmFromPid(1)
  return new BigNumber(crystlMaticFarm.token.busdPrice)
}

export const usePriceMaticBusd = (): BigNumber => {
  const crystlMaticFarm = useFarmFromPid(1)
  return new BigNumber(crystlMaticFarm.quoteToken.busdPrice)
}

// Block
export const useBlock = () => {
  return useSelector((state: State) => state.block)
}

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock)
}

// Predictions
export const useIsHistoryPaneOpen = () => {
  return useSelector((state: State) => state.predictions.isHistoryPaneOpen)
}

export const useIsChartPaneOpen = () => {
  return useSelector((state: State) => state.predictions.isChartPaneOpen)
}

export const useGetRounds = () => {
  return useSelector((state: State) => state.predictions.rounds)
}

export const useGetSortedRounds = () => {
  const roundData = useGetRounds()
  return orderBy(Object.values(roundData), ['epoch'], ['asc'])
}

export const useGetCurrentEpoch = () => {
  return useSelector((state: State) => state.predictions.currentEpoch)
}

export const useGetIntervalBlocks = () => {
  return useSelector((state: State) => state.predictions.intervalBlocks)
}

export const useGetBufferBlocks = () => {
  return useSelector((state: State) => state.predictions.bufferBlocks)
}

export const useGetTotalIntervalBlocks = () => {
  const intervalBlocks = useGetIntervalBlocks()
  const bufferBlocks = useGetBufferBlocks()
  return intervalBlocks + bufferBlocks
}

export const useGetRound = (id: string) => {
  const rounds = useGetRounds()
  return rounds[id]
}

export const useGetCurrentRound = () => {
  const currentEpoch = useGetCurrentEpoch()
  const rounds = useGetSortedRounds()
  return rounds.find((round) => round.epoch === currentEpoch)
}

export const useGetPredictionsStatus = () => {
  return useSelector((state: State) => state.predictions.status)
}

export const useGetHistoryFilter = () => {
  return useSelector((state: State) => state.predictions.historyFilter)
}

export const useGetCurrentRoundBlockNumber = () => {
  return useSelector((state: State) => state.predictions.currentRoundStartBlockNumber)
}

export const useGetMinBetAmount = () => {
  const minBetAmount = useSelector((state: State) => state.predictions.minBetAmount)
  return useMemo(() => new BigNumber(minBetAmount), [minBetAmount])
}

export const useGetIsFetchingHistory = () => {
  return useSelector((state: State) => state.predictions.isFetchingHistory)
}

export const useGetHistory = () => {
  return useSelector((state: State) => state.predictions.history)
}

export const useGetHistoryByAccount = (account: string) => {
  const bets = useGetHistory()
  return bets ? bets[account] : []
}

export const useGetBetByRoundId = (account: string, roundId: string) => {
  const bets = useSelector((state: State) => state.predictions.bets)

  if (!bets[account]) {
    return null
  }

  if (!bets[account][roundId]) {
    return null
  }

  return bets[account][roundId]
}

export const useBetCanClaim = (account: string, roundId: string) => {
  const bet = useGetBetByRoundId(account, roundId)

  if (!bet) {
    return false
  }

  return getCanClaim(bet)
}

export const useGetLastOraclePrice = (): BigNumber => {
  const lastOraclePrice = useSelector((state: State) => state.predictions.lastOraclePrice)
  return new BigNumber(lastOraclePrice)
}

// Collectibles
export const useGetCollectibles = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const { isInitialized, isLoading, data } = useSelector((state: State) => state.collectibles)
  const identifiers = Object.keys(data)

  useEffect(() => {
    // Fetch nfts only if we have not done so already
    if (!isInitialized) {
      dispatch(fetchWalletNfts(account))
    }
  }, [isInitialized, account, dispatch])

  return {
    isInitialized,
    isLoading,
    tokenIds: data,
    nftsInWallet: Nfts.filter((nft) => identifiers.includes(nft.identifier)),
  }
}

export const useTotalValue = (): BigNumber => {
  const farms = useFarms()
  useFetchPublicPoolsData()
  const pools = useAllPools()
  const { data: vaultsV2, isInitialized: vaultsV2Initialized } = useVaultsV2()
  const { data: vaults, isInitialized: vaultsInitialized } = useVaults()
  const crystlPrice = usePriceCrystlBusd()
  let value = new BigNumber(0)
  for (let i = 0; i < farms.data.length; i++) {
    const farm = farms.data[i]
    if (farm.lpTotalInQuoteToken) {
      value = value.plus(new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice))
    }
  }
  for (let i = 0; i < pools.length; i++) {
    const pool = pools[i]
    if (pool.totalStaked) {
      let val
      if (pool.stakingToken.symbol === 'CRYSTL') {
        val = crystlPrice.times(getBalanceAmount(pool.totalStaked, pool.stakingToken.decimals))
      }
      value = value.plus(val)
    }
  }
  if (vaultsV2Initialized) {
    for (let i = 0; i < vaultsV2.length; i++) {
      const vault = vaultsV2[i]
      if (vault.totalValueLocked) {
        const val = new BigNumber(vault.totalValueLocked)
        value = value.plus(val)
      }
    }
  }
  if (vaultsInitialized) {
    for (let i = 0; i < vaults.length; i++) {
      const vault = vaults[i]
      if (vault.totalValueLocked) {
        const val = new BigNumber(vault.totalValueLocked)
        value = value.plus(val)
      }
    }
  }
  return new BigNumber(value.toFixed(3))
}
