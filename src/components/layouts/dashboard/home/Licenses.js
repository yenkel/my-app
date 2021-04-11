import React from 'react'
import { withRouter } from 'react-router-dom'
import Loader from 'react-loaders'
import Web3 from 'web3'

import Button from '../../../common/Button'
import { connectors } from './connectors'
import getWeb3 from './getWeb3'

require('../../../styles/layouts/dashboard/home/licenses.styl')

class Licenses extends React.Component {
  state = {
    connector: null,
    accountAddress: null,
    ethBalance: undefined,
  }

  // WEB3 METHODS

  //  Get Accounts
  // const accounts = await web3.eth.getAccounts();
  // //  Get Chain Id
  // const chainId = await web3.eth.chainId();
  // //  Get Network Id
  // const networkId = await web3.eth.net.getId();
  // // Send Transaction
  // const txHash = await web3.eth.sendTransaction(tx);
  // // Sign Transaction
  // const signedTx = await web3.eth.signTransaction(tx);
  // // Sign Message
  // const signedMessage = await web3.eth.sign(msg);
  // // Sign Typed Data
  // const signedTypedData = await web3.eth.signTypedData(msg);

  setInfoInState = (accountAddress, connector, ethBalance) => {
    this.setState({ accountAddress, connector, ethBalance })
  }

  handleConnect = async (key) => {
    const connector = connectors[key]
    let web3
    let accounts
    if (key === 'metamask') {
      web3 = await getWeb3()
      accounts = await web3.eth.getAccounts()
    } else if (key === 'coinbaseWallet') {
      web3 = new Web3(connector.provider)
      accounts = await connector.provider.send('eth_requestAccounts')
    } else {
      await connector.provider.enable()
      web3 = new Web3(connector.provider)
      accounts = await web3.eth.getAccounts()
    }
    const balance = await web3.eth.getBalance(accounts[0])
    this.setInfoInState(accounts[0], connector.name, web3.utils.fromWei(balance, 'ether'))
  }

  render() {
    const { connector, accountAddress, ethBalance } = this.state
    const { loader } = this.props

    return (
      <div className="card pz licenses">
        {
          loader ?
            <div className="loader-container">
              <Loader type="ball-spin-fade-loader" active />
            </div> :
            <React.Fragment>
              {
                Object.keys(connectors).map(elem => (
                  <Button
                    text={connectors[elem].name}
                    onClick={() => this.handleConnect(elem)}
                    className="mr"
                  />
                ))
              }
              <div>{`Connected to: ${connector}`}</div>
              <div>{`Account Address: ${accountAddress}`}</div>
              <div>{`ETH Balance: ${ethBalance} ETH`}</div>
            </React.Fragment>
        }
      </div>
    )
  }
}

export default withRouter(Licenses)
