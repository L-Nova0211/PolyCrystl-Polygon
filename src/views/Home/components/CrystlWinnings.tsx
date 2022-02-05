import React from 'react'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceCrystlBusd } from 'state/hooks'
import { Text } from '@crystals/uikit'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'bignumber.js'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-bottom: 24px;
`

interface CrystlWinningsProps {
  claimAmount: BigNumber
}

const CrystlWinnings: React.FC<CrystlWinningsProps> = ({ claimAmount }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const crystlAmount = getBalanceNumber(claimAmount)
  const crystlPriceBusd = usePriceCrystlBusd()
  const claimAmountBusd = new BigNumber(crystlAmount).multipliedBy(crystlPriceBusd).toNumber()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '76px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <Block>
      <CardValue value={crystlAmount} lineHeight="1.5" />
      {crystlPriceBusd.gt(0) && <CardBusdValue value={claimAmountBusd} decimals={2} />}
    </Block>
  )
}

export default CrystlWinnings
