import React from 'react'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex, Box } from '@crystals/uikit'
import { useTranslation } from 'contexts/Localization'
import { tokenEarnedPerThousandDollarsCompounding, getRoi, formatApy } from 'utils/compoundApyHelpers'

interface ApyCalculatorModalProps {
  onDismiss?: () => void
  tokenPrice: number
  apr: number
  linkLabel: string
  linkHref: string
  earningTokenSymbol?: string
  roundingDecimals?: number
  compoundFrequency?: number
  performanceFee?: number
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 12px;
`

const GridItem = styled.div``

const GridHeaderItem = styled.div`
  max-width: 180px;
`

const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = ({
  onDismiss,
  tokenPrice,
  apr,
  linkLabel,
  linkHref,
  earningTokenSymbol = 'CRYSTL',
  roundingDecimals = 2,
  compoundFrequency = 1,
  performanceFee = 0,
}) => {
  const { t } = useTranslation()
  const oneThousandDollarsWorthOfToken = 1000 / tokenPrice

  const tokenEarnedPerThousand1D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 1,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })
  const tokenEarnedPerThousand7D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 7,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })
  const tokenEarnedPerThousand30D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 30,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })
  const tokenEarnedPerThousand365D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 365,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })

  const apy1D = formatApy(
    getRoi({ amountEarned: tokenEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfToken }),
    roundingDecimals,
  )
  const apy7D = formatApy(
    getRoi({ amountEarned: tokenEarnedPerThousand7D, amountInvested: oneThousandDollarsWorthOfToken }),
    roundingDecimals,
  )
  const apy30D = formatApy(
    getRoi({ amountEarned: tokenEarnedPerThousand30D, amountInvested: oneThousandDollarsWorthOfToken }),
    roundingDecimals,
  )
  const apy365D = formatApy(
    getRoi({ amountEarned: tokenEarnedPerThousand365D, amountInvested: oneThousandDollarsWorthOfToken }),
    roundingDecimals,
  )

  return (
    <Modal title={t('ROI')} onDismiss={onDismiss}>
      <Grid>
        <GridHeaderItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="12px">
            {t('Timeframe')}
          </Text>
        </GridHeaderItem>
        <GridHeaderItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mr="12px" ml="12px" mb="12px">
            {t('ROI')}
          </Text>
        </GridHeaderItem>
        <GridHeaderItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="12px">
            {t('%symbol% per $1,000', { symbol: earningTokenSymbol })}
          </Text>
        </GridHeaderItem>
        {/* 1 day row */}
        <GridItem>
          <Text>{t('%num%d', { num: 1 })}</Text>
        </GridItem>
        <GridItem>
          <Text mr="12px" ml="12px">
            {apy1D}
          </Text>
        </GridItem>
        <GridItem>
          <Text>{tokenEarnedPerThousand1D}</Text>
        </GridItem>
        {/* 7 day row */}
        <GridItem>
          <Text>{t('%num%d', { num: 7 })}</Text>
        </GridItem>
        <GridItem>
          <Text mr="12px" ml="12px">
            {apy7D}
          </Text>
        </GridItem>
        <GridItem>
          <Text>{tokenEarnedPerThousand7D}</Text>
        </GridItem>
        {/* 30 day row */}
        <GridItem>
          <Text>{t('%num%d', { num: 30 })}</Text>
        </GridItem>
        <GridItem>
          <Text mr="12px" ml="12px">
            {apy30D}
          </Text>
        </GridItem>
        <GridItem>
          <Text>{tokenEarnedPerThousand30D}</Text>
        </GridItem>
        {/* 365 day / APY row */}
        <GridItem style={{ maxWidth: '180px' }}>
          <Text>{t('365d(APY)')}</Text>
        </GridItem>
        <GridItem>
          <Text mr="12px" ml="12px">
            {apy365D}
          </Text>
        </GridItem>
        <GridItem>
          <Text>{tokenEarnedPerThousand365D}</Text>
        </GridItem>
      </Grid>
      <Flex justifyContent="center">
        <Box mb="28px" maxWidth="280px">
          <Text fontSize="12px" textAlign="center" color="textSubtle">
            {t(
              'Calculated based on current rates. Compounding %freq%x daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.',
              { freq: compoundFrequency.toLocaleString('en-US') },
            )}
          </Text>
          {performanceFee > 0 && (
            <Text mt="14px" fontSize="12px" textAlign="center" color="textSubtle">
              {t('All estimated rates take into account this pool’s %fee%% performance fee', { fee: performanceFee })}
            </Text>
          )}
        </Box>
      </Flex>
      <Flex justifyContent="center">
        <LinkExternal href={linkHref}>{linkLabel}</LinkExternal>
      </Flex>
    </Modal>
  )
}

export default ApyCalculatorModal
