import React from 'react'
import { Flex, Text } from '@crystals/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import { useCrystlVault, usePriceCrystlBusd } from 'state/hooks'
import { getCrystlVaultEarnings } from 'views/Pools/helpers'
import RecentCrystlProfitBalance from './RecentCrystlProfitBalance'

const RecentCrystlProfitCountdownRow = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const {
    pricePerFullShare,
    userData: { crystlAtLastUserAction, userShares, lastUserActionTime },
  } = useCrystlVault()
  const crystlPriceBusd = usePriceCrystlBusd()
  const { hasAutoEarnings, autoCrystlToDisplay, autoUsdToDisplay } = getCrystlVaultEarnings(
    account,
    crystlAtLastUserAction,
    userShares,
    pricePerFullShare,
    crystlPriceBusd.toNumber(),
  )

  const lastActionInMs = lastUserActionTime && parseInt(lastUserActionTime) * 1000
  const dateTimeLastAction = new Date(lastActionInMs)
  const dateStringToDisplay = dateTimeLastAction.toLocaleString()

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="14px">{`${t('Recent CRYSTL profit')}:`}</Text>
      {hasAutoEarnings && (
        <RecentCrystlProfitBalance
          crystlToDisplay={autoCrystlToDisplay}
          dollarValueToDisplay={autoUsdToDisplay}
          dateStringToDisplay={dateStringToDisplay}
        />
      )}
    </Flex>
  )
}

export default RecentCrystlProfitCountdownRow
