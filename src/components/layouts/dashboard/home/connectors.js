import WalletLink from 'walletlink'
import WalletConnectProvider from '@walletconnect/web3-provider'
import MEWconnect from '@myetherwallet/mewconnect-web-client'

const INFURA_ID = '74667f659ae243d2849527134a9f22b6'

const ETH_JSONRPC_URL = `https://mainnet.infura.io/v3/${INFURA_ID}`
const CHAIN_ID = 1

export const connectors = {
  metamask: {
    name: 'Metamask',
    provider: window.ethereum,
  },
  coinbaseWallet: {
    name: 'Coinbase Wallet',
    provider: new WalletLink({}).makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID),
  },
  walletConnect: {
    name: 'Wallet Connect',
    provider: new WalletConnectProvider({ infuraId: INFURA_ID }),
  },
  mewConnect: {
    name: 'MEW Connect',
    provider: new MEWconnect.Provider().makeWeb3Provider(CHAIN_ID, ETH_JSONRPC_URL),
  },
  // ledger: {
  //   name: 'Ledger',
  //   provider: new LedgerProvider({}),
  // },
  // dapper: {
  //   name: 'Dapper',
  //   provider: new WalletConnectProvider({ infuraId: INFURA_ID }),
  // },
}
