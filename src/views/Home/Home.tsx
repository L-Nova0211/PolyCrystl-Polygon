import React from 'react'
import styled from 'styled-components'
import { BaseLayout } from '@crystals/uikit'
import { usePollVaultData, usePollVaultV2Data, usePollFarmsData } from 'state/hooks'
import Page from 'components/layout/Page'
import HomepagePolygonLogo from 'components/Logos/HomepagePolygonLogo'
import TwitterCard from 'views/Home/components/TwitterCard'
import CrystlStats from 'views/Home/components/CrystlStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnVaultCard from './components/EarnVaultCard'

const Hero = styled.div`
  align-items: center;
  background-size: 135px;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  text-align: center;
  animation: floating 3.4s infinite normal ease;
  @keyframes floating {
    0% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(0px, 8px);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }

  ${({ theme }) => theme.mediaQueries.xs} {
    svg {
      width: 92%;
      margin-bottom: 18px;
    }

    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    svg {
      width: 50%;
      margin-bottom: 32px;
    }

    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    svg {
      width: 42.5%;
      margin-bottom: 30px;
    }
  }
`

const Cards = styled(BaseLayout)`
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 24px;
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

const Home: React.FC = () => {
  usePollVaultData(true)
  usePollVaultV2Data(true)
  usePollFarmsData()
  return (
    <Page>
      <Hero>
        <HomepagePolygonLogo />
      </Hero>
      <div>
        <Cards>
          <EarnVaultCard />
          <TotalValueLockedCard />
        </Cards>
        <Cards>
          <TwitterCard />
          <CrystlStats />
        </Cards>
      </div>
    </Page>
  )
}

export default Home
