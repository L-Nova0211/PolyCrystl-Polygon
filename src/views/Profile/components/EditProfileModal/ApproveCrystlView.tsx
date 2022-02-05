import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { AutoRenewIcon, Button, Flex, InjectedModalProps, Text } from '@crystals/uikit'
import { useTranslation } from 'contexts/Localization'
import { useCrystl } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { useProfile } from 'state/hooks'
import { getPolyCrystalProfileAddress } from 'utils/addressHelpers'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useGetProfileCosts from 'hooks/useGetProfileCosts'
import { UseEditProfileResponse } from './reducer'

interface ApproveCrystlPageProps extends InjectedModalProps {
  goToChange: UseEditProfileResponse['goToChange']
}

const ApproveCrystlPage: React.FC<ApproveCrystlPageProps> = ({ goToChange, onDismiss }) => {
  const [isApproving, setIsApproving] = useState(false)
  const { profile } = useProfile()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { numberCrystlToUpdate, numberCrystlToReactivate } = useGetProfileCosts()
  const crystlContract = useCrystl()
  const { toastError } = useToast()
  const cost = profile.isActive ? numberCrystlToUpdate : numberCrystlToReactivate

  const handleApprove = () => {
    crystlContract.methods
      .approve(getPolyCrystalProfileAddress(), cost.times(2).toJSON())
      .send({ from: account })
      .on('sending', () => {
        setIsApproving(true)
      })
      .on('receipt', () => {
        goToChange()
      })
      .on('error', (error) => {
        toastError(t('Error'), error?.message)
        setIsApproving(false)
      })
  }

  if (!profile) {
    return null
  }

  return (
    <Flex flexDirection="column">
      <Flex alignItems="center" justifyContent="space-between" mb="24px">
        <Text>{profile.isActive ? t('Cost to update:') : t('Cost to reactivate:')}</Text>
        <Text>{getFullDisplayBalance(cost)} CRYSTL</Text>
      </Flex>
      <Button
        disabled={isApproving}
        isLoading={isApproving}
        endIcon={isApproving ? <AutoRenewIcon spin color="currentColor" /> : null}
        width="100%"
        mb="8px"
        onClick={handleApprove}
      >
        {t('Approve')}
      </Button>
      <Button variant="text" width="100%" onClick={onDismiss} disabled={isApproving}>
        {t('Close Window')}
      </Button>
    </Flex>
  )
}

export default ApproveCrystlPage
