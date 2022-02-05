import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Text, Skeleton } from '@crystals/uikit'
import { Farm } from 'state/types'
import { provider as ProviderType } from 'web3-core'
import { getBscScanAddressUrl } from 'utils/bscscan'
import { useTranslation } from 'contexts/Localization'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import getTokenInfoUrl from 'utils/getTokenInfoUrl'
import getSwapUrl from 'utils/getSwapUrl'
import { getAddress } from 'utils/addressHelpers'
import { formatApy } from 'utils/compoundApyHelpers'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'

export interface FarmWithStakedValue extends Farm {
  apr?: number
  liquidity?: BigNumber
}

const AccentGradient = keyframes`  
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
`

const StyledCardAccent = styled.div`
  background: ${({ theme }) => `linear-gradient(180deg, ${theme.colors.primaryBright}, ${theme.colors.secondary})`};
  background-size: 400% 400%;
  animation: ${AccentGradient} 2s linear infinite;
  border-radius: 32px;
  position: absolute;
  top: -1px;
  right: -1px;
  bottom: -3px;
  left: -1px;
  z-index: -1;
`

const FCard = styled.div<{ isPromotedFarm: boolean }>`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: ${({ theme, isPromotedFarm }) => (isPromotedFarm ? '31px' : theme.radii.card)};
  box-shadow: 0px 1px 4px rgba(25, 19, 38, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBorder};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  crystlPrice?: BigNumber
  provider?: ProviderType
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, removed, crystlPrice, account }) => {
  const { t } = useTranslation()

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  // We assume the token name is coin pair + lp e.g. CRYSTL-MATIC LP, LINK-BNB LP,
  // NAR-CRYSTL LP. The images should be crystl-matic.svg, link-bnb.svg, nar-crystl.svg
  const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase('en-US')

  const totalValueFormatted =
    farm.liquidity && farm.liquidity.gt(0)
      ? `$${farm.liquidity.toNumber().toLocaleString('en-US', { maximumFractionDigits: 0 })}`
      : ''

  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('CRYSTL', 'CRYSTL')
  const earnLabel = farm.dual ? farm.dual.earnLabel : 'CRYSTL'

  const getToken = farm.token.address && getSwapUrl(getAddress(farm.token.address))
  const lpAddress = farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const isPromotedFarm = farm.token.symbol === 'CRYSTL'
  const { projectLink } = farm.token

  const formattedApr = formatApy(farm.apr)

  return (
    <FCard isPromotedFarm={isPromotedFarm}>
      {isPromotedFarm && <StyledCardAccent />}
      <CardHeading
        lpLabel={lpLabel}
        multiplier={farm.multiplier}
        isCommunityFarm={farm.isCommunity}
        farmImage={farmImage}
        tokenSymbol={farm.token.symbol}
        depositFee={farm.depositFee}
      />
      {!removed && (
        <Flex justifyContent="space-between" alignItems="center">
          <Text>{t('APR')}:</Text>
          <Text bold style={{ display: 'flex', alignItems: 'center' }}>
            {farm.apr ? (
              <>
                <ApyButton lpLabel={lpLabel} addLiquidityUrl={getToken} crystlPrice={crystlPrice} apr={farm.apr} />
                {formattedApr}
              </>
            ) : (
              <Skeleton height={24} width={80} />
            )}
          </Text>
        </Flex>
      )}
      <Flex justifyContent="space-between">
        <Text>{t('Earn')}:</Text>
        <Text bold>{earnLabel}</Text>
      </Flex>
      <CardActionsContainer farm={farm} account={account} addLiquidityUrl={getToken} />
      <Divider />
      <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
      />
      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection
          removed={removed}
          bscScanAddress={getBscScanAddressUrl(farm.lpAddresses[process.env.REACT_APP_CHAIN_ID])}
          infoAddress={getTokenInfoUrl(lpAddress)}
          projectLink={projectLink}
          totalValueFormatted={totalValueFormatted}
          lpLabel={lpLabel}
          addLiquidityUrl={getToken}
        />
      </ExpandingWrapper>
    </FCard>
  )
}

export default FarmCard
