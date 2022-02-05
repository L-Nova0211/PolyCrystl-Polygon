import React from 'react'
import styled from 'styled-components'
import { Text, useMatchBreakpoints } from '@crystals/uikit'
import { Pool } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import BaseCell, { CellContent } from './BaseCell'
import Apr from '../Apr'

interface AprCellProps {
  pool: Pool
  performanceFee: number
}

const StyledCell = styled(BaseCell)`
  flex: 1 0 40px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex: 1 0 70px;
  }
`

const AprCell: React.FC<AprCellProps> = ({ pool, performanceFee }) => {
  const { t } = useTranslation()
  const { isXs, isSm } = useMatchBreakpoints()
  const { isAutoVault } = pool
  return (
    <StyledCell role="cell">
      <CellContent>
        <Text fontSize="12px" color="textSubtle" textAlign="left">
          {isAutoVault ? t('APY') : t('APR')}
        </Text>
        <Apr
          pool={pool}
          performanceFee={isAutoVault ? performanceFee : 0}
          showIcon={!isXs && !isSm}
          alignItems="flex-start"
        />
      </CellContent>
    </StyledCell>
  )
}

export default AprCell
