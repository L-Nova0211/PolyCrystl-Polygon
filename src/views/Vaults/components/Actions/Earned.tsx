import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, Skeleton, Flex } from '@crystals/uikit'
import { formatNumber, getBalanceNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import CardValue from 'views/Home/components/CardValue'
import GetLP from './GetLP'

export interface EarnedProps {
  tokenName?: string
  stakedBalance?: string
  lpSymbol?: string
  liquidityLink?: string
}

const FlexWrapper = styled(Flex)`
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.colors.secondary};
  height: 150px;

  ${({ theme }) => theme.mediaQueries.lg} {
    height: 100%;
  }
`
const getDecimalsToTruncate = (tokenEarned: number, precision = 18) => {
  const tokenEarnedStr = formatNumber(tokenEarned, 2, precision)
  if (tokenEarnedStr.includes('.')) {
    const countInt = tokenEarnedStr.split('.')[0].length
    return precision - countInt
  }
  return 0
}

const Earned: React.FC<EarnedProps> = ({ tokenName, stakedBalance, lpSymbol, liquidityLink }) => {
  const { t } = useTranslation()
  const stakedBalanceNumber = getBalanceNumber(new BigNumber(stakedBalance))

  if (stakedBalanceNumber === 0) {
    return (
      <FlexWrapper flexDirection="column" justifyContent="center" alignItems="center">
        <Text color="secondary" fontSize="18px" style={{ marginBottom: '10px' }}>
          {t('Stake LP to Compound')}
        </Text>
        <Flex flexDirection="row" justifyContent="space-between" alignItems="baseline">
          <GetLP lpName={lpSymbol} liquidityLink={liquidityLink} />
        </Flex>
      </FlexWrapper>
    )
  }

  return (
    <FlexWrapper flexDirection="column" justifyContent="center" alignItems="center">
      <Text color="secondary" fontSize="18px">
        {t('Compounding ')} {tokenName}
      </Text>
      <Flex flexDirection="row" justifyContent="space-between" alignItems="baseline">
        {stakedBalanceNumber ? (
          <CardValue
            value={stakedBalanceNumber}
            suffix=" LP"
            decimals={getDecimalsToTruncate(stakedBalanceNumber)}
            fontSize="18px"
          />
        ) : (
          <Skeleton height={24} width={80} />
        )}
      </Flex>
      <div style={{ marginTop: '15px' }}>
        <Flex flexDirection="row" justifyContent="space-between" alignItems="baseline">
          <GetLP lpName={lpSymbol} liquidityLink={liquidityLink} />
        </Flex>
      </div>
    </FlexWrapper>
  )
}

export default Earned
