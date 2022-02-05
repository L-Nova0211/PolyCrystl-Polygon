import React from 'react'
import styled from 'styled-components'
import { Card } from '@crystals/uikit'
import getImagePath from 'utils/getImagePath'

const StyledFarmStakingCard = styled(Card)`
  background-image: url(${getImagePath('crystl.gif')});
  background-repeat: no-repeat;
  background-size: 175px;
  background-position: center center;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 175px;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`

const WinCard = () => {
  return (
    <StyledFarmStakingCard>
      <></>
    </StyledFarmStakingCard>
  )
}

export default WinCard
