import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Text } from '@crystals/uikit'
import max from 'lodash/max'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { useAllPools, usePriceCrystlBusd, useBlock } from 'state/hooks'
import { fetchPoolsPublicDataAsync } from 'state/pools'
import CardValue from './CardValue'

const StyledFarmStakingCard = styled(Card)`
  background: linear-gradient(#53dee9, #7645d9);
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }

  transition: opacity 200ms;
  &:hover {
    opacity: 0.65;
  }
`

const StyledArrowForwardIcon = styled(ArrowForwardIcon)`
  position: absolute;
  bottom: 10%;
  right: 5%;
`

const EarnFarmCard = () => {
  const [isFetchingPoolData, setIsFetchingPoolData] = useState(true)
  const allPools = useAllPools()
  const crystlPrice = usePriceCrystlBusd()
  const currentBlock = useBlock()
  const dispatch = useAppDispatch()

  // Fetch pool data once to get the max APR
  useEffect(() => {
    const fetchPoolData = async () => {
      try {
        await dispatch(fetchPoolsPublicDataAsync(currentBlock.currentBlock))
      } finally {
        setIsFetchingPoolData(false)
      }
    }
    fetchPoolData()
  }, [dispatch, setIsFetchingPoolData, currentBlock])

  const highestApr = useMemo(() => {
    if (crystlPrice.gt(0)) {
      const aprs = allPools.map((pool) => {
        // Filter finished pools, because their theoretical APR is super high. In practice, it's 0.
        if (pool.sousId !== 0 && pool.isFinished !== true) {
          return pool.apr
        }
        return null
      })

      const maxApr = max(aprs)
      return maxApr?.toLocaleString('en-US', { maximumFractionDigits: 2 })
    }
    return null
  }, [crystlPrice, allPools])

  const { t } = useTranslation()
  const highestAprNumber = Number(highestApr)

  return (
    <StyledFarmStakingCard>
      <NavLink exact activeClassName="active" to="/pools" id="pool-cta">
        <CardBody>
          {highestAprNumber && !isFetchingPoolData ? (
            <>
              <Heading color="contrast" scale="lg">
                {t('Earn up to')}
              </Heading>
              <CardValue
                value={highestAprNumber}
                suffix={t('% APR')}
                decimals={2}
                color="invertedContrast"
                lineHeight="1.5"
              />
            </>
          ) : (
            <>
              <Heading color="contrast" scale="lg">
                {t('Earn')}
              </Heading>
              <Text
                fontSize="40px"
                lineHeight="1.5"
                bold
                fontWeight="100"
                textTransform="uppercase"
                color="invertedContrast"
              >
                {t('Huge APR')}
              </Text>
            </>
          )}
          <Flex justifyContent="space-between">
            <Heading color="contrast" scale="lg">
              {t('In CRYSTL, ETH, BTC, & USDT Pools!')}
            </Heading>
            <StyledArrowForwardIcon mt={30} color="primary" />
          </Flex>
        </CardBody>
      </NavLink>
    </StyledFarmStakingCard>
  )
}

export default EarnFarmCard
