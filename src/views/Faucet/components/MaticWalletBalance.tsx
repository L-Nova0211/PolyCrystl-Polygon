import React from 'react'
import { Text } from '@crystals/uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getMaticAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceMaticBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardValue from '../../Home/components/CardValue'
import CardBusdValue from '../../Home/components/CardBusdValue'

const MaticWalletBalance: React.FC = () => {
  const { t } = useTranslation()
  const { balance: maticBalance } = useTokenBalance(getMaticAddress())
  const maticPriceUsd = usePriceMaticBusd()
  const usdBalance = new BigNumber(getBalanceNumber(maticBalance)).multipliedBy(maticPriceUsd).toNumber()
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
      <CardValue value={getBalanceNumber(maticBalance)} decimals={4} fontSize="24px" lineHeight="36px" />
      {maticPriceUsd.gt(0) ? <CardBusdValue value={usdBalance} /> : <br />}
    </>
  )
}

export default MaticWalletBalance
