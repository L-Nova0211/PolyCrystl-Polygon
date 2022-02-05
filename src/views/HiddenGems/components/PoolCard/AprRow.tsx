import React from 'react'
import { Flex, TooltipText, IconButton, useModal, CalculateIcon, Skeleton, useTooltip } from '@crystals/uikit'
import { useTranslation } from 'contexts/Localization'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import { Pool } from 'state/types'
import { BASE_EXCHANGE_URL } from 'config'
import { getAprData } from 'views/Pools/helpers'
import getSwapUrl from 'utils/getSwapUrl'
import { getAddress } from 'utils/addressHelpers'
import { formatApy } from 'utils/compoundApyHelpers'

interface AprRowProps {
  pool: Pool
  performanceFee?: number
}

const AprRow: React.FC<AprRowProps> = ({ pool, performanceFee = 0 }) => {
  const { t } = useTranslation()
  const { stakingToken, earningToken, isFinished, apr, earningTokenPrice, isAutoVault } = pool

  const tooltipContent = isAutoVault
    ? t('APY includes compounding, APR doesn’t. This pool’s CRYSTL is compounded automatically, so we show APY.')
    : t('This pool’s rewards aren’t compounded automatically, so we show APR')

  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, { placement: 'bottom-start' })

  const { apr: earningsPercentageToDisplay, roundingDecimals, compoundFrequency } = getAprData(pool, performanceFee)

  const apyModalLink = stakingToken.address && getSwapUrl(getAddress(stakingToken.address))

  const formattedApr = formatApy(earningsPercentageToDisplay)

  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal
      tokenPrice={earningTokenPrice}
      apr={apr}
      linkLabel={t('Get %symbol%', { symbol: stakingToken.symbol })}
      linkHref={apyModalLink || BASE_EXCHANGE_URL}
      earningTokenSymbol={earningToken.symbol}
      roundingDecimals={roundingDecimals}
      compoundFrequency={compoundFrequency}
      performanceFee={performanceFee}
    />,
  )

  return (
    <Flex alignItems="center" justifyContent="space-between">
      {tooltipVisible && tooltip}
      <TooltipText ref={targetRef}>{isAutoVault ? `${t('APY')}:` : `${t('APR')}:`}</TooltipText>
      {isFinished || !apr ? (
        <Skeleton width="82px" height="32px" />
      ) : (
        <Flex alignItems="center">
          {formattedApr}
          <IconButton onClick={onPresentApyModal} variant="text" scale="sm">
            <CalculateIcon color="textSubtle" width="18px" />
          </IconButton>
        </Flex>
      )}
    </Flex>
  )
}

export default AprRow
