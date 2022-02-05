import React from 'react'
import styled from 'styled-components'
import { Text } from '@crystals/uikit'
import { useTranslation } from 'contexts/Localization'
import { useVaultV2Unstake, useVaultV2UnstakeAll } from 'hooks/useUnstake'
import Heading from './Heading'
import WalletBalance from './WalletBalance'
import ActionInput from './ActionInput'

export interface WithdrawProps {
  stakedBalance: string
  stakedUSD: string
  pid: number
  withdrawFee: number
  needsApproval: boolean
  tokenPrice: number
  paused: boolean
}

const WithdrawWrapper = styled.div`
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

const formatDepositFee = (withdrawFee: number): string => {
  const fee = withdrawFee * 100
  return `${fee}%`
}

const Withdraw: React.FC<WithdrawProps> = ({
  pid,
  stakedBalance,
  stakedUSD,
  withdrawFee,
  needsApproval,
  tokenPrice,
  paused,
}) => {
  const { onUnstake } = useVaultV2Unstake(pid)
  const { onUnstakeAll } = useVaultV2UnstakeAll(pid)
  const { t } = useTranslation()
  const toastMessages = {
    success: {
      heading: t('Withdrawn!'),
      message: t('Your LP has been withdrawn to your wallet!'),
    },
  }

  return (
    <>
      <WithdrawWrapper>
        <StyledHeading>
          <StyledText color="secondary">
            <h3>{t('Vault')}</h3>
          </StyledText>
          <WalletBalance displayUSD={stakedUSD} />
          <StyledText color="secondary">
            <h3>{t('Withdraw Fee')}</h3>
          </StyledText>
          {formatDepositFee(withdrawFee)}
        </StyledHeading>
        <ActionInput
          needsApproval={needsApproval}
          onConfirm={onUnstake}
          onWithdrawAll={onUnstakeAll}
          max={stakedBalance}
          buttonLabel="Withdraw to Wallet"
          toast={toastMessages}
          tokenPrice={tokenPrice}
          defaultSelectAll={paused}
        />
      </WithdrawWrapper>
    </>
  )
}

export default Withdraw
