import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { DeFiWeb3Connector } from 'deficonnect'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { ConnectorNames } from '@crystals/uikit'
import Web3 from 'web3'
import getNodeUrl from './getRpcUrl'

const POLLING_INTERVAL = 12000
const rpcUrl = getNodeUrl()
const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)

const injected = new InjectedConnector({ supportedChainIds: [chainId] })

const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

const bscConnector = new BscConnector({ supportedChainIds: [chainId] })

const defiConnector = new DeFiWeb3Connector({
  supportedChainIds: [chainId],
  rpc: { [chainId]: rpcUrl },
  pollingInterval: POLLING_INTERVAL,
})

const coinbaseConnector = new WalletLinkConnector({
  url: rpcUrl,
  appName: 'coinbase wallet',
  supportedChainIds: [chainId],
})

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: bscConnector,
  [ConnectorNames.DEFI]: defiConnector,
  [ConnectorNames.CoinBase]: coinbaseConnector,
}

export const getLibrary = (provider): Web3 => {
  return provider
}
