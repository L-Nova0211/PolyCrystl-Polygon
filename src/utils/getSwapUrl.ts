import { BASE_EXCHANGE_URL } from 'config'

export default (tokenAddress: string) => {
  return `${BASE_EXCHANGE_URL}/#/swap?outputCurrency=${tokenAddress}`
}
