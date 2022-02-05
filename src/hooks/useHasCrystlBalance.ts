import BigNumber from 'bignumber.js'
import { getCrystlAddress } from 'utils/addressHelpers'
import useTokenBalance from './useTokenBalance'

/**
 * A hook to check if a wallet's CRYSTL balance is at least the amount passed in
 */
const useHasCrystlBalance = (minimumBalance: BigNumber) => {
  const { balance: crystlBalance } = useTokenBalance(getCrystlAddress())
  return crystlBalance.gte(minimumBalance)
}

export default useHasCrystlBalance
