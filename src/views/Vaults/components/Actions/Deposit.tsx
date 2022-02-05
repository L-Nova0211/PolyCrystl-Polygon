import React from 'react'
import styled from 'styled-components'
import { useVaultStake } from 'hooks/useStake'
import { Text } from '@crystals/uikit'
import { useTranslation } from 'contexts/Localization'
import ActionInput from './ActionInput'
import Heading from './Heading'
import WalletBalance from './WalletBalance'

export interface DepositProps {
  tokenBalance: string
  tokenPrice: number
  balanceUSD: string
  pid: number
  needsApproval: boolean
  paused: boolean
  inactive: boolean
  depositFee: string
}

const DepositWrapper = styled.div`
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 8px;
  }
`

const StyledHeading = styled(Heading)`
  margin-bottom: 8px;
`

const StyledText = styled(Text)`
  line-height: 16px;
`

const formatDepositFee = (depositFee: string): string => {
  return `${depositFee}%`
}

const Deposit: React.FC<DepositProps> = ({
  pid,
  tokenBalance,
  balanceUSD,
  needsApproval,
  tokenPrice,
  paused,
  inactive,
  depositFee,
}) => {
  const { onStake } = useVaultStake(pid)
  const { t } = useTranslation()
  const toastMessages = {
    success: {
      heading: t('Deposited!'),
      message: t('Your LP has been deposited to the vault!'),
    },
  }
  const disabled = paused || inactive

  return (
    <>
      <DepositWrapper>
        <StyledHeading>
          <StyledText color="secondary">{t('Wallet')}</StyledText>
          <WalletBalance displayUSD={balanceUSD} />
          <StyledText color="secondary">
            <h3>{t('Deposit Fee')}</h3>
          </StyledText>
          {formatDepositFee(depositFee)}
        </StyledHeading>
        <ActionInput
          onConfirm={onStake}
          max={tokenBalance}
          buttonLabel="Deposit to Vault"
          toast={toastMessages}
          isDeposit
          needsApproval={needsApproval}
          tokenPrice={tokenPrice}
          disabled={disabled}
        />
      </DepositWrapper>
    </>
  )
}

export default Deposit
