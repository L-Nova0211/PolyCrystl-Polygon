import React, { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Card, CardBody, Text, Flex, Button, Heading, Skeleton, useModal } from '@crystals/uikit'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { useCrystlVault, usePriceCrystlBusd } from 'state/hooks'
import Balance from 'components/Balance'
import BountyModal from './BountyModal'

const StyledCard = styled(Card)`
  width: 100%;
  flex: 1;
  margin-bottom: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 240px;
    max-width: 240px;
    margin-left: auto;
  }
`

const BountyCard = () => {
  const { t } = useTranslation()
  const {
    estimatedCrystlBountyReward,
    totalPendingCrystlHarvest,
    fees: { callFee },
  } = useCrystlVault()
  const crystlPriceBusd = usePriceCrystlBusd()

  const estimatedDollarBountyReward = useMemo(() => {
    return new BigNumber(estimatedCrystlBountyReward).multipliedBy(crystlPriceBusd)
  }, [crystlPriceBusd, estimatedCrystlBountyReward])

  const hasFetchedDollarBounty = estimatedDollarBountyReward.gte(0)
  const hasFetchedCrystlBounty = estimatedCrystlBountyReward ? estimatedCrystlBountyReward.gte(0) : false
  const dollarBountyToDisplay = hasFetchedDollarBounty ? getBalanceNumber(estimatedDollarBountyReward, 18) : 0
  const crystlBountyToDisplay = hasFetchedCrystlBounty ? getBalanceNumber(estimatedCrystlBountyReward, 18) : 0

  const TooltipComponent = () => (
    <>
      <Text mb="16px">{t('This bounty is given as a reward for providing a service to other users.')}</Text>
      <Text mb="16px">
        {t(
          'Whenever you successfully claim the bounty, you’re also helping out by activating the Auto CRYSTL Pool’s compounding function for everyone.',
        )}
      </Text>
      <Text style={{ fontWeight: 'bold' }}>
        {t('Auto-Compound Bounty: %fee%% of all Auto CRYSTL pool users pending yield', { fee: callFee / 100 })}
      </Text>
    </>
  )

  const [onPresentBountyModal] = useModal(
    <BountyModal
      crystlBountyToDisplay={crystlBountyToDisplay}
      dollarBountyToDisplay={dollarBountyToDisplay}
      totalPendingCrystlHarvest={totalPendingCrystlHarvest}
      callFee={callFee}
      TooltipComponent={TooltipComponent}
    />,
  )

  return (
    <>
      <StyledCard>
        <CardBody>
          <Flex flexDirection="column">
            <Flex alignItems="center" mb="12px">
              <Text fontSize="16px" bold color="textSubtle" mr="4px">
                {t('Auto CRYSTL Bounty')}
              </Text>
            </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex flexDirection="column" mr="12px">
              <Heading>
                {hasFetchedCrystlBounty ? (
                  <Balance fontSize="20px" bold value={crystlBountyToDisplay} decimals={3} />
                ) : (
                  <Skeleton height={20} width={96} mb="2px" />
                )}
              </Heading>
              {hasFetchedDollarBounty ? (
                <Balance
                  fontSize="12px"
                  color="textSubtle"
                  value={dollarBountyToDisplay}
                  decimals={2}
                  unit=" USD"
                  prefix="~"
                />
              ) : (
                <Skeleton height={16} width={62} />
              )}
            </Flex>
            <Button
              disabled={!dollarBountyToDisplay || !crystlBountyToDisplay || !callFee}
              onClick={onPresentBountyModal}
              scale="sm"
            >
              {t('Claim')}
            </Button>
          </Flex>
        </CardBody>
      </StyledCard>
    </>
  )
}

export default BountyCard
