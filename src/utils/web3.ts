import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import { ARCHIVED_NODE } from '../config/constants/endpoints'
import getRpcUrl from './getRpcUrl'

const RPC_URL = getRpcUrl()
const user = process.env.REACT_APP_NODE_USERNAME
const password = process.env.REACT_APP_NODE_PASSWORD

const httpProvider = new Web3.providers.HttpProvider(RPC_URL, {
  headers: [{ name: 'Authorization', value: `Basic ${Buffer.from(`${user}:${password}`).toString('base64')}` }],
  timeout: 10000,
} as HttpProviderOptions)
const web3NoAccount = new Web3(httpProvider)

const getWeb3NoAccount = () => {
  return web3NoAccount
}

const getWeb3WithArchivedNodeProvider = () => {
  const archivedHttpProvider = new Web3.providers.HttpProvider(ARCHIVED_NODE, { timeout: 10000 } as HttpProviderOptions)
  return new Web3(archivedHttpProvider)
}

export { getWeb3NoAccount, getWeb3WithArchivedNodeProvider }
export default web3NoAccount
