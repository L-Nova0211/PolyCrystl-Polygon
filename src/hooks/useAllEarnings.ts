import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
// import multicall from 'utils/multicall'
// import { getMasterChefAddress } from 'utils/addressHelpers'
// import masterChefABI from 'config/abi/masterchef.json'
// import { farmsConfig } from 'config/constants'
import useRefresh from './useRefresh'

const useAllEarnings = () => {
  const [balances /* , setBalance */] = useState([])
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    // const fetchAllBalances = async () => {
    //   const calls = farmsConfig.map((farm) => ({
    //     address: getMasterChefAddress(),
    //     name: 'pendingCrystal',
    //     params: [farm.pid, account],
    //   }))

    //   const res = await multicall(masterChefABI, calls)

    //   setBalance(res)
    // }

    if (account) {
      // do not call pendingCrystal as it returns SafeMath error division by zero
      // due to emissions being reduce to zero.
      // fetchAllBalances()
    }
  }, [account, fastRefresh])

  return balances
}

export default useAllEarnings
