import BigNumber from 'bignumber.js'
import vaultGetterABI from 'config/abi/vaultGetterAbi.json'
import integratedVaultABI from 'config/abi/integratedVaultAbi.json'
import deathABI from 'config/abi/deathMasterchef.json'
import miniApeV2Abi from 'config/abi/miniApeV2Abi.json'
import miniComplexRewarderTimeAbi from 'config/abi/miniComplexRewarderTimeAbi.json'
import apePriceGetterAbi from 'config/abi/apePriceGetter.json'
import { getApePriceGetterAddress, getVaultGetterAddress, getVaultHealerV2Address } from 'utils/addressHelpers'
import {
  TOKEN_PER_BLOCK_MAP,
  LP_PROVIDER,
  DAILY_COMPOUND_FREQUENCY,
  PERFORMANCE_FEE,
  BLOCKS_PER_YEAR,
  ZERO_ADDRESS,
  LIQUIDITY_LINKS,
  FARMS,
  FARM_SITES,
  PROJECT_SITES,
  QUICK_FARMS,
  APESWAP_MINICHEF,
  DEPOSIT_FEES_BY_PID_V2,
  DOKI_FARMS,
  APESWAP_SECOND_REWARDER_V1,
  APESWAP_SECOND_REWARDER_TOTALALLOCPOINT,
  QUICK_DUALREWARDS_FARMS,
  DFYN_FARMS,
} from 'config/index'
import { formatNumber, getBalanceAmount, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { tokenEarnedPerThousandDollarsCompounding, getRoi } from 'utils/compoundApyHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import multicall from 'utils/multicall'
import { getTokenDecimals } from 'utils/getTokenInfo'
import { SerializedBigNumber, VaultApy } from '../types'

type VaultUser = {
  allowance: string
  tokenBalance: string
  stakedBalance: string
  stakedWantBalance: string
  stakedBalanceUSD: string
}

export type PublicVaultData = {
  pid: number
  wantAddress: string
  strategyAddress: string
  lpType: string
  lpSymbol: string
  lpLink: string
  farmType: string
  farmSite: string
  projectSite: string
  totalValueLocked: SerializedBigNumber
  allocPoint: string
  tolerance: string
  burnedAmount: string
  lpTokenPrice: string
  quoteTokenAddress: string
  tokenAddress: string
  paused: boolean
  apys: VaultApy
  userData: VaultUser
  depositFee: string
}

const fetchQuickApr = async (
  lpTotalInQuoteToken: BigNumber,
  quoteTokenPrice: number,
  masterChefAddress: string,
  functionName: string,
): Promise<VaultApy> => {
  // Next get vault reward token current price

  const SECONDS_IN_A_YEAR = new BigNumber(31536000)

  const [rewardRate, rewardToken] = await multicall(integratedVaultABI, [
    { address: masterChefAddress, name: functionName },
    { address: masterChefAddress, name: 'rewardsToken' },
  ])

  const decimals = getTokenDecimals(rewardToken[0])

  const fetchEarnedTokenPrice = await multicall(apePriceGetterAbi, [
    {
      address: getApePriceGetterAddress(),
      name: 'getPrice',
      params: [rewardToken[0], decimals],
    },
  ])
  const rewardTokenPriceBusd = getBalanceNumber(fetchEarnedTokenPrice, decimals)
  const yearlyRewardTokens = SECONDS_IN_A_YEAR.times(getBalanceNumber(rewardRate, decimals))
  const oneThousandDollarsWorthOfToken = 1000 / rewardTokenPriceBusd
  const apr = yearlyRewardTokens.times(rewardTokenPriceBusd).div(lpTotalInQuoteToken.times(quoteTokenPrice)).times(100)

  const tokensEarnedYearly = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 365,
    farmApr: apr,
    tokenPrice: rewardTokenPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })
  const tokensEarnedMonthly = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 30,
    farmApr: apr,
    tokenPrice: rewardTokenPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })
  const tokensEarnedWeekly = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 7,
    farmApr: apr,
    tokenPrice: rewardTokenPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })
  const tokensEarnedDaily = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 1,
    farmApr: apr,
    tokenPrice: rewardTokenPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })

  const dailyApy = getRoi({ amountEarned: tokensEarnedDaily, amountInvested: oneThousandDollarsWorthOfToken })
  const weeklyApy = getRoi({ amountEarned: tokensEarnedWeekly, amountInvested: oneThousandDollarsWorthOfToken })
  const monthlyApy = getRoi({ amountEarned: tokensEarnedMonthly, amountInvested: oneThousandDollarsWorthOfToken })
  const yearlyApy = getRoi({ amountEarned: tokensEarnedYearly, amountInvested: oneThousandDollarsWorthOfToken })
  const apyObject: VaultApy = { dailyApy, weeklyApy, monthlyApy, yearlyApy, yearlyApr: apr.toNumber() }

  return apyObject
}

const fetchQuickDualRewardApr = async (
  lpTotalInQuoteToken: BigNumber,
  quoteTokenPrice: number,
  masterChefAddress: string,
): Promise<VaultApy> => {
  const [rewardRateA, rewardRateB, rewardsTokenA, rewardsTokenB] = await multicall(integratedVaultABI, [
    { address: masterChefAddress, name: 'rewardRateA' },
    { address: masterChefAddress, name: 'rewardRateB' },
    { address: masterChefAddress, name: 'rewardsTokenA' },
    { address: masterChefAddress, name: 'rewardsTokenB' },
  ])

  const decimalsTokenA = getTokenDecimals(rewardsTokenA[0])
  const decimalsTokenB = getTokenDecimals(rewardsTokenB[0])

  const [fetchEarnedTokenAPrice, fetchEarnedTokenBPrice] = await multicall(apePriceGetterAbi, [
    {
      address: getApePriceGetterAddress(),
      name: 'getPrice',
      params: [rewardsTokenA[0], decimalsTokenA],
    },
    {
      address: getApePriceGetterAddress(),
      name: 'getPrice',
      params: [rewardsTokenB[0], decimalsTokenB],
    },
  ])

  const SECONDS_IN_A_YEAR = new BigNumber(31536000)

  const rewardTokenPriceBusd = getBalanceNumber(fetchEarnedTokenAPrice, decimalsTokenA)
  const secondRewardTokenPriceBusd = getBalanceNumber(fetchEarnedTokenBPrice, decimalsTokenB)

  const rewardTokensPerSecond = getBalanceNumber(rewardRateA, decimalsTokenA)
  const yearlyRewardTokens = SECONDS_IN_A_YEAR.times(rewardTokensPerSecond)

  const secondRewardTokensPerSecond = getBalanceNumber(rewardRateB, decimalsTokenB)
  const yearlySecondRewardTokens = SECONDS_IN_A_YEAR.times(secondRewardTokensPerSecond)

  const dualYearlyRewardsBusd = yearlyRewardTokens
    .times(rewardTokenPriceBusd)
    .plus(yearlySecondRewardTokens.times(secondRewardTokenPriceBusd))

  const apr = dualYearlyRewardsBusd.div(lpTotalInQuoteToken.times(quoteTokenPrice)).times(100)

  const averageRewardPriceBusd =
    (rewardTokenPriceBusd * rewardTokensPerSecond + secondRewardTokenPriceBusd * secondRewardTokensPerSecond) /
    (rewardTokensPerSecond + secondRewardTokensPerSecond)
  const oneThousandDollarsWorthOfToken = 1000 / averageRewardPriceBusd

  const tokensEarnedYearly = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 365,
    farmApr: apr,
    tokenPrice: averageRewardPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })
  const tokensEarnedMonthly = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 30,
    farmApr: apr,
    tokenPrice: averageRewardPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })
  const tokensEarnedWeekly = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 7,
    farmApr: apr,
    tokenPrice: averageRewardPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })
  const tokensEarnedDaily = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 1,
    farmApr: apr,
    tokenPrice: averageRewardPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })

  const dailyApy = getRoi({ amountEarned: tokensEarnedDaily, amountInvested: oneThousandDollarsWorthOfToken })
  const weeklyApy = getRoi({ amountEarned: tokensEarnedWeekly, amountInvested: oneThousandDollarsWorthOfToken })
  const monthlyApy = getRoi({ amountEarned: tokensEarnedMonthly, amountInvested: oneThousandDollarsWorthOfToken })
  const yearlyApy = getRoi({ amountEarned: tokensEarnedYearly, amountInvested: oneThousandDollarsWorthOfToken })
  const apyObject: VaultApy = { dailyApy, weeklyApy, monthlyApy, yearlyApy, yearlyApr: apr.toNumber() }

  return apyObject
}

const fetchApeApr = async (
  lpTotalInQuoteToken: BigNumber,
  quoteTokenPrice: number,
  pid: number,
  masterChefAddress: string,
): Promise<[VaultApy, string]> => {
  // Next get vault reward token current price

  const responseMiniApe = async () => {
    try {
      const calls = [
        {
          address: masterChefAddress,
          name: 'poolInfo',
          params: [pid],
        },
        {
          address: masterChefAddress,
          name: 'totalAllocPoint',
        },
        {
          address: masterChefAddress,
          name: 'bananaPerSecond',
        },
        {
          address: masterChefAddress,
          name: 'rewarder',
          params: [pid],
        },
        {
          address: masterChefAddress,
          name: 'BANANA',
        },
      ]
      return await multicall(miniApeV2Abi, calls)
    } catch (e) {
      console.error(e)
      return [null, null, null, null, null]
    }
  }

  const [poolInfo, totalAllocPoint, bananaPerSecond, rewarder, bananaTokenAddress] = await responseMiniApe()

  const responseMiniComplex = async () => {
    try {
      const calls = [
        {
          address: rewarder[0],
          name: 'rewardToken',
        },
        {
          address: rewarder[0],
          name: 'rewardPerSecond',
        },
        {
          address: rewarder[0],
          name: 'poolInfo',
          params: [pid],
        },
      ]
      return await multicall(miniComplexRewarderTimeAbi, calls)
    } catch (e) {
      console.error(e)
      return [null, null, null]
    }
  }

  const [secondRewardToken, secondRewardPerSecond, secondRewardPoolInfo] = await responseMiniComplex()

  let secondRewardTotalAllocPoint = APESWAP_SECOND_REWARDER_TOTALALLOCPOINT

  if (rewarder[0] !== APESWAP_SECOND_REWARDER_V1) {
    const responseTotalAllocPoint = async () => {
      try {
        const calls = [
          {
            address: rewarder[0],
            name: 'totalAllocPoint',
          },
        ]
        return await multicall(miniComplexRewarderTimeAbi, calls)
      } catch (e) {
        console.error(e)
        return [null]
      }
    }

    const [secondTotalAllocPoint] = await responseTotalAllocPoint()

    secondRewardTotalAllocPoint = new BigNumber(secondTotalAllocPoint)
  }

  const decimalsTokenA = getTokenDecimals(bananaTokenAddress[0])
  const decimalsTokenB = getTokenDecimals(secondRewardToken[0])

  const [fetchEarnedTokenPrice, fetchSecondRewardTokenPrice] = await multicall(apePriceGetterAbi, [
    {
      address: getApePriceGetterAddress(),
      name: 'getPrice',
      params: [bananaTokenAddress[0], decimalsTokenA],
    },
    {
      address: getApePriceGetterAddress(),
      name: 'getPrice',
      params: [secondRewardToken[0], decimalsTokenB],
    },
  ])

  const rewardTokenPriceBusd = getBalanceNumber(fetchEarnedTokenPrice, decimalsTokenA)
  const secondRewardTokenPriceBusd = getBalanceNumber(fetchSecondRewardTokenPrice, decimalsTokenB)

  // Calculate APR
  const SECONDS_IN_A_YEAR = new BigNumber(31536000)

  const allocPoint = poolInfo ? new BigNumber(poolInfo.allocPoint?._hex) : BIG_ZERO
  const poolWeight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : BIG_ZERO

  const secondAllocPoint = secondRewardPoolInfo ? new BigNumber(secondRewardPoolInfo.allocPoint?._hex) : BIG_ZERO
  const secondPoolWeight = secondRewardTotalAllocPoint ? secondAllocPoint.div(secondRewardTotalAllocPoint) : BIG_ZERO

  const rewardTokensPerSecond = getBalanceNumber(bananaPerSecond, decimalsTokenA)
  const yearlyRewardTokens = SECONDS_IN_A_YEAR.times(rewardTokensPerSecond).times(poolWeight)

  const secondRewardTokensPerSecond = getBalanceNumber(secondRewardPerSecond, decimalsTokenB)
  const yearlySecondRewardTokens = SECONDS_IN_A_YEAR.times(secondRewardTokensPerSecond).times(secondPoolWeight)

  const dualYearlyRewardsBusd = yearlyRewardTokens
    .times(rewardTokenPriceBusd)
    .plus(yearlySecondRewardTokens.times(secondRewardTokenPriceBusd))

  const apr = dualYearlyRewardsBusd.div(lpTotalInQuoteToken.times(quoteTokenPrice)).times(100)

  const averageRewardPriceBusd =
    (rewardTokenPriceBusd * rewardTokensPerSecond + secondRewardTokenPriceBusd * secondRewardTokensPerSecond) /
    (rewardTokensPerSecond + secondRewardTokensPerSecond)
  const oneThousandDollarsWorthOfToken = 1000 / averageRewardPriceBusd

  const tokensEarnedYearly = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 365,
    farmApr: apr,
    tokenPrice: averageRewardPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })
  const tokensEarnedMonthly = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 30,
    farmApr: apr,
    tokenPrice: averageRewardPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })
  const tokensEarnedWeekly = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 7,
    farmApr: apr,
    tokenPrice: averageRewardPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })
  const tokensEarnedDaily = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 1,
    farmApr: apr,
    tokenPrice: averageRewardPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })

  const dailyApy = getRoi({ amountEarned: tokensEarnedDaily, amountInvested: oneThousandDollarsWorthOfToken })
  const weeklyApy = getRoi({ amountEarned: tokensEarnedWeekly, amountInvested: oneThousandDollarsWorthOfToken })
  const monthlyApy = getRoi({ amountEarned: tokensEarnedMonthly, amountInvested: oneThousandDollarsWorthOfToken })
  const yearlyApy = getRoi({ amountEarned: tokensEarnedYearly, amountInvested: oneThousandDollarsWorthOfToken })
  const apyObject: VaultApy = { dailyApy, weeklyApy, monthlyApy, yearlyApy, yearlyApr: apr.toNumber() }

  return [apyObject, new BigNumber(allocPoint).toJSON()]
}

const fetchDokiApr = async (
  lpTotalInQuoteToken: BigNumber,
  quoteTokenPrice: number,
  masterChefAddress: string,
): Promise<VaultApy> => {
  // Next get vault reward token current price

  const responseMasterchef = async () => {
    try {
      const calls = [
        {
          address: masterChefAddress,
          name: 'getRewardRates',
        },
        {
          address: masterChefAddress,
          name: 'getRewardsTokens',
        },
      ]
      return await multicall(integratedVaultABI, calls)
    } catch (e) {
      console.error(e)
      return [null, null]
    }
  }

  const [rewardRates, rewardsTokens] = await responseMasterchef()

  const firstRewardToken = rewardsTokens[0][0]
  const secondRewardToken = rewardsTokens[0][1]
  const firstRewardRate = rewardRates ? new BigNumber(rewardRates[0][0]?._hex) : BIG_ZERO
  const secondRewardRate = rewardRates ? new BigNumber(rewardRates[0][1]?._hex) : BIG_ZERO

  const decimalsTokenA = getTokenDecimals(firstRewardToken)
  const decimalsTokenB = getTokenDecimals(secondRewardToken)

  const [fetchEarnedTokenPrice, fetchSecondRewardTokenPrice] = await multicall(apePriceGetterAbi, [
    {
      address: getApePriceGetterAddress(),
      name: 'getPrice',
      params: [firstRewardToken, decimalsTokenA],
    },
    {
      address: getApePriceGetterAddress(),
      name: 'getPrice',
      params: [secondRewardToken, decimalsTokenB],
    },
  ])

  const rewardTokenPriceBusd = getBalanceNumber(fetchEarnedTokenPrice, decimalsTokenA)
  const secondRewardTokenPriceBusd = getBalanceNumber(fetchSecondRewardTokenPrice, decimalsTokenB)

  // Calculate APR
  const SECONDS_IN_A_YEAR = new BigNumber(31536000)

  const rewardTokensPerSecond = getBalanceNumber(firstRewardRate, decimalsTokenA)
  const yearlyRewardTokens = SECONDS_IN_A_YEAR.times(rewardTokensPerSecond)

  const secondRewardTokensPerSecond = getBalanceNumber(secondRewardRate, decimalsTokenB)
  const yearlySecondRewardTokens = SECONDS_IN_A_YEAR.times(secondRewardTokensPerSecond)

  const dualYearlyRewardsBusd = yearlyRewardTokens
    .times(rewardTokenPriceBusd)
    .plus(yearlySecondRewardTokens.times(secondRewardTokenPriceBusd))

  const apr = dualYearlyRewardsBusd.div(lpTotalInQuoteToken.times(quoteTokenPrice)).times(100)

  const averageRewardPriceBusd =
    (rewardTokenPriceBusd * rewardTokensPerSecond + secondRewardTokenPriceBusd * secondRewardTokensPerSecond) /
    (rewardTokensPerSecond + secondRewardTokensPerSecond)
  const oneThousandDollarsWorthOfToken = 1000 / averageRewardPriceBusd

  const tokensEarnedYearly = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 365,
    farmApr: apr,
    tokenPrice: averageRewardPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })
  const tokensEarnedMonthly = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 30,
    farmApr: apr,
    tokenPrice: averageRewardPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })
  const tokensEarnedWeekly = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 7,
    farmApr: apr,
    tokenPrice: averageRewardPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })
  const tokensEarnedDaily = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 1,
    farmApr: apr,
    tokenPrice: averageRewardPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })

  const dailyApy = getRoi({ amountEarned: tokensEarnedDaily, amountInvested: oneThousandDollarsWorthOfToken })
  const weeklyApy = getRoi({ amountEarned: tokensEarnedWeekly, amountInvested: oneThousandDollarsWorthOfToken })
  const monthlyApy = getRoi({ amountEarned: tokensEarnedMonthly, amountInvested: oneThousandDollarsWorthOfToken })
  const yearlyApy = getRoi({ amountEarned: tokensEarnedYearly, amountInvested: oneThousandDollarsWorthOfToken })
  const apyObject: VaultApy = { dailyApy, weeklyApy, monthlyApy, yearlyApy, yearlyApr: apr.toNumber() }

  return apyObject
}

// Temporary until we get a better strategy for APR
const fetchApr = async (
  lpTotalInQuoteToken: BigNumber,
  quoteTokenPrice: number,
  pid: number,
  masterChefAddress: string,
  earnedTokenPrice: BigNumber,
): Promise<[VaultApy, string, string]> => {
  const rewardTokenPriceBusd = getBalanceNumber(earnedTokenPrice)

  const response = async () => {
    try {
      const calls = [
        {
          address: masterChefAddress,
          name: 'poolInfo',
          params: [pid],
        },
        {
          address: masterChefAddress,
          name: 'totalAllocPoint',
        },
        {
          address: masterChefAddress,
          name: TOKEN_PER_BLOCK_MAP[masterChefAddress],
        },
      ]
      return await multicall(integratedVaultABI, calls)
    } catch (e) {
      console.error(e)
      return [null, null, null]
    }
  }

  const [poolInfo, totalAllocPoint, tokensPerBlock] = await response()

  const allocPoint = poolInfo ? new BigNumber(poolInfo.allocPoint?._hex) : BIG_ZERO

  const depositFee = new BigNumber(DEPOSIT_FEES_BY_PID_V2[pid.toString()] ?? 0)

  // Calculate APR
  const poolWeight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : BIG_ZERO
  const rewardTokensPerBlock = tokensPerBlock ? getBalanceNumber(tokensPerBlock) : BIG_ZERO
  const yearlyRewardTokens = BLOCKS_PER_YEAR.times(rewardTokensPerBlock).times(poolWeight)
  const oneThousandDollarsWorthOfToken = 1000 / rewardTokenPriceBusd
  const apr = yearlyRewardTokens.times(rewardTokenPriceBusd).div(lpTotalInQuoteToken.times(quoteTokenPrice)).times(100)
  const tokensEarnedYearly = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 365,
    farmApr: apr,
    tokenPrice: rewardTokenPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })
  const tokensEarnedMonthly = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 30,
    farmApr: apr,
    tokenPrice: rewardTokenPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })
  const tokensEarnedWeekly = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 7,
    farmApr: apr,
    tokenPrice: rewardTokenPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })
  const tokensEarnedDaily = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 1,
    farmApr: apr,
    tokenPrice: rewardTokenPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })

  const dailyApy = getRoi({ amountEarned: tokensEarnedDaily, amountInvested: oneThousandDollarsWorthOfToken })
  const weeklyApy = getRoi({ amountEarned: tokensEarnedWeekly, amountInvested: oneThousandDollarsWorthOfToken })
  const monthlyApy = getRoi({ amountEarned: tokensEarnedMonthly, amountInvested: oneThousandDollarsWorthOfToken })
  const yearlyApy = getRoi({ amountEarned: tokensEarnedYearly, amountInvested: oneThousandDollarsWorthOfToken })
  const apyObject: VaultApy = { dailyApy, weeklyApy, monthlyApy, yearlyApy, yearlyApr: apr.toNumber() }

  return [apyObject, new BigNumber(allocPoint).toJSON(), formatNumber(depositFee.toNumber())]
}

const fetchDeathApr = async (
  lpTotalInQuoteToken: BigNumber,
  quoteTokenPrice: number,
  pid: number,
  masterChefAddress: string,
  earnedTokenPrice: BigNumber,
): Promise<[VaultApy, string, string]> => {
  const rewardTokenPriceBusd = getBalanceNumber(earnedTokenPrice)

  const response = async () => {
    try {
      const calls = [
        {
          address: masterChefAddress,
          name: 'poolInfo',
          params: [pid],
        },
        {
          address: masterChefAddress,
          name: 'totalAllocPoint',
        },
        {
          address: masterChefAddress,
          name: TOKEN_PER_BLOCK_MAP[masterChefAddress],
        },
      ]
      return await multicall(deathABI, calls)
    } catch (e) {
      console.error(e)
      return [null, null, null]
    }
  }

  const SECONDS_IN_A_YEAR = new BigNumber(31536000)

  const [poolInfo, totalAllocPoint, tokensPerSecond] = await response()

  const allocPoint = poolInfo ? new BigNumber(poolInfo.allocPoint?._hex) : BIG_ZERO

  const depositFee = new BigNumber(DEPOSIT_FEES_BY_PID_V2[pid.toString()] ?? 0)

  // Calculate APR
  const poolWeight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : BIG_ZERO
  const rewardTokensPerSecond = tokensPerSecond ? getBalanceNumber(tokensPerSecond) : BIG_ZERO
  const yearlyRewardTokens = SECONDS_IN_A_YEAR.times(rewardTokensPerSecond).times(poolWeight)
  const oneThousandDollarsWorthOfToken = 1000 / rewardTokenPriceBusd
  const apr = yearlyRewardTokens.times(rewardTokenPriceBusd).div(lpTotalInQuoteToken.times(quoteTokenPrice)).times(100)
  const tokensEarnedYearly = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 365,
    farmApr: apr,
    tokenPrice: rewardTokenPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })
  const tokensEarnedMonthly = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 30,
    farmApr: apr,
    tokenPrice: rewardTokenPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })
  const tokensEarnedWeekly = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 7,
    farmApr: apr,
    tokenPrice: rewardTokenPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })
  const tokensEarnedDaily = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 1,
    farmApr: apr,
    tokenPrice: rewardTokenPriceBusd,
    roundingDecimals: 18,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })

  const dailyApy = getRoi({ amountEarned: tokensEarnedDaily, amountInvested: oneThousandDollarsWorthOfToken })
  const weeklyApy = getRoi({ amountEarned: tokensEarnedWeekly, amountInvested: oneThousandDollarsWorthOfToken })
  const monthlyApy = getRoi({ amountEarned: tokensEarnedMonthly, amountInvested: oneThousandDollarsWorthOfToken })
  const yearlyApy = getRoi({ amountEarned: tokensEarnedYearly, amountInvested: oneThousandDollarsWorthOfToken })
  const apyObject: VaultApy = { dailyApy, weeklyApy, monthlyApy, yearlyApy, yearlyApr: apr.toNumber() }

  return [apyObject, new BigNumber(allocPoint).toJSON(), formatNumber(depositFee.toNumber())]
}

const isMinimumStakedBalance = (balance: string) => {
  const balanceNumber = new BigNumber(balance)
  const gwei = new BigNumber(1)
  return balanceNumber.isEqualTo(gwei)
}

const formatStakedWantBalance = (balance: string, account: string) => {
  if (isMinimumStakedBalance(balance) || !account) {
    return '0'
  }
  return new BigNumber(balance).toJSON()
}

const fetchVault = async (pid: number, account: string): Promise<PublicVaultData | null> => {
  // Not super happy with keeping zero address calls when a user is not logged in, but ran out of time to restructure
  // SOULTION when refactoring for V2
  // Seperate user and public calls. Keep same structure, but move calls into seperate folders.
  // This will create a few extra folders, but definitely more efficient.
  // Hopefully we will have contracts for APY and we can cut calls in half saving a ton of time

  const vaultHealerAddress = getVaultHealerV2Address()
  const apePriceGetterAddress = getApePriceGetterAddress()
  const vaultGetterAddress = getVaultGetterAddress()
  const [response] = await multicall(vaultGetterABI, [
    {
      address: vaultGetterAddress,
      name: 'getVault',
      params: [vaultHealerAddress, apePriceGetterAddress, pid, account || ZERO_ADDRESS],
    },
  ])

  const { facts, info, user } = response

  const {
    chefPid: stratVaultPid,
    tolerance,
    masterchefAddress: masterChefAddress,
    wantAddress,
    strategyAddress: stratAddress,
    token0Address,
    token1Address,
    lpFactoryAddress: factoryAddress,
    token0Symbol,
    token1Symbol,
  } = facts

  const { paused, wantLockedTotal, burnedAmount, lpTokenPrice: lpPrice, earnedTokenPrice, masterchefWantBalance } = info

  const {
    allowance: userApproved,
    tokenBalance: userRawLpBalance,
    stakedBalance,
    stakedWantBalance,
    stakedBalanceUSD,
  } = user

  const vaultShares = getBalanceNumber(wantLockedTotal._hex)
  const formatLpPrice = getBalanceNumber(lpPrice._hex)
  const totalValueLocked = vaultShares * formatLpPrice

  const lpTokenStakedMC = getBalanceAmount(new BigNumber(masterchefWantBalance._hex))

  const tokenBalance = account ? new BigNumber(userRawLpBalance._hex).toJSON() : '0'
  const allowance = account ? new BigNumber(userApproved._hex).toJSON() : '0'
  const stakedBalanceFormatted = account ? new BigNumber(stakedBalance._hex).toJSON() : '0'

  const userStakedUSDAmount = formatStakedWantBalance(stakedBalanceUSD._hex, account)
  const stakedWantBalanceFormatted = formatStakedWantBalance(stakedWantBalance._hex, account)

  let returnedApy: VaultApy = { dailyApy: 0, weeklyApy: 0, monthlyApy: 0, yearlyApy: 0, yearlyApr: 0 }
  let allocPoint = ''
  let farmType = ''
  let farmSite = ''
  let depositFee = formatNumber(0)
  let toleranceValue = new BigNumber(tolerance).toJSON()
  const isQuickDualReward = QUICK_DUALREWARDS_FARMS.includes(masterChefAddress)

  if (QUICK_FARMS.includes(masterChefAddress) || isQuickDualReward) {
    farmType = 'Quickswap'
    farmSite = 'https://quickswap.exchange/'
  } else if (DFYN_FARMS.includes(masterChefAddress)) {
    farmType = 'DFYN'
    farmSite = 'https://exchange.dfyn.network/'
  } else if (APESWAP_MINICHEF === masterChefAddress) {
    farmType = 'Apeswap'
    farmSite = 'https://apeswap.finance/'
  } else if (DOKI_FARMS.includes(masterChefAddress)) {
    farmType = 'DokiDoki'
    farmSite = 'https://dokidoki.com/'
  } else {
    farmType = FARMS[masterChefAddress]
    farmSite = FARM_SITES[masterChefAddress]
  }

  if (!paused) {
    if (['Quickswap', 'DFYN'].includes(farmType) && !isQuickDualReward) {
      const quickApr = await fetchQuickApr(lpTokenStakedMC, formatLpPrice, masterChefAddress, 'rewardRate')
      returnedApy = quickApr
      allocPoint = '1'
    } else if (isQuickDualReward) {
      const quickApr = await fetchQuickDualRewardApr(lpTokenStakedMC, formatLpPrice, masterChefAddress)
      returnedApy = quickApr
      allocPoint = '1'
    } else if (farmType === 'Apeswap') {
      const apeApr = await fetchApeApr(
        lpTokenStakedMC,
        formatLpPrice,
        new BigNumber(stratVaultPid).toNumber(),
        masterChefAddress,
      )
      returnedApy = apeApr[0]
      allocPoint = apeApr[1]
    } else if (farmType === 'DokiDoki') {
      const dokiApr = await fetchDokiApr(lpTokenStakedMC, formatLpPrice, masterChefAddress)
      returnedApy = dokiApr
      allocPoint = '1'
    } else if (farmType === 'Death') {
      const nonQuickApr = await fetchDeathApr(
        lpTokenStakedMC,
        formatLpPrice,
        new BigNumber(stratVaultPid).toNumber(),
        masterChefAddress,
        new BigNumber(earnedTokenPrice._hex),
      )
      returnedApy = nonQuickApr[0]
      allocPoint = nonQuickApr[1]
      depositFee = nonQuickApr[2]
      toleranceValue = '3'
    } else {
      const nonQuickApr = await fetchApr(
        lpTokenStakedMC,
        formatLpPrice,
        new BigNumber(stratVaultPid).toNumber(),
        masterChefAddress,
        new BigNumber(earnedTokenPrice._hex),
      )
      returnedApy = nonQuickApr[0]
      allocPoint = nonQuickApr[1]
      depositFee = nonQuickApr[2]
    }
  }

  return {
    pid,
    wantAddress,
    strategyAddress: stratAddress,
    lpType: LP_PROVIDER[factoryAddress],
    lpSymbol: `${token1Symbol}-${token0Symbol} LP`,
    lpLink: LIQUIDITY_LINKS[factoryAddress],
    farmType,
    farmSite,
    projectSite: PROJECT_SITES[wantAddress],
    totalValueLocked: totalValueLocked.toFixed(2),
    burnedAmount: new BigNumber(burnedAmount._hex).toJSON(),
    tolerance: toleranceValue,
    lpTokenPrice: formatLpPrice.toString(),
    quoteTokenAddress: token0Address,
    tokenAddress: token1Address,
    allocPoint,
    paused,
    apys: returnedApy,
    userData: {
      allowance,
      tokenBalance,
      stakedBalance: stakedBalanceFormatted,
      stakedBalanceUSD: getFullDisplayBalance(new BigNumber(userStakedUSDAmount)),
      stakedWantBalance: stakedWantBalanceFormatted,
    },
    depositFee,
  }
}

export default fetchVault
