import BigNumber from 'bignumber.js'
import { convertSharesToCrystl } from 'views/Pools/helpers'
import { getCrystlVaultContract } from 'utils/contractHelpers'
import makeBatchRequest from 'utils/makeBatchRequest'

const crystlVaultContract = getCrystlVaultContract()

export const fetchPublicVaultData = async () => {
  try {
    const [sharePrice, shares /* , estimatedCrystlBountyReward, totalPendingCrystlHarvest */] = await makeBatchRequest([
      crystlVaultContract.methods.getPricePerFullShare().call,
      crystlVaultContract.methods.totalShares().call,
      // crystlVaultContract.methods.calculateHarvestCrystalRewards().call,
      // crystlVaultContract.methods.calculateTotalPendingCrystalRewards().call,
    ])
    const totalSharesAsBigNumber = new BigNumber(shares as string)
    const sharePriceAsBigNumber = new BigNumber(sharePrice as string)
    const totalCrystlInVaultEstimate = convertSharesToCrystl(totalSharesAsBigNumber, sharePriceAsBigNumber)
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalCrystlInVault: totalCrystlInVaultEstimate.crystlAsBigNumber.toJSON(),
      estimatedCrystlBountyReward: new BigNumber(0).toJSON(),
      totalPendingCrystlHarvest: new BigNumber(0).toJSON(),
    }
  } catch (error) {
    return {
      totalShares: null,
      pricePerFullShare: null,
      totalCrystlInVault: null,
      estimatedCrystlBountyReward: null,
      totalPendingCrystlHarvest: null,
    }
  }
}

export const fetchVaultFees = async () => {
  try {
    const [performanceFee, callFee, withdrawalFee, withdrawalFeePeriod] = await makeBatchRequest([
      crystlVaultContract.methods.performanceFee().call,
      crystlVaultContract.methods.callFee().call,
      crystlVaultContract.methods.withdrawFee().call,
      crystlVaultContract.methods.withdrawFeePeriod().call,
    ])
    return {
      performanceFee: parseInt(performanceFee as string, 10),
      callFee: parseInt(callFee as string, 10),
      withdrawalFee: parseInt(withdrawalFee as string, 10),
      withdrawalFeePeriod: parseInt(withdrawalFeePeriod as string, 10),
    }
  } catch (error) {
    return {
      performanceFee: null,
      callFee: null,
      withdrawalFee: null,
      withdrawalFeePeriod: null,
    }
  }
}

export default fetchPublicVaultData
