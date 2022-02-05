import { formatNumberKorM } from './formatBalance'

export const formatApy = (apy: number, decimals = 2) => {
  const format = formatNumberKorM(apy, decimals)
  return `${format[0]}${format[1]}`
}

export const tokenEarnedPerThousandDollarsCompounding = ({
  numberOfDays,
  farmApr,
  tokenPrice,
  roundingDecimals = 2,
  compoundFrequency = 1,
  performanceFee = 0,
}) => {
  // Everything here is worked out relative to a year, with the asset compounding at the compoundFrequency rate. 1 = once per day
  const timesCompounded = 365 * compoundFrequency
  // We use decimal values rather than % in the math for both APY and the number of days being calculates as a proportion of the year
  let aprAsDecimal = farmApr / 100

  if (performanceFee) {
    // Reduce the APR by the % performance fee
    const feeRelativeToApr = (farmApr / 100) * performanceFee
    const aprAfterFee = farmApr - feeRelativeToApr
    aprAsDecimal = aprAfterFee / 100
  }

  const daysAsDecimalOfYear = numberOfDays / 365
  // Calculate the starting TOKEN balance with a dollar balance of $1000.
  const principal = 1000 / tokenPrice
  // This is a translation of the typical mathematical compounding APY formula. Details here: https://www.calculatorsoup.com/calculators/financial/compound-interest-calculator.php
  const finalAmount = principal * (1 + aprAsDecimal / timesCompounded) ** (timesCompounded * daysAsDecimalOfYear)
  // To get the TOKEN amount earned, deduct the amount after compounding (finalAmount) from the starting TOKEN balance (principal)
  const interestEarned = finalAmount - principal

  return parseFloat(interestEarned.toFixed(roundingDecimals))
}

export const getRoi = ({ amountEarned, amountInvested }) => {
  const percentage = (amountEarned / amountInvested) * 100
  return percentage
}

export const tokenEarnedPerThousandDollarsCompoundingVaults = (
  apy: number,
  tokenPrice: number,
  roundingDecimals = 2,
) => {
  let fractionDigits = roundingDecimals
  const apyAsDecimal = apy / 100
  const principal = 1000 / tokenPrice
  const tokenEarned = principal * apyAsDecimal

  if (tokenEarned < 0.00000000000001) {
    fractionDigits = 16
  } else if (tokenEarned < 0.0000000001) {
    fractionDigits = 14
  } else if (tokenEarned < 0.00000001) {
    fractionDigits = 12
  } else if (tokenEarned < 0.000001) {
    fractionDigits = 10
  } else if (tokenEarned < 0.0001) {
    fractionDigits = 8
  } else if (tokenEarned < 0.01) {
    fractionDigits = 6
  }
  return `${tokenEarned.toLocaleString('en-US', { maximumFractionDigits: fractionDigits })} `
}
