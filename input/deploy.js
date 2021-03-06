const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
  '',
  'https://rinkeby.infura.io/v3/2dba812e3a9e454cb85b69eb48ef5a37'
)

const web3 = new Web3(provider)
const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  console.log(accounts)
  console.log('Trying to deploy from account', accounts[0])
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ['Hahaha']
    })
    .send({
      gas: '2000000',
      from: accounts[0]
    })
  console.log('Contract deployed to ', result.options.address)
}

deploy()
