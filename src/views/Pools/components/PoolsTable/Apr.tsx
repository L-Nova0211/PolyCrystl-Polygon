import React from 'react'
import { Flex, useModal, CalculateIcon, IconButton, Skeleton, FlexProps, Text } from '@crystals/uikit'
import { BASE_EXCHANGE_URL } from 'config'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import { Pool } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getAprData } from 'views/Pools/helpers'
import getSwapUrl from 'utils/getSwapUrl'
import { getAddress } from 'utils/addressHelpers'
import { formatApy } from 'utils/compoundApyHelpers'

interface AprProps extends FlexProps {
  pool: Pool
  showIcon: boolean
  performanceFee?: number
}

const Apr: React.FC<AprProps> = ({ pool, showIcon, performanceFee = 0, ...props }) => {
  const { stakingToken, earningToken, isFinished, earningTokenPrice, apr } = pool
  const { t } = useTranslation()

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

  const openRoiModal = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    onPresentApyModal()
  }

  return (
    <Flex alignItems="center" justifyContent="space-between" {...props}>
      {earningsPercentageToDisplay || isFinished ? (
        <>
          <Flex>
            <Text>{formattedApr}</Text>
          </Flex>
          {!isFinished && showIcon && (
            <Flex>
              <IconButton
                onClick={openRoiModal}
                variant="text"
                width="20px"
                height="20px"
                mr={['-14px', '-14px', '0px']}
              >
                <CalculateIcon color="textSubtle" width="20px" />
              </IconButton>
            </Flex>
          )}
        </>
      ) : (
        <Skeleton width="80px" height="16px" />
      )}
    </Flex>
  )
}

export default Apr
