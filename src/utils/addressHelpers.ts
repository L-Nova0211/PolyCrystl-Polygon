import { MAINNET_CHAIN_ID } from 'config'
import addresses from 'config/constants/contracts'
import tokens from 'config/constants/tokens'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[MAINNET_CHAIN_ID]
}

export const getCrystlAddress = () => {
  return getAddress(tokens.crystl.address)
}
export const getMaticAddress = () => {
  return getAddress(tokens.matic.address)
}
export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}
export const getwmaticAddress = () => {
  return getAddress(tokens.wmatic.address)
}
export const getLotteryAddress = () => {
  return getAddress(addresses.lottery)
}
export const getLotteryTicketAddress = () => {
  return getAddress(addresses.lotteryNFT)
}
export const getLotteryV2Address = () => {
  return getAddress(addresses.lotteryV2)
}
export const getPolyCrystalProfileAddress = () => {
  return getAddress(addresses.polyCrystalProfile)
}
export const getPolyCrystalRabbitsAddress = () => {
  return getAddress(addresses.polyCrystalRabbits)
}
export const getBunnyFactoryAddress = () => {
  return getAddress(addresses.bunnyFactory)
}
export const getClaimRefundAddress = () => {
  return getAddress(addresses.claimRefund)
}
export const getPointCenterIfoAddress = () => {
  return getAddress(addresses.pointCenterIfo)
}
export const getBunnySpecialAddress = () => {
  return getAddress(addresses.bunnySpecial)
}
export const getTradingCompetitionAddress = () => {
  return getAddress(addresses.tradingCompetition)
}
export const getEasterNftAddress = () => {
  return getAddress(addresses.easterNft)
}
export const getCrystlVaultAddress = () => {
  return getAddress(addresses.crystlVault)
}
export const getPredictionsAddress = () => {
  return getAddress(addresses.predictions)
}
export const getChainlinkOracleAddress = () => {
  return getAddress(addresses.chainlinkOracle)
}
export const getApePriceGetterAddress = () => {
  return getAddress(addresses.apePriceGetter)
}
export const getVaultHealerAddress = () => {
  return getAddress(addresses.vaultHealer)
}
export const getVaultHealerV2Address = () => {
  return getAddress(addresses.vaultHealerV2)
}
export const getVaultGetterAddress = () => {
  return getAddress(addresses.vaultGetter)
}
