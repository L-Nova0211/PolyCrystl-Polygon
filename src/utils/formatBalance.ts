import BigNumber from 'bignumber.js'
import { BIG_TEN } from './bigNumber'

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
export const getAmountUSD = (amount: BigNumber) => {
  return amount.isLessThan(0.01) && amount.isGreaterThan(0)
    ? `< $0.01`
    : `$${amount.toNumber().toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`
}

export const getDecimalAmount = (amount: BigNumber, decimals = 18) => {
  return new BigNumber(amount).times(BIG_TEN.pow(decimals))
}

export const getBalanceAmount = (amount: BigNumber, decimals = 18) => {
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals))
}

export const getCustomBalanceAmount = (amount: BigNumber, decimals) => {
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals))
}

export const getCustomFullDisplayBalance = (balance: BigNumber, decimals: number, decimalsToAppear?: number) => {
  return getCustomBalanceAmount(balance, decimals).toFixed(decimalsToAppear)
}

export const getCustomBalanceNumber = (balance: BigNumber, decimals) => {
  return getBalanceAmount(balance, decimals).toNumber()
}

/**
 * This function is not really necessary but is used throughout the site.
 */

export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
  return getBalanceAmount(balance, decimals).toNumber()
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18, decimalsToAppear?: number) => {
  return getBalanceAmount(balance, decimals).toFixed(decimalsToAppear)
}

export const getFullDisplayBalancePrice = (balance: BigNumber, tokenPrice: number, decimals = 18) => {
  if (balance.isEqualTo(0)) {
    return '$0.00'
  }
  const balanceNumber = getBalanceNumber(balance, decimals)
  const price = balanceNumber * tokenPrice
  if (price < 0.01) {
    return `< $0.01`
  }
  return `$${formatNumber(price)}`
}

export const getDisplayBalancePrice = (balance: BigNumber, tokenPrice: number) => {
  if (balance.isEqualTo(0) || !balance.isFinite()) {
    return '$0.00'
  }
  const price = balance.toNumber() * tokenPrice
  if (price < 0.01) {
    return `< $0.01`
  }
  return `$${formatNumber(price)}`
}

export const formatNumber = (number: number, minPrecision = 2, maxPrecision = 2) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  }
  return number.toLocaleString('en-US', options)
}

export const formatNumberKorM = (number: number, digits = 2) => {
  const si = [
    { value: 1, symbol: ' ' },
    { value: 1e3, symbol: ' k' },
    { value: 1e6, symbol: ' M' },
    { value: 1e9, symbol: ' B' },
    { value: 1e12, symbol: ' T' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/

  if (number >= 1e18) {
    return ['∞', '']
  }

  let i: number
  for (i = si.length - 1; i > 0; i--) {
    if (number >= si[i].value) {
      break
    }
  }

  return [formatNumber(number / si[i].value, digits, digits).replace(rx, '$1') + si[i].symbol, '%']
}

export const getDisplayBalanceAdjustable = (
  stakedBalance: BigNumber,
  isMobile: boolean,
  decimals = 18,
  decimalsToAppear = 10,
) => {
  const stakedBalanceBigNumber = getBalanceAmount(stakedBalance)
  if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0001)) {
    return isMobile
      ? `${stakedBalanceBigNumber.decimalPlaces() > decimalsToAppear ? '~' : ''}${getFullDisplayBalance(
          stakedBalance,
          decimals,
          decimalsToAppear,
        )}`
      : getFullDisplayBalance(stakedBalance, decimals)
  }
  return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
}
