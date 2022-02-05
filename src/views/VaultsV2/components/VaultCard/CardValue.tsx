import React from 'react'
import { Text, Skeleton, Flex } from '@crystals/uikit'
import { useTranslation } from 'contexts/Localization'

export interface CardValueProps {
  amount?: string
  wording?: string
}

const CardValue: React.FC<CardValueProps> = ({ amount, wording }) => {
  const { t } = useTranslation()
  return (
    <>
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        {amount ? <Text> {amount}</Text> : <Skeleton height={24} width={80} />}
        <Text color="secondary"> {t(wording)} </Text>
      </Flex>
    </>
  )
}

export default CardValue
