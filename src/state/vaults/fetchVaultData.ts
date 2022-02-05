import BigNumber from 'bignumber.js'
import vaultHealerABI from 'config/abi/vaultHealer.json'
import strategyMasterHealerABI from 'config/abi/strategyMasterHealer.json'
import integratedVaultABI from 'config/abi/integratedVaultAbi.json'
import apePriceGetterAbi from 'config/abi/apePriceGetter.json'
import erc20 from 'config/abi/erc20.json'
import { getApePriceGetterAddress, getVaultHealerAddress } from 'utils/addressHelpers'
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
  DEPOSIT_FEES_BY_PID_V1,
} from 'config/index'
import { formatNumber, getBalanceNumber } from 'utils/formatBalance'
import { tokenEarnedPerThousandDollarsCompounding, getRoi } from 'utils/compoundApyHelpers'
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber'
import multicall from 'utils/multicall'
import { isInactiveVault } from 'utils/vaultHelpers'
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
  inactive: boolean
  apys: VaultApy
  userData: VaultUser
  depositFee: string
}

const fetchVaultDetails = async (stratAddress: string) => {
  const vaultCalls = [
    {
      address: stratAddress,
      name: 'pid',
    },
    {
      address: stratAddress,
      name: 'masterchefAddress',
    },
    {
      address: stratAddress,
      name: 'earnedAddress',
    },
    {
      address: stratAddress,
      name: 'vaultSharesTotal',
    },
    {
      address: stratAddress,
      name: 'token0Address',
    },
    {
      address: stratAddress,
      name: 'token1Address',
    },
    {
      address: stratAddress,
      name: 'tolerance',
    },
    {
      address: stratAddress,
      name: 'burnedAmount',
    },
    {
      address: stratAddress,
      name: 'paused',
    },
  ]
  return multicall(strategyMasterHealerABI, vaultCalls)
}

// Temporary until we get a better strategy for APR
const fetchApr = async (
  lpTotalInQuoteToken: BigNumber,
  quoteTokenPrice: number,
  pid: number,
  masterChefAddress: string,
  earnedTokenAddress: string,
): Promise<[VaultApy, string, string]> => {
  // Next get vault reward token current price
  const fetchEarnedTokenPrice = await multicall(apePriceGetterAbi, [
    {
      address: getApePriceGetterAddress(),
      name: 'getPrice',
      params: [earnedTokenAddress, 18],
    },
  ])

  const rewardTokenPriceBusd = getBalanceNumber(fetchEarnedTokenPrice)

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

  const depositFee = new BigNumber(DEPOSIT_FEES_BY_PID_V1[pid.toString()] ?? 0)

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
    roundingDecimals: 2,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })
  const tokensEarnedMonthly = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 30,
    farmApr: apr,
    tokenPrice: rewardTokenPriceBusd,
    roundingDecimals: 2,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })
  const tokensEarnedWeekly = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 7,
    farmApr: apr,
    tokenPrice: rewardTokenPriceBusd,
    roundingDecimals: 2,
    compoundFrequency: DAILY_COMPOUND_FREQUENCY,
    performanceFee: PERFORMANCE_FEE,
  })
  const tokensEarnedDaily = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 1,
    farmApr: apr,
    tokenPrice: rewardTokenPriceBusd,
    roundingDecimals: 2,
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

const fetchTokenPrices = async (
  quoteTokenAddress: string,
  quoteTokenDecimals: number,
  lpAddress: string,
): Promise<BigNumber[]> => {
  const tokenPriceCalls = [
    {
      address: getApePriceGetterAddress(),
      name: 'getPrice',
      params: [quoteTokenAddress, quoteTokenDecimals],
    },
    {
      address: getApePriceGetterAddress(),
      name: 'getLPPrice',
      params: [lpAddress, 18],
    },
  ]
  return multicall(apePriceGetterAbi, tokenPriceCalls)
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

const formatStakedWantBalanceUSD = (balance: string, price: number, account: string) => {
  if (isMinimumStakedBalance(balance) || !account) {
    return '0'
  }
  const balanceNum = getBalanceNumber(new BigNumber(balance))
  return balanceNum * price
}

const fetchVault = async (pid: number, account: string): Promise<PublicVaultData | null> => {
  // Not super happy with keeping zero address calls when a user is not logged in, but ran out of time to restructure
  // SOULTION when refactoring for V2
  // Seperate user and public calls. Keep same structure, but move calls into seperate folders.
  // This will create a few extra folders, but definitely more efficient.
  // Hopefully we will have contracts for APY and we can cut calls in half saving a ton of time

  const vaultHealerAddress = getVaultHealerAddress()
  const [poolInfo, userRawStakedBalance, userRawStakedWantTokens] = await multicall(vaultHealerABI, [
    {
      address: vaultHealerAddress,
      name: 'poolInfo',
      params: [pid],
    },
    {
      address: vaultHealerAddress,
      name: 'userInfo',
      params: [pid, account || ZERO_ADDRESS],
    },
    {
      address: vaultHealerAddress,
      name: 'stakedWantTokens',
      params: [pid, account || ZERO_ADDRESS],
    },
  ])

  const stratAddress = poolInfo.strat
  const wantAddress = poolInfo.want

  const [
    stratVaultPid,
    masterChefAddress,
    earnedTokenAddress,
    vaultSharesTotal,
    quoteTokenAddress,
    tokenAddress,
    tolerance,
    burnedAmount,
    paused,
  ] = await fetchVaultDetails(stratAddress)

  const ercCalls = [
    // Balance of quote token on LP contract
    {
      address: quoteTokenAddress[0],
      name: 'balanceOf',
      params: [wantAddress],
    },
    // Balance of LP tokens in the vaulted contract
    {
      address: wantAddress,
      name: 'balanceOf',
      params: [masterChefAddress[0]],
    },
    // Total supply of LP tokens
    {
      address: wantAddress,
      name: 'totalSupply',
    },
    // Quote token decimals
    {
      address: quoteTokenAddress[0],
      name: 'decimals',
    },
    // Token decimals
    {
      address: tokenAddress[0],
      name: 'symbol',
    },
    // Quote token decimals
    {
      address: quoteTokenAddress[0],
      name: 'symbol',
    },
    // Factory Address
    {
      address: wantAddress,
      name: 'factory',
    },
    {
      address: wantAddress,
      name: 'balanceOf',
      params: [account || ZERO_ADDRESS],
    },
    {
      address: wantAddress,
      name: 'allowance',
      params: [account || ZERO_ADDRESS, vaultHealerAddress],
    },
  ]

  const [
    quoteTokenBalanceLP,
    lpTokenBalanceMC,
    lpTotalSupply,
    quoteTokenDecimals,
    tokenSymbol,
    quoteTokenSymbol,
    factoryAddress,
    userRawLpBalance,
    userApproved,
  ] = await multicall(erc20, ercCalls)

  const [quoteTokenPrice, lpPrice] = await fetchTokenPrices(quoteTokenAddress[0], quoteTokenDecimals, wantAddress)
  const vaultShares = getBalanceNumber(vaultSharesTotal)
  const formatLpPrice = getBalanceNumber(lpPrice)
  const totalValueLocked = vaultShares * formatLpPrice

  // Ratio in % of LP tokens that are staked in the MC, vs the total number in circulation
  const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

  // Raw amount of token in the LP, including those not staked
  const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))

  // Amount of token in the LP that are staked in the MC (i.e amount of token * lp ratio)
  const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio)

  // Total staked in LP, in quote token value
  const tokenBalance = account ? new BigNumber(userRawLpBalance).toJSON() : '0'
  const allowance = account ? new BigNumber(userApproved).toJSON() : '0'
  const stakedBalance = account ? new BigNumber(userRawStakedBalance[0]._hex).toJSON() : '0'
  const lpTotalInQuoteToken = quoteTokenAmountMc.times(new BigNumber(2))
  const userStakedUSDAmount = formatStakedWantBalanceUSD(userRawStakedWantTokens[0]._hex, formatLpPrice, account)
  const stakedWantBalance = formatStakedWantBalance(userRawStakedWantTokens, account)

  const [returnedApy, allocPoint, depositFee] = await fetchApr(
    lpTotalInQuoteToken,
    getBalanceNumber(quoteTokenPrice, quoteTokenDecimals),
    new BigNumber(stratVaultPid).toNumber(),
    masterChefAddress[0],
    earnedTokenAddress[0],
  )

  return {
    pid,
    wantAddress,
    strategyAddress: stratAddress,
    lpType: LP_PROVIDER[factoryAddress[0]],
    lpSymbol: `${tokenSymbol}-${quoteTokenSymbol} LP`,
    lpLink: LIQUIDITY_LINKS[factoryAddress[0]],
    farmType: FARMS[masterChefAddress[0]],
    farmSite: FARM_SITES[masterChefAddress[0]],
    projectSite: PROJECT_SITES[wantAddress],
    totalValueLocked: totalValueLocked.toFixed(2),
    burnedAmount: new BigNumber(burnedAmount).toJSON(),
    tolerance: new BigNumber(tolerance).toJSON(),
    lpTokenPrice: formatLpPrice.toString(),
    quoteTokenAddress: quoteTokenAddress[0],
    tokenAddress: tokenAddress[0],
    allocPoint,
    paused: paused[0],
    inactive: isInactiveVault(returnedApy),
    apys: returnedApy,
    userData: {
      allowance,
      tokenBalance,
      stakedBalance,
      stakedBalanceUSD: userStakedUSDAmount.toString(),
      stakedWantBalance,
    },
    depositFee,
  }
}

export default fetchVault
