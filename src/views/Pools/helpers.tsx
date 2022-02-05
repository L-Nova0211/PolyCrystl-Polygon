import BigNumber from 'bignumber.js'
import { Pool } from 'state/types'
import { getRoi, tokenEarnedPerThousandDollarsCompounding } from 'utils/compoundApyHelpers'
import { getBalanceNumber, getFullDisplayBalance, getDecimalAmount } from 'utils/formatBalance'

export const convertSharesToCrystl = (
  shares: BigNumber,
  crystlPerFullShare: BigNumber,
  decimals = 18,
  decimalsToRound = 3,
) => {
  const sharePriceNumber = getBalanceNumber(crystlPerFullShare, decimals)
  const amountInCrystl = new BigNumber(shares.multipliedBy(sharePriceNumber))
  const crystlAsNumberBalance = getBalanceNumber(amountInCrystl, decimals)
  const crystlAsBigNumber = getDecimalAmount(new BigNumber(crystlAsNumberBalance), decimals)
  const crystlAsDisplayBalance = getFullDisplayBalance(amountInCrystl, decimals, decimalsToRound)
  return {
    crystlAsNumberBalance,
    crystlAsBigNumber,
    crystlAsDisplayBalance,
  }
}

export const convertCrystlToShares = (
  crystl: BigNumber,
  crystlPerFullShare: BigNumber,
  decimals = 18,
  decimalsToRound = 3,
) => {
  const sharePriceNumber = getBalanceNumber(crystlPerFullShare, decimals)
  const amountInShares = new BigNumber(crystl.dividedBy(sharePriceNumber))
  const sharesAsNumberBalance = getBalanceNumber(amountInShares, decimals)
  const sharesAsBigNumber = getDecimalAmount(new BigNumber(sharesAsNumberBalance), decimals)
  const sharesAsDisplayBalance = getFullDisplayBalance(amountInShares, decimals, decimalsToRound)
  return { sharesAsNumberBalance, sharesAsBigNumber, sharesAsDisplayBalance }
}

const AUTO_VAULT_COMPOUND_FREQUENCY = 288
const MANUAL_POOL_COMPOUND_FREQUENCY = 1

export const getAprData = (pool: Pool, performanceFee: number) => {
  const { isAutoVault, earningTokenPrice, apr } = pool
  // special handling for tokens like tBTC or BIFI where the daily token rewards for $1000 dollars will be less than 0.001 of that token
  const isHighValueToken = Math.round(earningTokenPrice / 100000) > 0
  const roundingDecimals = isHighValueToken ? 6 : 2

  //   Estimate & manual for now. 288 = once every 5 mins. We can change once we have a better sense of this
  const compoundFrequency = isAutoVault ? AUTO_VAULT_COMPOUND_FREQUENCY : MANUAL_POOL_COMPOUND_FREQUENCY

  if (isAutoVault) {
    const oneThousandDollarsWorthOfToken = 1000 / earningTokenPrice
    const tokenEarnedPerThousand365D = tokenEarnedPerThousandDollarsCompounding({
      numberOfDays: 365,
      farmApr: apr,
      tokenPrice: earningTokenPrice,
      roundingDecimals,
      compoundFrequency,
      performanceFee,
    })
    const autoApr = getRoi({
      amountEarned: tokenEarnedPerThousand365D,
      amountInvested: oneThousandDollarsWorthOfToken,
    })
    return { apr: autoApr, isHighValueToken, roundingDecimals, compoundFrequency }
  }
  return { apr, isHighValueToken, roundingDecimals, compoundFrequency }
}

export const getCrystlVaultEarnings = (
  account: string,
  crystlAtLastUserAction: BigNumber,
  userShares: BigNumber,
  pricePerFullShare: BigNumber,
  earningTokenPrice: number,
) => {
  const hasAutoEarnings =
    account && crystlAtLastUserAction && crystlAtLastUserAction.gt(0) && userShares && userShares.gt(0)
  const { crystlAsBigNumber } = convertSharesToCrystl(userShares, pricePerFullShare)
  const autoCrystlProfit = crystlAsBigNumber.minus(crystlAtLastUserAction)
  const autoCrystlToDisplay = autoCrystlProfit.gte(0) ? getBalanceNumber(autoCrystlProfit, 18) : 0

  const autoUsdProfit = autoCrystlProfit.times(earningTokenPrice)
  const autoUsdToDisplay = autoUsdProfit.gte(0) ? getBalanceNumber(autoUsdProfit, 18) : 0
  return { hasAutoEarnings, autoCrystlToDisplay, autoUsdToDisplay }
}

export const getPoolBlockInfo = (pool: Pool, currentBlock: number) => {
  const { startBlock, endBlock, isFinished } = pool
  const shouldShowBlockCountdown = Boolean(!isFinished && startBlock && endBlock)
  const blocksUntilStart = Math.max(startBlock - currentBlock, 0)
  const blocksRemaining = Math.max(endBlock - currentBlock, 0)
  const hasPoolStarted = blocksUntilStart === 0 && blocksRemaining > 0
  const blocksToDisplay = hasPoolStarted ? blocksRemaining : blocksUntilStart
  return { shouldShowBlockCountdown, blocksUntilStart, blocksRemaining, hasPoolStarted, blocksToDisplay }
}
