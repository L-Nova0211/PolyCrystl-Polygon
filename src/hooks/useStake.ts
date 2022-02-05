import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { updateUserStakedBalance, updateUserBalance } from 'state/actions'
import { stake, sousStake, sousStakeBnb, stakeVault } from 'utils/callHelpers'
import { useMasterchef, useSousChef, useVaultHealer, useVaultHealerV2 } from './useContract'

export const useFarmStake = (pid: number) => {
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefContract, pid, amount, account)
      console.info(txHash)
    },
    [account, masterChefContract, pid],
  )

  return { onStake: handleStake }
}

export const useSousStake = (sousId: number, isUsingBnb = false) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)

  const handleStake = useCallback(
    async (amount: string, decimals: number) => {
      if (sousId === 0) {
        await stake(masterChefContract, 0, amount, account)
      } else if (isUsingBnb) {
        await sousStakeBnb(sousChefContract, amount, account)
      } else {
        await sousStake(sousChefContract, amount, decimals, account)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
    },
    [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId],
  )

  return { onStake: handleStake }
}

export const useStake = (pid: number) => {
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefContract, pid, amount, account)
      console.info(txHash)
    },
    [account, masterChefContract, pid],
  )

  return { onStake: handleStake }
}

export const useVaultStake = (pid: number) => {
  const { account } = useWeb3React()
  const vaultHealerContract = useVaultHealer()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stakeVault(vaultHealerContract, pid, amount, account /* , true */)
      console.info(txHash)
    },
    [account, vaultHealerContract, pid],
  )

  return { onStake: handleStake }
}

export const useVaultV2Stake = (pid: number) => {
  const { account } = useWeb3React()
  const vaultHealerContract = useVaultHealerV2()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stakeVault(vaultHealerContract, pid, amount, account /* , false */)
      console.info(txHash)
    },
    [account, vaultHealerContract, pid],
  )

  return { onStake: handleStake }
}
