import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Text } from '@crystals/uikit'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import { useVaultsV2 } from 'state/hooks'
import { formatApy } from 'utils/compoundApyHelpers'

const StyledVaultStakingCard = styled(Card)`
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

const HighestApr: React.FC = () => {
  const { t } = useTranslation()
  const { data: vaults } = useVaultsV2()
  const highestApy = useMemo(() => {
    return vaults.reduce((acc, vault) => {
      return vault.paused || acc > vault.apys.yearlyApy ? acc : vault.apys.yearlyApy
    }, 0)
  }, [vaults])

  return (
    <>
      <Heading color="contrast" scale="lg">
        {t('Earn Exponential interest up to')}
      </Heading>
      <Text fontSize="40px" lineHeight="1.5" bold fontWeight="100" textTransform="uppercase" color="invertedContrast">
        {formatApy(highestApy)} APY
      </Text>
    </>
  )
}

const EarnVaultCard = () => {
  const { isInitialized } = useVaultsV2()
  const { t } = useTranslation()
  return (
    <StyledVaultStakingCard>
      <NavLink exact activeClassName="active" to="/vaults-v2" id="vault-cta">
        <CardBody>
          {isInitialized ? (
            <HighestApr />
          ) : (
            <>
              <Heading color="contrast" scale="lg">
                {t('Earn Exponential interest with')}
              </Heading>
              <Text
                fontSize="40px"
                lineHeight="1.5"
                bold
                fontWeight="100"
                textTransform="uppercase"
                color="invertedContrast"
              >
                {t('Huge APY')}
              </Text>
            </>
          )}
          <Flex justifyContent="space-between">
            <Heading color="contrast" scale="lg">
              {t('on Crystl Vaults!')}
            </Heading>
            <StyledArrowForwardIcon mt={30} color="primary" />
          </Flex>
        </CardBody>
      </NavLink>
    </StyledVaultStakingCard>
  )
}

export default EarnVaultCard
