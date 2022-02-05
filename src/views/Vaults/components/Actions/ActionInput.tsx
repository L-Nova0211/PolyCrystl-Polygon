import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import useToast from 'hooks/useToast'
import { Button, Flex, AutoRenewIcon, BalanceInput } from '@crystals/uikit'
import { useTranslation } from 'contexts/Localization'
import { getDisplayBalancePrice } from 'utils/formatBalance'

interface ToastMessage {
  heading: string
  message: string
}

interface ActionInputToastMessages {
  success: ToastMessage
}

interface ActionInputProps {
  max: string
  onConfirm: (amount: string) => void
  onWithdrawAll?: () => void
  placeholder?: string
  decimals?: number
  buttonLabel: string
  toast: ActionInputToastMessages
  isDeposit?: boolean
  needsApproval?: boolean
  tokenPrice?: number
  disabled?: boolean
  defaultSelectAll?: boolean
}

const getBoxShadow = ({ isWarning = false, theme }) => {
  if (isWarning) {
    return theme.shadows.warning
  }

  return theme.shadows.inset
}

const StyledInput = styled(BalanceInput)`
  box-shadow: none;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${getBoxShadow};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 16px;
`

const StyledButton = styled(Button)`
  flex-grow: 1;
`

const StyledConfirmButton = styled(Button)`
  margin-top: 8px;
  width: 100%;
`

const getSelectedPercent = (percent: number, current?: number) => {
  return current && current === percent ? 'primary' : 'tertiary'
}

interface PercentButtonProps {
  percent: number
  current?: number
  onClick: (percent: number) => void
  label?: string
}
const PercentButton: React.FC<PercentButtonProps> = ({ percent, current, onClick, label }) => {
  const { t } = useTranslation()
  return (
    <StyledButton
      scale="xs"
      mx="2px"
      p="4px 16px"
      variant={getSelectedPercent(current, percent)}
      onClick={() => onClick(percent)}
    >
      {label ? t(label) : `${percent.toString()}%`}
    </StyledButton>
  )
}

const ActionInput: React.FC<ActionInputProps> = ({
  max,
  onConfirm,
  onWithdrawAll,
  decimals = 18,
  buttonLabel,
  toast,
  isDeposit,
  needsApproval,
  tokenPrice,
  disabled,
  defaultSelectAll,
}) => {
  const { t } = useTranslation()
  const defaultValue = isDeposit || defaultSelectAll ? max : '0'
  const [stakeAmount, setStakeAmount] = useState<string>(defaultValue)
  const [pendingTx, setPendingTx] = useState(false)
  const minStakeAmount = new BigNumber('0')
  const maxNum = new BigNumber(max)
  const stakeAmountNum = new BigNumber(stakeAmount)
  const { toastSuccess, toastError } = useToast()
  const isBalanceZero = maxNum.isEqualTo(minStakeAmount) || !max
  const defaultPercent = (isDeposit && !isBalanceZero) || (defaultSelectAll && !isBalanceZero) ? 100 : 0
  const [percent, setPercent] = useState<number>(defaultPercent)
  const isAmountZero = stakeAmountNum.isEqualTo(minStakeAmount) || !stakeAmount
  const currencyValue = getDisplayBalancePrice(stakeAmountNum, tokenPrice)
  const handleChangePercent = (sliderPercent: number) => {
    if (sliderPercent > 0) {
      const percentageOfMax = maxNum.dividedBy(100).multipliedBy(sliderPercent).toFixed(18)
      setStakeAmount(percentageOfMax.toString())
      setPercent(sliderPercent)
    } else {
      setStakeAmount(minStakeAmount.toString())
      setPercent(100)
    }
  }
  const onChange = (input: string) => {
    const convertedInput = new BigNumber(input)
    if (convertedInput.isFinite()) {
      if (convertedInput.isLessThan(maxNum)) {
        setStakeAmount(input)
        setPercent(convertedInput.multipliedBy(100).dividedBy(maxNum).toNumber())
      } else {
        setStakeAmount(maxNum.toFixed(18))
        setPercent(100)
      }
    }
    setStakeAmount(input)
    setPercent(0)
  }

  return (
    <div style={{ position: 'relative' }}>
      <Flex alignItems="flex-end" justifyContent="space-around">
        <StyledInput value={stakeAmount} onUserInput={onChange} currencyValue={currencyValue} decimals={decimals} />
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mt="8px">
        <PercentButton current={percent} percent={25} onClick={handleChangePercent} />
        <PercentButton current={percent} percent={50} onClick={handleChangePercent} />
        <PercentButton current={percent} percent={75} onClick={handleChangePercent} />
        <PercentButton current={percent} percent={100} onClick={handleChangePercent} />
      </Flex>
      <StyledConfirmButton
        isLoading={pendingTx}
        endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
        onClick={async () => {
          try {
            setPendingTx(true)
            if (percent === 100 && !isDeposit) {
              await onWithdrawAll()
            } else {
              await onConfirm(stakeAmount)
            }
            toastSuccess(toast.success.heading, toast.success.message)
            setPendingTx(false)
            setStakeAmount(minStakeAmount.toString())
            setPercent(0)
          } catch (e) {
            toastError(t('Canceled'), t('Please try again and confirm the transaction.'))
            setPendingTx(false)
          }
        }}
        disabled={disabled || pendingTx || isBalanceZero || isAmountZero || needsApproval}
        mt="24px"
      >
        {pendingTx ? t('Confirming') : t(buttonLabel)}
      </StyledConfirmButton>
    </div>
  )
}

export default ActionInput
