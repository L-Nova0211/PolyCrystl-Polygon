import React from 'react'
import { Flex, Text, IconButton, AddIcon, MinusIcon, useModal, Skeleton } from '@crystals/uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { Pool } from 'state/types'
import { useCrystlVault, usePriceCrystlBusd } from 'state/hooks'
import Balance from 'components/Balance'
import NotEnoughTokensModal from '../../PoolCard/Modals/NotEnoughTokensModal'
import { convertSharesToCrystl } from '../../../helpers'
import VaultStakeModal from '../VaultStakeModal'

interface HasStakeActionProps {
  pool: Pool
  stakingTokenBalance: BigNumber
}

const HasSharesActions: React.FC<HasStakeActionProps> = ({ pool, stakingTokenBalance }) => {
  const {
    userData: { userShares },
    pricePerFullShare,
  } = useCrystlVault()
  const { stakingToken } = pool
  const { crystlAsBigNumber, crystlAsNumberBalance } = convertSharesToCrystl(userShares, pricePerFullShare)
  const crystlPriceBusd = usePriceCrystlBusd()
  const stakedDollarValue = crystlPriceBusd.gt(0)
    ? getBalanceNumber(crystlAsBigNumber.multipliedBy(crystlPriceBusd), stakingToken.decimals)
    : 0

  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal token={stakingToken} />)
  const [onPresentStake] = useModal(<VaultStakeModal stakingMax={stakingTokenBalance} pool={pool} />)
  const [onPresentUnstake] = useModal(<VaultStakeModal stakingMax={crystlAsBigNumber} pool={pool} isRemovingStake />)

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex flexDirection="column">
        <Balance fontSize="20px" bold value={crystlAsNumberBalance} decimals={5} />
        <Text fontSize="12px" color="textSubtle">
          {crystlPriceBusd.gt(0) ? (
            <Balance value={stakedDollarValue} fontSize="12px" color="textSubtle" decimals={2} prefix="~" unit=" USD" />
          ) : (
            <Skeleton mt="1px" height={16} width={64} />
          )}
        </Text>
      </Flex>
      <Flex>
        <IconButton variant="secondary" onClick={onPresentUnstake} mr="6px">
          <MinusIcon color="primary" width="24px" />
        </IconButton>
        <IconButton variant="secondary" onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}>
          <AddIcon color="primary" width="24px" height="24px" />
        </IconButton>
      </Flex>
    </Flex>
  )
}

export default HasSharesActions
