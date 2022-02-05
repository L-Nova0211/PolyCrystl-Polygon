import React from 'react'
import styled from 'styled-components'
import ApyButton from 'views/Farms/components/FarmCard/ApyButton'
import { Address } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import getLiquidityUrl from 'utils/getLiquidityUrl'
import { Skeleton } from '@crystals/uikit'
import { formatApy } from 'utils/compoundApyHelpers'

export interface AprProps {
  value?: string
  multiplier: string
  lpLabel: string
  tokenAddress?: Address
  quoteTokenAddress?: Address
  crystlPrice: BigNumber
  originalValue: number
  hideButton?: boolean
}

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};

  button {
    width: 20px;
    height: 20px;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.textSubtle};
      }
    }
  }
`

const AprWrapper = styled.div`
  min-width: 60px;
  text-align: left;
`

const Apr: React.FC<AprProps> = ({
  lpLabel,
  tokenAddress,
  quoteTokenAddress,
  crystlPrice,
  originalValue,
  hideButton = false,
}) => {
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddress, tokenAddress })
  const addLiquidityUrl = getLiquidityUrl(liquidityUrlPathParts)

  const formattedApr = formatApy(originalValue)

  return originalValue !== 0 ? (
    <Container>
      {originalValue ? (
        <>
          <AprWrapper>{formattedApr}</AprWrapper>
          {!hideButton && (
            <ApyButton
              lpLabel={lpLabel}
              crystlPrice={crystlPrice}
              apr={originalValue}
              addLiquidityUrl={addLiquidityUrl}
            />
          )}
        </>
      ) : (
        <AprWrapper>
          <Skeleton width={60} />
        </AprWrapper>
      )}
    </Container>
  ) : (
    <Container>
      <AprWrapper>{originalValue}%</AprWrapper>
    </Container>
  )
}

export default Apr
