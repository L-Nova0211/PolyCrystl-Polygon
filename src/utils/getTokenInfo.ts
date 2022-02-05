import tokens from 'config/constants/tokens'
import { Token } from 'config/constants/types'

export const getToken = (address: string): Token => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  const token = Object.keys(tokens).find((key) => tokens[key].address[chainId] === address)
  return tokens[token]
}

export const getTokenDecimals = (address: string): number => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  const token = Object.keys(tokens).find((key) => tokens[key].address[chainId] === address)
  return token ? tokens[token].decimals : 18
}
