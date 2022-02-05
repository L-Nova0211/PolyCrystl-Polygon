import React from 'react'
import { Flex, Button } from '@crystals/uikit'
import { useTranslation } from 'contexts/Localization'

export interface GetLPProps {
  liquidityLink?: string
  lpName?: string
}

const GetLP: React.FC<GetLPProps> = ({ liquidityLink, lpName }) => {
  const { t } = useTranslation()
  const displayText = `${t('Get')} ${lpName}`

  return (
    <>
      <Flex flexDirection="column" justifyContent="center" alignSelf="center" flexGrow={1}>
        <Button as="a" href={liquidityLink} variant="secondary" external>
          {displayText}
        </Button>
      </Flex>
    </>
  )
}

export default GetLP
