import React from 'react'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex, Box } from '@crystals/uikit'
import { useTranslation } from 'contexts/Localization'
import { tokenEarnedPerThousandDollarsCompoundingVaults, formatApy } from 'utils/compoundApyHelpers'
import { DAILY_COMPOUND_FREQUENCY, PERFORMANCE_FEE } from 'config'
import { VaultApy } from 'state/types'

interface VaultApyCalculatorModalProps {
  onDismiss?: () => void
  tokenPrice: number
  apys: VaultApy
  linkLabel: string
  linkHref: string
  earningTokenSymbol?: string
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

const VaultApyCalculatorModal: React.FC<VaultApyCalculatorModalProps> = ({
  onDismiss,
  tokenPrice,
  apys,
  linkLabel,
  linkHref,
  earningTokenSymbol = 'CRYSTL',
  compoundFrequency = DAILY_COMPOUND_FREQUENCY,
  performanceFee = PERFORMANCE_FEE,
}) => {
  const { t } = useTranslation()

  const tokenEarnedPerThousand1D = tokenEarnedPerThousandDollarsCompoundingVaults(apys.dailyApy, tokenPrice)
  const tokenEarnedPerThousand7D = tokenEarnedPerThousandDollarsCompoundingVaults(apys.weeklyApy, tokenPrice)
  const tokenEarnedPerThousand30D = tokenEarnedPerThousandDollarsCompoundingVaults(apys.monthlyApy, tokenPrice)
  const tokenEarnedPerThousand365D = tokenEarnedPerThousandDollarsCompoundingVaults(apys.yearlyApy, tokenPrice)

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
            {t('APY')}
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
            {formatApy(apys.dailyApy)}
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
            {formatApy(apys.weeklyApy)}
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
            {formatApy(apys.monthlyApy)}
          </Text>
        </GridItem>
        <GridItem>
          <Text>{tokenEarnedPerThousand30D}</Text>
        </GridItem>
        {/* 365 day / APY row */}
        <GridItem style={{ maxWidth: '180px' }}>
          <Text>{t('365d')}</Text>
        </GridItem>
        <GridItem>
          <Text mr="12px" ml="12px">
            {formatApy(apys.yearlyApy)}
          </Text>
        </GridItem>
        <GridItem>
          <Text>{tokenEarnedPerThousand365D}</Text>
        </GridItem>
      </Grid>
      <Flex justifyContent="stretch">
        <Box mb="28px" maxWidth="340px">
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

export default VaultApyCalculatorModal
