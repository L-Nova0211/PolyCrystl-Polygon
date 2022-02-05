import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text, Flex, ArrowForwardIcon } from '@crystals/uikit'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import { useTotalValue } from 'state/hooks'
import { getCrystlAddress } from 'utils/addressHelpers'
import getTokenInfoUrl from 'utils/getTokenInfoUrl'
import CardValue from './CardValue'

const StyledTotalValueLockedCard = styled(Card)`
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

const TotalValueLockedCard = () => {
  const { t } = useTranslation()
  const data = useTotalValue()
  const tvl = data

  return (
    <StyledTotalValueLockedCard>
      <NavLink
        exact
        activeClassName="active"
        to={{ pathname: getTokenInfoUrl(getCrystlAddress()) }}
        target="_blank"
        id="farm-apr-cta"
      >
        <CardBody>
          <Heading color="contrast" scale="lg" mb="24px">
            {t('Total Value Locked (TVL)')}
          </Heading>
          {data ? (
            <>
              <CardValue value={tvl.toNumber()} prefix="$" decimals={2} />
              <Flex justifyContent="space-between">
                <Text color="textSubtle">{t('Across all LPs and CRYSTL Pools')}</Text>
                <StyledArrowForwardIcon mt={30} color="primary" />
              </Flex>
            </>
          ) : (
            <Skeleton animation="pulse" variant="rect" height="44px" />
          )}
        </CardBody>
      </NavLink>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
