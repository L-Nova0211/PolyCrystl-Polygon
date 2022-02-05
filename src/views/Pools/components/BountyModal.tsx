import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
/* import { DEFAULT_GAS_LIMIT } from 'config' */
import styled from 'styled-components'
import { Modal, Text, Flex, Button, AutoRenewIcon, useTooltip } from '@crystals/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { useCrystlVaultContract } from 'hooks/useContract'
import useTheme from 'hooks/useTheme'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'
import UnlockButton from 'components/UnlockButton'
import Balance from 'components/Balance'

interface BountyModalProps {
  crystlBountyToDisplay: number
  dollarBountyToDisplay: number
  totalPendingCrystlHarvest: BigNumber
  callFee: number
  onDismiss?: () => void
  TooltipComponent: React.ElementType
}

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundDisabled};
  height: 1px;
  margin: 16px auto;
  width: 100%;
`

const BountyModal: React.FC<BountyModalProps> = ({
  crystlBountyToDisplay,
  dollarBountyToDisplay,
  totalPendingCrystlHarvest,
  callFee,
  onDismiss,
  TooltipComponent,
}) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { theme } = useTheme()
  const { toastError, toastSuccess } = useToast()
  const crystlVaultContract = useCrystlVaultContract()
  const [pendingTx, setPendingTx] = useState(false)
  const callFeeAsDecimal = callFee / 100
  const totalYieldToDisplay = getBalanceNumber(totalPendingCrystlHarvest, 18)
  const { tooltip, tooltipVisible } = useTooltip(<TooltipComponent />, {
    placement: 'bottom',
    tooltipPadding: { right: 15 },
  })

  const handleConfirmClick = async () => {
    crystlVaultContract.methods
      .harvest()
      .send({ from: account /* , gas: DEFAULT_GAS_LIMIT */ })
      .on('sending', () => {
        setPendingTx(true)
      })
      .on('receipt', () => {
        toastSuccess(t('Bounty collected!'), t('CRYSTL bounty has been sent to your wallet.'))
        setPendingTx(false)
        onDismiss()
      })
      .on('error', (error) => {
        console.error(error)
        toastError(
          t('Could not be collected'),
          t('There may be an issue with your transaction, or another user claimed the bounty first.'),
        )
        setPendingTx(false)
        onDismiss()
      })
  }

  return (
    <Modal title={t('Claim Bounty')} onDismiss={onDismiss} headerBackground={theme.colors.gradients.cardHeader}>
      {tooltipVisible && tooltip}
      <Flex alignItems="flex-start" justifyContent="space-between">
        <Text>{t('You’ll claim')}</Text>
        <Flex flexDirection="column">
          <Balance bold value={crystlBountyToDisplay} decimals={7} unit=" CRYSTL" />
          <Text fontSize="12px" color="textSubtle">
            <Balance
              fontSize="12px"
              color="textSubtle"
              value={dollarBountyToDisplay}
              decimals={2}
              unit=" USD"
              prefix="~"
            />
          </Text>
        </Flex>
      </Flex>
      <Divider />
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="14px" color="textSubtle">
          {t('Pool total pending yield')}
        </Text>
        <Balance color="textSubtle" value={totalYieldToDisplay} unit=" CRYSTL" />
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="24px">
        <Text fontSize="14px" color="textSubtle">
          {t('Bounty')}
        </Text>
        <Text fontSize="14px" color="textSubtle">
          {callFeeAsDecimal}%
        </Text>
      </Flex>
      {account ? (
        <Button
          isLoading={pendingTx}
          endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
          onClick={handleConfirmClick}
          mb="28px"
        >
          {t('Confirm')}
        </Button>
      ) : (
        <UnlockButton mb="28px" />
      )}
    </Modal>
  )
}

export default BountyModal
