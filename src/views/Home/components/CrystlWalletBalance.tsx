import React from 'react'
import { Text } from '@crystals/uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getCrystlAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceCrystlBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const CrystlWalletBalance = () => {
  const { t } = useTranslation()
  const { balance: crystlBalance } = useTokenBalance(getCrystlAddress())
  const crystlPriceBusd = usePriceCrystlBusd()
  const busdBalance = new BigNumber(getBalanceNumber(crystlBalance)).multipliedBy(crystlPriceBusd).toNumber()
  const { account } = useWeb3React()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '54px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <>
      <CardValue value={getBalanceNumber(crystlBalance)} decimals={4} fontSize="24px" lineHeight="36px" />
      {crystlPriceBusd.gt(0) ? <CardBusdValue value={busdBalance} /> : <br />}
    </>
  )
}

export default CrystlWalletBalance
