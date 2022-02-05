import { useEffect, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import { getProfileContract } from 'utils/contractHelpers'
import makeBatchRequest from 'utils/makeBatchRequest'
import { BIG_ZERO } from 'utils/bigNumber'
import useToast from './useToast'

const useGetProfileCosts = () => {
  const { t } = useTranslation()
  const [costs, setCosts] = useState({
    numberCrystlToReactivate: BIG_ZERO,
    numberCrystlToRegister: BIG_ZERO,
    numberCrystlToUpdate: BIG_ZERO,
  })
  const { toastError } = useToast()

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const profileContract = getProfileContract()
        const [numberCrystlToReactivate, numberCrystlToRegister, numberCrystlToUpdate] = await makeBatchRequest([
          profileContract.methods.numberCrystlToReactivate().call,
          profileContract.methods.numberCrystlToRegister().call,
          profileContract.methods.numberCrystlToUpdate().call,
        ])

        setCosts({
          numberCrystlToReactivate: new BigNumber(numberCrystlToReactivate as string),
          numberCrystlToRegister: new BigNumber(numberCrystlToRegister as string),
          numberCrystlToUpdate: new BigNumber(numberCrystlToUpdate as string),
        })
      } catch (error) {
        toastError(t('Error'), t('Could not retrieve CRYSTL costs for profile'))
      }
    }

    fetchCosts()
  }, [setCosts, toastError, t])

  return costs
}

export default useGetProfileCosts
