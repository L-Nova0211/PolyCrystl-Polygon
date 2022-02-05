import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import {
  Flex,
  MetamaskIcon,
  Text,
  TooltipText,
  LinkExternal,
  TimerIcon,
  Skeleton,
  useTooltip,
  Button,
  Link,
} from '@crystals/uikit'
import { BASE_BSC_SCAN_URL, BASE_URL } from 'config'
import { useBlock, useCrystlVault } from 'state/hooks'
import { Pool } from 'state/types'
import { getAddress, getCrystlVaultAddress } from 'utils/addressHelpers'
import { registerToken } from 'utils/wallet'
import Balance from 'components/Balance'
import { getPoolBlockInfo } from 'views/Pools/helpers'
import { getBscScanBlockCountdownUrl } from 'utils/bscscan'

interface ExpandedFooterProps {
  pool: Pool
  account: string
}

const ExpandedWrapper = styled(Flex)`
  svg {
    height: 14px;
    width: 14px;
  }
`

const ExpandedFooter: React.FC<ExpandedFooterProps> = ({ pool, account }) => {
  const { t } = useTranslation()
  const { currentBlock } = useBlock()
  const {
    totalCrystlInVault,
    fees: { performanceFee },
  } = useCrystlVault()

  const { stakingToken, earningToken, totalStaked, contractAddress, sousId, isAutoVault, startBlock, endBlock } = pool

  const tokenAddress = earningToken.address ? getAddress(earningToken.address) : ''
  const poolContractAddress = getAddress(contractAddress)
  const crystlVaultContractAddress = getCrystlVaultAddress()
  const imageSrc = `${BASE_URL}/images/tokens/${earningToken.symbol.toLowerCase()}.png`
  const isMetaMaskInScope = !!(window as WindowChain).ethereum?.isMetaMask
  const isManualCrystlPool = sousId === 0

  const { shouldShowBlockCountdown, blocksUntilStart, blocksRemaining, hasPoolStarted, blocksToDisplay } =
    getPoolBlockInfo(pool, currentBlock)

  const blockLink = hasPoolStarted ? getBscScanBlockCountdownUrl(endBlock) : getBscScanBlockCountdownUrl(startBlock)

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Subtracted automatically from each yield harvest and burned.'),
    { placement: 'bottom-start' },
  )

  const getTotalStakedBalance = () => {
    if (isAutoVault) {
      return getBalanceNumber(totalCrystlInVault, stakingToken.decimals)
    }
    if (isManualCrystlPool) {
      const manualCrystlTotalMinusAutoVault = new BigNumber(totalStaked).minus(totalCrystlInVault)
      return getBalanceNumber(manualCrystlTotalMinusAutoVault, stakingToken.decimals)
    }
    return getBalanceNumber(totalStaked, stakingToken.decimals)
  }

  return (
    <ExpandedWrapper flexDirection="column">
      <Flex mb="2px" justifyContent="space-between" alignItems="center">
        <Text small>{t('Total staked')}:</Text>
        <Flex alignItems="flex-start">
          {totalStaked ? (
            <>
              <Balance fontSize="14px" value={getTotalStakedBalance()} />
              <Text ml="4px" fontSize="14px">
                {stakingToken.symbol}
              </Text>
            </>
          ) : (
            <Skeleton width="90px" height="21px" />
          )}
        </Flex>
      </Flex>
      {shouldShowBlockCountdown && (
        <Flex mb="2px" justifyContent="space-between" alignItems="center">
          <Text small>{hasPoolStarted ? t('End') : t('Start')}:</Text>
          <Flex alignItems="center">
            <Link external href={blockLink}>
              {blocksRemaining || blocksUntilStart ? (
                <Balance color="primary" fontSize="14px" value={blocksToDisplay} decimals={0} />
              ) : (
                <Skeleton width="54px" height="21px" />
              )}
              <Text ml="4px" color="primary" small textTransform="lowercase">
                {t('Blocks')}
              </Text>
              <TimerIcon ml="4px" color="primary" />
            </Link>
          </Flex>
        </Flex>
      )}
      {isAutoVault && (
        <Flex mb="2px" justifyContent="space-between" alignItems="center">
          {tooltipVisible && tooltip}
          <TooltipText ref={targetRef} small>
            {t('Performance Fee')}
          </TooltipText>
          <Flex alignItems="center">
            <Text ml="4px" small>
              {performanceFee / 100}%
            </Text>
          </Flex>
        </Flex>
      )}
      <Flex mb="2px" justifyContent="flex-end">
        <LinkExternal bold={false} small href={earningToken.projectLink}>
          {t('View Project Site')}
        </LinkExternal>
      </Flex>
      {poolContractAddress && (
        <Flex mb="2px" justifyContent="flex-end">
          <LinkExternal
            bold={false}
            small
            href={`${BASE_BSC_SCAN_URL}/address/${isAutoVault ? crystlVaultContractAddress : poolContractAddress}`}
          >
            {t('View Contract')}
          </LinkExternal>
        </Flex>
      )}
      {account && isMetaMaskInScope && tokenAddress && (
        <Flex justifyContent="flex-end">
          <Button
            variant="text"
            p="0"
            height="auto"
            onClick={() => registerToken(tokenAddress, earningToken.symbol, earningToken.decimals, imageSrc)}
          >
            <Text color="primary" fontSize="14px">
              {t('Add to Metamask')}
            </Text>
            <MetamaskIcon ml="4px" />
          </Button>
        </Flex>
      )}
    </ExpandedWrapper>
  )
}

export default React.memo(ExpandedFooter)
