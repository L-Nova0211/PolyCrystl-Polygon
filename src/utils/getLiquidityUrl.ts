import { BASE_ADD_LIQUIDITY_URL } from 'config'

export default (parts: string, exchange: string = BASE_ADD_LIQUIDITY_URL) => {
  return `${exchange}/${parts}`
}
