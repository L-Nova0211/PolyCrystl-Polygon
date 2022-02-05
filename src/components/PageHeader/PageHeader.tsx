import React from 'react'
import styled from 'styled-components'
import { Box } from '@crystals/uikit'
import Container from '../layout/Container'

const Inner = styled(Container)`
  display: flex;
  flex-direction: column;
  padding-left: 0;
  padding-right: 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0 0 16px 0;
    padding-left: 0;
    padding-right: 0;

    > svg {
      width: 100%;
    }

    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;

    > svg {
      width: 50%;
    }
  }
`

const PageHeader: React.FC = ({ children }) => (
  <Box>
    <Inner>{children}</Inner>
  </Box>
)

export default PageHeader
