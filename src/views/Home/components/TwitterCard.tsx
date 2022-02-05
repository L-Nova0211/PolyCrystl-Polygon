import React from 'react'
import styled from 'styled-components'
import { Card, Heading, CardBody } from '@crystals/uikit'
import { Timeline } from 'react-twitter-widgets'

const StyledTwitterCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const TwitterCard = () => {
  return (
    <StyledTwitterCard>
      <CardBody>
        <Heading scale="xl" mb="20px" textAlign="center">
          Announcements
        </Heading>
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'CrystlFinance',
          }}
          options={{
            height: '400',
            chrome: 'noheader, nofooter, transparent',
            width: '100%',
            theme: 'dark',
            id: 'profile:CrystlFinance',
          }}
          renderError={() => <p>Could not load timeline.</p>}
        />
      </CardBody>
    </StyledTwitterCard>
  )
}

export default TwitterCard
