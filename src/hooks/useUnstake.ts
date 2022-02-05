import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { updateUserStakedBalance, updateUserBalance, updateUserPendingReward } from 'state/actions'
import { unstake, sousUnstake, sousEmergencyUnstake, vaultUnstake, vaultUnstakeAll } from 'utils/callHelpers'
import { useMasterchef, useSousChef, useVaultHealer, useVaultHealerV2 } from './useContract'

const useUnstake = (pid: number) => {
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.info(txHash)
    },
    [account, masterChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export const useSousUnstake = (sousId, enableEmergencyWithdraw = false) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)

  const handleUnstake = useCallback(
    async (amount: string, decimals: number) => {
      if (sousId === 0) {
        const txHash = await unstake(masterChefContract, 0, amount, account)
        console.info(txHash)
      } else if (enableEmergencyWithdraw) {
        const txHash = await sousEmergencyUnstake(sousChefContract, account)
        console.info(txHash)
      } else {
        const txHash = await sousUnstake(sousChefContract, amount, decimals, account)
        console.info(txHash)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
      dispatch(updateUserPendingReward(sousId, account))
    },
    [account, dispatch, enableEmergencyWithdraw, masterChefContract, sousChefContract, sousId],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake

export const useVaultUnstake = (pid: number) => {
  const { account } = useWeb3React()
  const vaultHealerContract = useVaultHealer()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await vaultUnstake(vaultHealerContract, pid, amount, account /* , true */)
      console.info(txHash)
    },
    [account, vaultHealerContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export const useVaultUnstakeAll = (pid: number) => {
  const { account } = useWeb3React()
  const vaultHealerContract = useVaultHealer()

  const handleUnstake = useCallback(async () => {
    const txHash = await vaultUnstakeAll(vaultHealerContract, pid, account /* , true */)
    console.info(txHash)
  }, [account, vaultHealerContract, pid])

  return { onUnstakeAll: handleUnstake }
}

export const useVaultV2Unstake = (pid: number) => {
  const { account } = useWeb3React()
  const vaultHealerContract = useVaultHealerV2()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await vaultUnstake(vaultHealerContract, pid, amount, account /* , false */)
      console.info(txHash)
    },
    [account, vaultHealerContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export const useVaultV2UnstakeAll = (pid: number) => {
  const { account } = useWeb3React()
  const vaultHealerContract = useVaultHealerV2()

  const handleUnstake = useCallback(async () => {
    const txHash = await vaultUnstakeAll(vaultHealerContract, pid, account /* , false */)
    console.info(txHash)
  }, [account, vaultHealerContract, pid])

  return { onUnstakeAll: handleUnstake }
}
