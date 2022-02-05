import React from 'react'
import { Text, Skeleton, Flex } from '@crystals/uikit'
import { useTranslation } from 'contexts/Localization'
import { formatApy } from 'utils/compoundApyHelpers'

export interface CardValueProps {
  amount?: number
  wording?: string
  color?: string
}

const CardValueApy: React.FC<CardValueProps> = ({ amount, wording, color = 'text' }) => {
  const { t } = useTranslation()

  const formattedAmount = amount ? formatApy(amount) : '0%'

  return (
    <>
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        {amount ? <Text color={color}> {formattedAmount}</Text> : <Skeleton height={24} width={80} />}
        <Text color="secondary"> {t(wording)} </Text>
      </Flex>
    </>
  )
}

export default CardValueApy
