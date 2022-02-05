import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, Flex } from '@crystals/uikit'
import { useTranslation } from 'contexts/Localization'
import { formatNumber, getBalanceNumber, getAmountUSD } from 'utils/formatBalance'

export interface CrystlBurnedProps {
  crystlBurnRate?: string
  totalBurned?: string
  crystlPrice?: BigNumber
}

const FlexWrapper = styled(Flex)`
  margin-top: 16px;
  margin-bottom: 16px;
  margin-left: 16px;
`
const CrystlBurned: React.FC<CrystlBurnedProps> = ({ crystlBurnRate, totalBurned, crystlPrice }) => {
  const { t } = useTranslation()
  const burnRate = crystlBurnRate ? `${formatNumber(parseFloat(crystlBurnRate) * 100)}%` : `0%`
  const burnedCRYSTL = getBalanceNumber(new BigNumber(totalBurned))
  const burnedUSD = totalBurned && crystlPrice ? crystlPrice.multipliedBy(burnedCRYSTL) : new BigNumber(0)
  const burnedDisplayCRYSTL = formatNumber(burnedCRYSTL)
  const burnedDisplayUSD = getAmountUSD(burnedUSD)

  return (
    <>
      <FlexWrapper flexDirection="column" justifyContent="center" alignItems="flex-start" flexGrow={1}>
        <Text color="text" fontSize="20px">
          {t('CRYSTL Burned')}
        </Text>
        <Flex flexDirection="row">
          <Text color="secondary" marginRight="4px">
            {t('CRYSTL Burn Rates:')}
          </Text>
          <Text color="secondary" bold>
            {burnRate}
          </Text>
        </Flex>
        <Flex flexDirection="row">
          <Text color="secondary" marginRight="4px">
            {t('Total CRYSTL Burned:')}
          </Text>
          <Text color="secondary" bold>
            {burnedDisplayCRYSTL}
          </Text>
        </Flex>
        <Flex flexDirection="row">
          <Text color="secondary" marginRight="4px">
            {t('Total USD Burned:')}
          </Text>
          <Text color="secondary" bold>
            {burnedDisplayUSD}
          </Text>
        </Flex>
      </FlexWrapper>
    </>
  )
}

export default CrystlBurned
