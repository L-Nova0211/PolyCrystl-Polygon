import React from 'react'
import { Text, TooltipText, useTooltip } from '@crystals/uikit'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'

interface RecentCrystlProfitBalanceProps {
  crystlToDisplay: number
  dollarValueToDisplay: number
  dateStringToDisplay: string
}

const RecentCrystlProfitBalance: React.FC<RecentCrystlProfitBalanceProps> = ({
  crystlToDisplay,
  dollarValueToDisplay,
  dateStringToDisplay,
}) => {
  const { t } = useTranslation()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Balance fontSize="16px" value={crystlToDisplay} decimals={3} bold unit=" CRYSTL" />
      <Balance fontSize="16px" value={dollarValueToDisplay} decimals={2} bold prefix="~$" />
      {t('Earned since your last action')}
      <Text>{dateStringToDisplay}</Text>
    </>,
    {
      placement: 'bottom-end',
    },
  )

  return (
    <>
      {tooltipVisible && tooltip}
      <TooltipText ref={targetRef} small>
        <Balance fontSize="14px" value={crystlToDisplay} />
      </TooltipText>
    </>
  )
}

export default RecentCrystlProfitBalance
