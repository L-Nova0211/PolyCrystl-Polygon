import BigNumber from 'bignumber.js'
import { /* DEFAULT_GAS_LIMIT, */ DEFAULT_TOKEN_DECIMAL /* , DEFAULT_VAULT_GAS_LIMIT */ } from 'config'
import { ethers } from 'ethers'
import { Pair, TokenAmount, Token } from '@pancakeswap-libs/sdk'
import { getLpContract, getMasterchefContract } from 'utils/contractHelpers'
import farms from 'config/constants/farms'
import { getAddress, getCrystlAddress } from 'utils/addressHelpers'
import tokens from 'config/constants/tokens'
import pools from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import { multicallv2 } from './multicall'
import { getWeb3WithArchivedNodeProvider } from './web3'
import { getBalanceAmount } from './formatBalance'
import { BIG_TEN, BIG_ZERO } from './bigNumber'

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const stake = async (masterChefContract, pid, amount, account) => {
  let decimals = DEFAULT_TOKEN_DECIMAL
  if (pid === 27) {
    decimals = BIG_TEN.pow(6)
  }
  return masterChefContract.methods
    .deposit(pid, new BigNumber(amount).times(decimals).toString())
    .send({ from: account /* , gas: DEFAULT_GAS_LIMIT */ })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const stakeVault = async (vaultHealerContract, pid, amount, account /* , v1 */) => {
  return vaultHealerContract.methods
    .deposit(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
    .send({ from: account /* , gas: v1 ? DEFAULT_VAULT_GAS_LIMIT : DEFAULT_GAS_LIMIT */ })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStake = async (sousChefContract, amount, decimals = 18, account) => {
  return sousChefContract.methods
    .deposit(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString())
    .send({ from: account /* , gas: DEFAULT_GAS_LIMIT */ })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStakeBnb = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .deposit()
    .send({
      from: account,
      /* gas: DEFAULT_GAS_LIMIT, */
      value: new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(),
    })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  let decimals = DEFAULT_TOKEN_DECIMAL
  if (pid === 27) {
    decimals = BIG_TEN.pow(6)
  }
  return masterChefContract.methods
    .withdraw(pid, new BigNumber(amount).times(decimals).toString())
    .send({ from: account /* , gas: DEFAULT_GAS_LIMIT  */ })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const vaultUnstake = async (vaultHealerContract, pid, amount, account /* , v1 */) => {
  return vaultHealerContract.methods
    .withdraw(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
    .send({ from: account /* , gas: v1 ? DEFAULT_VAULT_GAS_LIMIT : DEFAULT_GAS_LIMIT */ })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const vaultUnstakeAll = async (vaultHealerContract, pid, account /* , v1 */) => {
  return vaultHealerContract.methods
    .withdrawAll(pid)
    .send({ from: account /* , gas: v1 ? DEFAULT_VAULT_GAS_LIMIT : DEFAULT_GAS_LIMIT */ })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousUnstake = async (sousChefContract, amount, decimals, account) => {
  return sousChefContract.methods
    .withdraw(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString())
    .send({ from: account /* , gas: DEFAULT_GAS_LIMIT */ })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousEmergencyUnstake = async (sousChefContract, account) => {
  return sousChefContract.methods
    .emergencyWithdraw()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account /* , gas: DEFAULT_GAS_LIMIT */ })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvest = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit('0')
    .send({ from: account /* , gas: DEFAULT_GAS_LIMIT */ })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvestBnb = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account /* , gas: DEFAULT_GAS_LIMIT */, value: BIG_ZERO })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
const crystlMaticPid = 1
const crystlMaticFarm = farms.find((farm) => farm.pid === crystlMaticPid)
const CRYSTL_TOKEN = new Token(chainId, getCrystlAddress(), 18)
const WMATIC_TOKEN = new Token(chainId, tokens.wmatic.address[chainId], 18)
const CRYSTL_MATIC_TOKEN = new Token(chainId, getAddress(crystlMaticFarm.lpAddresses), 18)

/**
 * Returns the total CRYSTL staked in the CRYSTL-MATIC LP
 */
export const getUserStakeInCrystlMaticLp = async (account: string, block?: number) => {
  try {
    const archivedWeb3 = getWeb3WithArchivedNodeProvider()
    const masterContract = getMasterchefContract(archivedWeb3)
    const crystlMaticContract = getLpContract(getAddress(crystlMaticFarm.lpAddresses), archivedWeb3)
    const totalSupplyLP = await crystlMaticContract.methods.totalSupply().call(undefined, block)
    const reservesLP = await crystlMaticContract.methods.getReserves().call(undefined, block)
    const crystlMaticBalance = await masterContract.methods.userInfo(crystlMaticPid, account).call(undefined, block)

    const pair: Pair = new Pair(
      new TokenAmount(CRYSTL_TOKEN, reservesLP._reserve0.toString()),
      new TokenAmount(WMATIC_TOKEN, reservesLP._reserve1.toString()),
    )
    const crystlLPBalance = pair.getLiquidityValue(
      pair.token0,
      new TokenAmount(CRYSTL_MATIC_TOKEN, totalSupplyLP.toString()),
      new TokenAmount(CRYSTL_MATIC_TOKEN, crystlMaticBalance.amount.toString()),
      false,
    )

    return new BigNumber(crystlLPBalance.toSignificant(18))
  } catch (error) {
    console.error(`CRYSTL-MATIC LP error: ${error}`)
    return BIG_ZERO
  }
}

/**
 * Gets the CRYSTL staked in the main pool
 */
export const getUserStakeInCrystlPool = async (account: string, block?: number) => {
  try {
    const archivedWeb3 = getWeb3WithArchivedNodeProvider()
    const masterContract = getMasterchefContract(archivedWeb3)
    const response = await masterContract.methods.userInfo(0, account).call(undefined, block)

    return getBalanceAmount(new BigNumber(response.amount))
  } catch (error) {
    console.error('Error getting stake in CRYSTL pool', error)
    return BIG_ZERO
  }
}

/**
 * Returns total staked value of active pools
 */
export const getUserStakeInPools = async (account: string, block?: number) => {
  try {
    const multicallOptions = {
      web3: getWeb3WithArchivedNodeProvider(),
      blockNumber: block,
      requireSuccess: false,
    }
    const eligiblePools = pools
      .filter((pool) => pool.sousId !== 0)
      .filter((pool) => pool.isFinished === false || pool.isFinished === undefined)

    // Get the ending block is eligible pools
    const endBlockCalls = eligiblePools.map((eligiblePool) => ({
      address: getAddress(eligiblePool.contractAddress),
      name: 'bonusEndBlock',
    }))
    const startBlockCalls = eligiblePools.map((eligiblePool) => ({
      address: getAddress(eligiblePool.contractAddress),
      name: 'startBlock',
    }))
    const endBlocks = await multicallv2(sousChefABI, endBlockCalls, multicallOptions)
    const startBlocks = await multicallv2(sousChefABI, startBlockCalls, multicallOptions)

    // Filter out pools that have ended
    const activePools = eligiblePools.filter((eligiblePool, index) => {
      const endBlock = new BigNumber(endBlocks[index])
      const startBlock = new BigNumber(startBlocks[index])

      return startBlock.lte(block) && endBlock.gte(block)
    })

    // Get the user info of each pool
    const userInfoCalls = activePools.map((activePool) => ({
      address: getAddress(activePool.contractAddress),
      name: 'userInfo',
      params: [account],
    }))
    const userInfos = await multicallv2(sousChefABI, userInfoCalls, multicallOptions)

    return userInfos.reduce((accum: BigNumber, userInfo) => {
      return accum.plus(new BigNumber(userInfo.amount._hex))
    }, new BigNumber(0))
  } catch (error) {
    console.error('Error fetching staked values:', error)
    return BIG_ZERO
  }
}
