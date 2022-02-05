import BigNumber from 'bignumber.js'
import { BIG_ONE, BIG_ZERO } from 'utils/bigNumber'
import { filterFarmsByQuoteToken } from 'utils/farmsPriceHelpers'
import { Farm } from 'state/types'

const getFarmFromTokenSymbol = (farms: Farm[], tokenSymbol: string, preferredQuoteTokens?: string[]): Farm => {
  const farmsWithTokenSymbol = farms.filter((farm) => farm.token.symbol === tokenSymbol)
  const filteredFarm = filterFarmsByQuoteToken(farmsWithTokenSymbol, preferredQuoteTokens)
  return filteredFarm
}

const getFarmBaseTokenPrice = (farm: Farm, quoteTokenFarm: Farm, wmaticPriceUsdt: BigNumber): BigNumber => {
  const hasTokenPriceVsQuote = Boolean(farm.tokenPriceVsQuote)

  if (farm.quoteToken.symbol === 'USDT') {
    return hasTokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (farm.quoteToken.symbol === 'WMATIC') {
    return hasTokenPriceVsQuote ? wmaticPriceUsdt.times(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  // We can only calculate profits without a quoteTokenFarm for BUSD/BNB farms
  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  // Possible alternative farm quoteTokens:
  // UST (i.e. MIR-UST), pBTC (i.e. PNT-pBTC), BTCB (i.e. bBADGER-BTCB), ETH (i.e. SUSHI-ETH)
  // If the farm's quote token isn't BUSD or wmatic, we then use the quote token, of the original farm's quote token
  // i.e. for farm PNT - pBTC we use the pBTC farm's quote token - BNB, (pBTC - BNB)
  // from the BNB - pBTC price, we can calculate the PNT - BUSD price
  if (quoteTokenFarm.quoteToken.symbol === 'WMATIC') {
    const quoteTokenInBusd = wmaticPriceUsdt.times(quoteTokenFarm.tokenPriceVsQuote)
    return hasTokenPriceVsQuote && quoteTokenInBusd
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInBusd)
      : BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'USDT') {
    const quoteTokenInBusd = quoteTokenFarm.tokenPriceVsQuote
    return hasTokenPriceVsQuote && quoteTokenInBusd
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInBusd)
      : BIG_ZERO
  }

  // Catch in case token does not have immediate or once-removed BUSD/wmatic quoteToken
  return BIG_ZERO
}

const getFarmQuoteTokenPrice = (farm: Farm, quoteTokenFarm: Farm, wmaticPriceUsdt: BigNumber): BigNumber => {
  if (farm.quoteToken.symbol === 'USDT') {
    return BIG_ONE
  }

  if (farm.quoteToken.symbol === 'WMATIC') {
    return wmaticPriceUsdt
  }

  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'WMATIC') {
    return quoteTokenFarm.tokenPriceVsQuote ? wmaticPriceUsdt.times(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'USDT') {
    return quoteTokenFarm.tokenPriceVsQuote ? new BigNumber(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  return BIG_ZERO
}

const getBananaPrice = async () => {
  try {
    return fetch('https://api.coingecko.com/api/v3/simple/price?ids=apeswap-finance&vs_currencies=usd').then((resp) => {
      return resp.json().then((data) => {
        return new BigNumber(data['apeswap-finance'].usd)
      })
    })
  } catch (error) {
    throw new Error(error)
  }
}

const fetchFarmsPrices = async (farms) => {
  const wmaticUsdtFarm = farms.find((farm: Farm) => farm.pid === 2)
  const wmaticPriceUsdt = wmaticUsdtFarm.tokenPriceVsQuote ? BIG_ONE.div(wmaticUsdtFarm.tokenPriceVsQuote) : BIG_ZERO
  const bananaPrice = await getBananaPrice()

  const farmsWithPrices = farms.map((farm) => {
    const quoteTokenFarm = getFarmFromTokenSymbol(farms, farm.quoteToken.symbol)
    const baseTokenPrice = getFarmBaseTokenPrice(farm, quoteTokenFarm, wmaticPriceUsdt)
    const quoteTokenPrice =
      farm.pid === 41 ? bananaPrice : getFarmQuoteTokenPrice(farm, quoteTokenFarm, wmaticPriceUsdt)
    const token = { ...farm.token, busdPrice: baseTokenPrice.toJSON() }
    const quoteToken = { ...farm.quoteToken, busdPrice: quoteTokenPrice.toJSON() }
    return { ...farm, token, quoteToken }
  })

  return farmsWithPrices
}

export default fetchFarmsPrices
