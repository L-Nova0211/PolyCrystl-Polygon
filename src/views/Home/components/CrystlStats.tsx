import React from 'react'
import { Card, CardBody, Heading, Text } from '@crystals/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getCrystlAddress } from 'utils/addressHelpers'
import { usePriceCrystlBusd } from 'state/hooks'
import { CRYSTL_PER_BLOCK } from 'config'
import CardValue from './CardValue'

const StyledCrystlStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CrystlStats = () => {
  const { t } = useTranslation()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getCrystlAddress()))
  const crystlSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0
  const crystlPrice = usePriceCrystlBusd()
  const crystlSupplyBusd = crystlPrice?.times(crystlSupply).toNumber()
  const burnedBalanceBusd = crystlPrice?.times(burnedBalance).toNumber()
  const crystlPerBlock = CRYSTL_PER_BLOCK?.toNumber()
  const crystlDecimals = CRYSTL_PER_BLOCK?.decimalPlaces()

  return (
    <StyledCrystlStats>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {t('Crystl Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{t('Circulating CRYSTL Supply')}</Text>
          {crystlSupply && <CardValue fontSize="14px" value={crystlSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total CRYSTL Burned')}</Text>
          <CardValue fontSize="14px" decimals={0} value={burnedBalance} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total USD Burned')}</Text>
          {burnedBalanceBusd ? <CardValue fontSize="14px" decimals={0} prefix="$" value={burnedBalanceBusd} /> : '0'}
        </Row>
        <Row>
          <Text fontSize="14px">{t('Market Cap')}</Text>
          {crystlSupplyBusd ? <CardValue fontSize="14px" decimals={0} prefix="$" value={crystlSupplyBusd} /> : '0'}
        </Row>
        <Row>
          <Text fontSize="14px">{t('CRYSTL Hard Cap')}</Text>
          <CardValue fontSize="14px" decimals={0} value={12500000} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('New CRYSTL/block')}</Text>
          <CardValue fontSize="14px" decimals={crystlDecimals} value={crystlPerBlock} />
        </Row>
      </CardBody>
    </StyledCrystlStats>
  )
}

export default CrystlStats
