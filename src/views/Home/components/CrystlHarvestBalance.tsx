import React from 'react'
import { Text } from '@crystals/uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
// import useAllEarnings from 'hooks/useAllEarnings'
import { usePriceCrystlBusd } from 'state/hooks'
import styled from 'styled-components'
// import { DEFAULT_TOKEN_DECIMAL } from 'config'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-bottom: 24px;
`

const CrystlHarvestBalance = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  // const allEarnings = useAllEarnings()
  // const earningsSum = allEarnings.reduce((accum, earning) => {
  //   const earningNumber = new BigNumber(earning)
  //   if (earningNumber.eq(0)) {
  //     return accum
  //   }
  //   return accum + earningNumber.div(DEFAULT_TOKEN_DECIMAL).toNumber()
  // }, 0)
  const earningsSum = new BigNumber(0).toNumber()
  const crystlPriceBusd = usePriceCrystlBusd()
  const earningsBusd = new BigNumber(earningsSum).multipliedBy(crystlPriceBusd).toNumber()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '76px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <Block>
      <CardValue value={earningsSum} lineHeight="1.5" />
      {crystlPriceBusd.gt(0) && <CardBusdValue value={earningsBusd} />}
    </Block>
  )
}

export default CrystlHarvestBalance
