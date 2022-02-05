import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import {
  CalculateIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Flex,
  InfoIcon,
  IconButton,
  useMatchBreakpoints,
  useModal,
} from '@crystals/uikit'
import { Vault } from 'state/types'
import { getFullDisplayBalance, getFullDisplayBalancePrice, getAmountUSD, formatNumberKorM } from 'utils/formatBalance'
import UnlockButton from 'components/UnlockButton'
import getLiquidityUrl from 'utils/getLiquidityUrl'
import { WITHDRAWAL_FEE } from 'config'
import CardHeading from './CardHeading'
import CardValue from './CardValue'
import Deposit from '../Actions/Deposit'
import Withdraw from '../Actions/Withdraw'
import Earned from '../Actions/Earned'
import GetLP from '../Actions/GetLP'
import Approval from '../Actions/Approval'
import CardValueApy from './CardValueApy'
import VaultApyCalculatorModal from '../VaultApyCalculatorModal'
import VaultInformationModal from '../../../Vaults/components/VaultInformationModal'

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
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.colors.primaryBright}, ${theme.colors.invertedContrast})`};
  background-size: 600% 600%;
  animation: ${AccentGradient} 2s linear infinite;
  position: absolute;
  border-radius: 30px;
  top: -1px;
  right: -1px;
  bottom: -3px;
  left: -1px;
  z-index: -1;
`
const FlexVaultHolder = styled(Flex)<{ expanded: boolean }>`
  position: relative;
  background: ${(props) => props.theme.card.background};
  box-shadow: 0px 0px 15px ${(props) => props.theme.colors.primaryBright};
  border-radius: 30px;
  width: 100%;
  margin-bottom: 30px;
  transition: linear height 0.1s;

  ${({ theme }) => theme.mediaQueries.lg} {
    height: ${(props) => (props.expanded ? '380px' : '125px')};
  }
`

const FlexCard = styled(Flex)`
  margin-top: 5px;
  border-radius: 30px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 15px;
  }
`

const FlexExpandingWrapper = styled(Flex)`
  width: 100%;
  padding: 5%;
  height: 620px;

  ${({ theme }) => theme.mediaQueries.lg} {
    position: absolute;
    border-radius: 0px 0px 30px 30px;
    margin-top: 125px;
    height: 290px;
    padding-top: 0%;
    padding-bottom: 0%;
    padding-left: 3%;
    padding-right: 3%;
  }
`

const BreakLine = styled.div`
  position: absolute;
  top: 125px;
  align-self: center;
  width: 100%;
  height: 47px;
  border-bottom: 2px solid ${(props) => props.theme.colors.primaryBright};

  ${({ theme }) => theme.mediaQueries.lg} {
    top: 80px;
  }
`
const ActionHolder = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  height: 180px;
  align-items: center;
`

interface VaultCardProps {
  vault: Vault
  crystlPrice?: BigNumber
  account?: string
}

const formatTvl = (rawTvl: string, isMobile: boolean): string => {
  return !isMobile
    ? `$${Number(rawTvl).toLocaleString('en-US', { maximumFractionDigits: 2 })}`
    : `$${formatNumberKorM(Number(rawTvl))[0]}`
}

const VaultCard: React.FC<VaultCardProps> = ({ vault, account }) => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  // We assume the token name is coin pair + lp e.g. CRYSTL-MATIC LP, LINK-BNB LP,
  // NAR-CRYSTL LP. The images should be crystl-matic.svg, link-bnb.svg, nar-crystl.svg
  const withdrawFee = WITHDRAWAL_FEE
  const tokenPrice = new BigNumber(vault.lpTokenPrice).toNumber()
  const vaultImage = vault.lpSymbol.split(' ')[0].toLocaleLowerCase('en-US')
  const lpLabel = vault.lpSymbol && vault.lpSymbol.toUpperCase().replace(' LP', '')
  const tokenBalance = new BigNumber(vault.userData.tokenBalance)
  const stakedBalance = new BigNumber(vault.userData.stakedWantBalance)
  const tokenDisplayBalance = getFullDisplayBalance(tokenBalance)
  const stakedDisplayBalance = getFullDisplayBalance(stakedBalance)
  const balanceUSD = getFullDisplayBalancePrice(tokenBalance, tokenPrice)
  const stakedUSD = new BigNumber(vault.userData.stakedBalanceUSD)
  const stakedDisplayUSD = getAmountUSD(stakedUSD)
  const allowance = new BigNumber(vault.userData.allowance)
  const connected = !!account
  const needsApproval = !allowance || !allowance.isGreaterThan(0)
  const liquidityUrlPathParts = `${vault.quoteTokenAddress}/${vault.tokenAddress}`
  const addLiquidityUrl = getLiquidityUrl(liquidityUrlPathParts, vault.lpLink)
  const projectLink = vault.projectSite
  const farmLink = vault.farmSite
  const initiallyExpanded = stakedBalance.isGreaterThan(0)
  const [showExpandableSection, setShowExpandableSection] = useState(initiallyExpanded)
  const { depositFee } = vault

  const renderEarned = () => {
    if (!connected) return <UnlockButton width="100%" />
    if (needsApproval) {
      return (
        <>
          <div style={{ margin: !isMobile ? '20px 20px' : null }}>
            <Approval vault={vault} />
            <GetLP lpName={vault.lpSymbol} liquidityLink={addLiquidityUrl} />
          </div>
        </>
      )
    }

    return (
      <Earned
        tokenName={lpLabel}
        stakedBalance={vault.userData.stakedWantBalance}
        lpSymbol={vault.lpSymbol}
        liquidityLink={addLiquidityUrl}
      />
    )
  }

  const [onPresentApyModal] = useModal(
    <VaultApyCalculatorModal
      linkLabel={`Get ${lpLabel}`}
      tokenPrice={tokenPrice}
      apys={vault.apys}
      linkHref={addLiquidityUrl}
      earningTokenSymbol={lpLabel}
    />,
  )

  const [onPresentInformationModal] = useModal(
    <VaultInformationModal
      lpAddress={vault.wantAddress}
      projectLink={projectLink}
      farmLink={farmLink}
      lpLabel={lpLabel}
    />,
  )

  const handleClickOpenCalculator = (event): void => {
    event.stopPropagation()
    onPresentApyModal()
  }

  const handleClickOpenInformation = (event): void => {
    event.stopPropagation()
    onPresentInformationModal()
  }

  if (!isMobile) {
    return (
      <FlexVaultHolder expanded={showExpandableSection} flexDirection="column">
        <StyledCardAccent />
        <FlexCard
          onClick={() => setShowExpandableSection(!showExpandableSection)}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex width={400} alignItems="center">
            <CardHeading
              lpLabel={lpLabel}
              vaultImage={vaultImage}
              lpType={vault.lpType}
              tolerance={vault.tolerance}
              farmType={vault.farmType}
            />
          </Flex>
          <Flex width={680} justifyContent="space-between">
            <Flex width={120} justifyContent="center">
              <CardValue amount={stakedDisplayUSD} wording="Staked" />
            </Flex>
            <Flex width={120} justifyContent="center">
              <CardValue amount={formatTvl(vault.totalValueLocked, isMobile)} wording="TVL" />
            </Flex>
            <Flex width={120} justifyContent="center">
              <CardValueApy amount={vault.apys.dailyApy} wording="Daily" />
            </Flex>
            <Flex width={120} justifyContent="center">
              <CardValueApy amount={vault.apys.yearlyApy} wording="Yearly" />
            </Flex>
            <Flex width={70} justifyContent="center" alignItems="center">
              <IconButton onClick={handleClickOpenCalculator} variant="text" scale="sm">
                <CalculateIcon width="22px" />
              </IconButton>
              <IconButton onClick={handleClickOpenInformation} variant="text" scale="sm">
                <InfoIcon width="24px" height="32px" style={{ marginTop: '1px', marginLeft: '10px' }} />
              </IconButton>
            </Flex>
            <Flex width={70} justifyContent="center" alignItems="center">
              {showExpandableSection ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Flex>
          </Flex>
        </FlexCard>
        {showExpandableSection && (
          <>
            <BreakLine />
            <FlexExpandingWrapper flexDirection="column">
              <ActionHolder>
                <Deposit
                  pid={vault.pid}
                  tokenBalance={tokenDisplayBalance}
                  tokenPrice={tokenPrice}
                  balanceUSD={balanceUSD}
                  needsApproval={needsApproval}
                  paused={vault.paused}
                  depositFee={depositFee}
                />
                {renderEarned()}
                <Withdraw
                  pid={vault.pid}
                  stakedBalance={stakedDisplayBalance}
                  stakedUSD={stakedDisplayUSD}
                  withdrawFee={withdrawFee}
                  needsApproval={needsApproval}
                  tokenPrice={tokenPrice}
                  paused={vault.paused}
                />
              </ActionHolder>
            </FlexExpandingWrapper>
          </>
        )}
      </FlexVaultHolder>
    )
  }

  return (
    <FlexVaultHolder expanded={showExpandableSection} flexDirection="column">
      <StyledCardAccent />
      <FlexCard onClick={() => setShowExpandableSection(!showExpandableSection)} flexDirection="column">
        <Flex alignItems="center">
          <CardHeading
            lpLabel={lpLabel}
            vaultImage={vaultImage}
            lpType={vault.lpType}
            tolerance={vault.tolerance}
            farmType={vault.farmType}
          />
        </Flex>
        <Flex alignItems="center" justifyContent="space-evenly">
          <Flex width={100} justifyContent="center">
            <CardValue amount={stakedDisplayUSD} wording="Staked" />
          </Flex>
          <Flex width={100} justifyContent="center">
            <CardValue amount={formatTvl(vault.totalValueLocked, isMobile)} wording="TVL" />
          </Flex>
          <Flex width={100} justifyContent="center">
            <CardValueApy amount={vault.apys.dailyApy} wording="Daily" />
          </Flex>
          <Flex width={100} justifyContent="center">
            <CardValueApy amount={vault.apys.yearlyApy} wording="Yearly" />
          </Flex>
          <Flex width={50} justifyContent="center" alignItems="center">
            <IconButton onClick={handleClickOpenCalculator} variant="text" scale="sm">
              <CalculateIcon width="22px" />
            </IconButton>
            <IconButton onClick={handleClickOpenInformation} variant="text" scale="sm">
              <InfoIcon width="24px" height="32px" style={{ marginLeft: '10px', marginRight: '15px' }} />
            </IconButton>
          </Flex>
        </Flex>

        <Flex alignSelf="center">{showExpandableSection ? <ChevronUpIcon /> : <ChevronDownIcon />}</Flex>
      </FlexCard>
      {showExpandableSection && (
        <>
          <BreakLine onClick={() => setShowExpandableSection(!showExpandableSection)} />
          <FlexExpandingWrapper flexDirection="column" justifyContent="space-between">
            {renderEarned()}
            <Deposit
              pid={vault.pid}
              tokenBalance={tokenDisplayBalance}
              tokenPrice={tokenPrice}
              balanceUSD={balanceUSD}
              needsApproval={needsApproval}
              paused={vault.paused}
              depositFee={depositFee}
            />
            <Withdraw
              pid={vault.pid}
              stakedBalance={stakedDisplayBalance}
              stakedUSD={stakedDisplayUSD}
              withdrawFee={withdrawFee}
              needsApproval={needsApproval}
              tokenPrice={tokenPrice}
              paused={vault.paused}
            />
          </FlexExpandingWrapper>
        </>
      )}
    </FlexVaultHolder>
  )
}

export default VaultCard
