import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton, Text } from '@crystals/uikit'
import max from 'lodash/max'
import { NavLink } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { useFarms, usePriceCrystlBusd } from 'state/hooks'
import { fetchFarmsPublicDataAsync, nonArchivedFarms } from 'state/farms'
import { getFarmApr } from 'utils/apr'
import CardValue from './CardValue'

const StyledFarmStakingCard = styled(Card)`
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
const EarnAPRFarmCard = () => {
  const [isFetchingFarmData, setIsFetchingFarmData] = useState(true)
  const { t } = useTranslation()
  const { data: farmsLP } = useFarms()
  const crystlPrice = usePriceCrystlBusd()
  const dispatch = useAppDispatch()

  // Fetch farm data once to get the max APR
  useEffect(() => {
    const fetchFarmData = async () => {
      try {
        await dispatch(fetchFarmsPublicDataAsync(nonArchivedFarms.map((nonArchivedFarm) => nonArchivedFarm.pid)))
      } finally {
        setIsFetchingFarmData(false)
      }
    }

    fetchFarmData()
  }, [dispatch, setIsFetchingFarmData])

  const highestApr = useMemo(() => {
    if (crystlPrice.gt(0)) {
      const aprs = farmsLP.map((farm) => {
        // Filter inactive farms, because their theoretical APR is super high. In practice, it's 0.
        if (
          farm.pid !== 0 &&
          !farm.single &&
          farm.multiplier !== '0X' &&
          farm.lpTotalInQuoteToken &&
          farm.quoteToken.busdPrice
        ) {
          const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
          return getFarmApr(new BigNumber(farm.poolWeight), crystlPrice, totalLiquidity)
        }
        return null
      })

      const maxApr = max(aprs)
      return maxApr?.toLocaleString('en-US', { maximumFractionDigits: 2 })
    }
    return null
  }, [crystlPrice, farmsLP])

  const aprText = highestApr || '-'
  const earnAprText = t('Earn up to %highestApr% APR in Farms', { highestApr: aprText })
  const [earnUpTo, InFarms] = earnAprText.split(aprText)
  const highestAprNumber = Number(highestApr)

  return (
    <StyledFarmStakingCard>
      <NavLink exact activeClassName="active" to="/farms" id="tvl-cta">
        <CardBody>
          <Heading color="contrast" scale="lg" mb="24px">
            {earnUpTo}
          </Heading>
          {highestApr && !isFetchingFarmData ? (
            <>
              <CardValue value={highestAprNumber} suffix="%" decimals={2} />
              <Flex justifyContent="space-between">
                <Text color="textSubtle">{InFarms}</Text>
                <ArrowForwardIcon mt={30} color="primary" />
              </Flex>
            </>
          ) : (
            <Skeleton animation="pulse" variant="rect" height="44px" />
          )}
        </CardBody>
      </NavLink>
    </StyledFarmStakingCard>
  )
}

export default EarnAPRFarmCard
