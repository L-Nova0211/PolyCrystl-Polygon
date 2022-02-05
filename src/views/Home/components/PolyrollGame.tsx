import React from 'react'
import { Card, Flex, Heading, Text, Image } from '@crystals/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'

const StyledGames = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const StyledImage = styled(Image)`
  display: flex;
  align-self: center;
  width: 50px;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 100px;
  }
`

const StyledFlex = styled(Flex)`
  transition: opacity 200ms;
  &:hover {
    opacity: 0.65;
  }
`

type ImageGame = {
  link: string
  image: string
  text: string
}

const PolyrollGame = () => {
  const { t } = useTranslation()

  const HeaderLabel = 'Polyroll'

  const coinFlip: ImageGame = {
    link: 'https://polyroll.org/coinflip/CRYSTL',
    image: 'coin-polyroll',
    text: t('Coin Flip'),
  }

  const roulette: ImageGame = {
    link: 'https://polyroll.org/roulette/CRYSTL',
    image: 'roulette-polyroll',
    text: t('Roulette'),
  }

  const dice: ImageGame = {
    link: 'https://polyroll.org/diceroll/CRYSTL',
    image: 'dice-polyroll',
    text: t('Dice It'),
  }

  const polyroll: ImageGame = {
    link: 'https://polyroll.org/polyroll/CRYSTL',
    image: 'polyroll-game',
    text: t('Polyroll'),
  }

  const images: ImageGame[] = [coinFlip, roulette, dice, polyroll]

  const imageSize = 100

  return (
    <StyledGames>
      <Flex flexDirection="column" p={24}>
        <Heading scale="xl" mb={10} textAlign="center">
          {HeaderLabel}
        </Heading>
        <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
          {images.map((game) => (
            <StyledFlex
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
              as="a"
              href={game.link}
              target="_blank"
              rel="noreferrer noopener"
            >
              <StyledImage
                src={`/images/games/${game.image}.svg`}
                alt={game.image}
                width={imageSize}
                height={imageSize}
              />
              <Text>{game.text}</Text>
            </StyledFlex>
          ))}
        </Flex>
      </Flex>
    </StyledGames>
  )
}

export default PolyrollGame
