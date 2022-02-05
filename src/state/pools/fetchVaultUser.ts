import BigNumber from 'bignumber.js'
import { getCrystlVaultContract } from 'utils/contractHelpers'

const crystlVaultContract = getCrystlVaultContract()

const fetchVaultUser = async (account: string) => {
  try {
    const userContractResponse = await crystlVaultContract.methods.userInfo(account).call()
    return {
      isLoading: false,
      userShares: new BigNumber(userContractResponse.shares).toJSON(),
      lastDepositedTime: userContractResponse.lastDepositedTime as string,
      lastUserActionTime: userContractResponse.lastUserActionTime as string,
      crystlAtLastUserAction: new BigNumber(userContractResponse.crystalAtLastUserAction).toJSON(),
    }
  } catch (error) {
    return {
      isLoading: true,
      userShares: null,
      lastDepositedTime: null,
      lastUserActionTime: null,
      crystlAtLastUserAction: null,
    }
  }
}

export default fetchVaultUser
