import React from 'react'
import styled from 'styled-components'
import { Link } from '@crystals/uikit'

const StyledLink = styled(Link)`
  margin-right: 16px;
  display: flex;
  justify-content: flex-end;

  &:hover {
    text-decoration: none;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1;
  }
`

const HelpButton = () => {
  return (
    <StyledLink>
      <></>
    </StyledLink>
  )
}

export default HelpButton
