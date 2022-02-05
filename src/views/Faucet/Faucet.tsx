import { BaseLayout, FaucetLogo } from '@crystals/uikit'
import Page from 'components/layout/Page'
import PageHeader from 'components/PageHeader'
import React from 'react'
import styled from 'styled-components'
import ClaimMaticCard from 'views/Faucet/components/ClaimMaticCard'
import TwitterCard from 'views/Home/components/TwitterCard'

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 24px;
  margin-top: 16px;
  grid-gap: 24px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 32px;
    grid-gap: 32px;

    & > div {
      grid-column: span 6;
    }
  }
`

const Faucet: React.FC = () => {
  return (
    <Page>
      <PageHeader>
        <FaucetLogo />
      </PageHeader>
      <Cards>
        <ClaimMaticCard />
        <TwitterCard />
      </Cards>
    </Page>
  )
}

export default Faucet
