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

const TreasureKeyGame = () => {
  const { t } = useTranslation()

  const TreasureKeyLabel = 'Treasure Key'

  const coinFlip: ImageGame = {
    link: 'https://treasurekey.bet/coin-flip?partner=POLYCRYSTAL',
    image: 'coin-treasurekey',
    text: t('Coin Flip'),
  }

  const roulette: ImageGame = {
    link: 'https://treasurekey.bet/roulette?partner=POLYCRYSTAL',
    image: 'roulette-treasurekey',
    text: t('Roulette'),
  }

  const dice: ImageGame = {
    link: 'https://treasurekey.bet/dice-it?partner=POLYCRYSTAL',
    image: 'dice-treasurekey',
    text: t('Dice It'),
  }

  const barbellRoll: ImageGame = {
    link: 'https://treasurekey.bet/barbell-roll?partner=POLYCRYSTAL',
    image: 'barbellroll-treasurekey',
    text: t('Barbell'),
  }

  const images: ImageGame[] = [coinFlip, roulette, dice, barbellRoll]

  const imageSize = 100

  return (
    <StyledGames>
      <Flex flexDirection="column" p={24}>
        <Heading scale="xl" mb={10} textAlign="center">
          {TreasureKeyLabel}
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

export default TreasureKeyGame
