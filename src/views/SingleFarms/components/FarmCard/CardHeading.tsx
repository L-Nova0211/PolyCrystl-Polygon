import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image } from '@crystals/uikit'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  farmImage?: string
  tokenSymbol?: string
  depositFee?: string
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({ lpLabel, multiplier, farmImage, tokenSymbol, depositFee }) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <Image src={`/images/tokens/${farmImage}.svg`} alt={tokenSymbol} width={64} height={64} />
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading mb="4px">{lpLabel.split(' ')[0]}</Heading>
        <Flex justifyContent="center">
          <MultiplierTag variant="secondary">{multiplier}</MultiplierTag>
          {depositFee !== '0' && depositFee && (
            <MultiplierTag variant="failure" outline>
              {`${depositFee}% Deposit Fee`}
            </MultiplierTag>
          )}
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
