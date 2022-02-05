import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Link } from '@crystals/uikit'
import { useTranslation } from 'contexts/Localization'

const FlexWrapper = styled(Flex)`
  margin-top: 16px;
  margin-bottom: 16px;
  margin-right: 16px;
`
const StyledLink = styled(Link)`
  font-weight: 400;
`

const QuestionsAnswers: React.FC = () => {
  const { t } = useTranslation()
  const docsLink = 'https://polycrystal.gitbook.io/polycrystal-finance/tokenomics/'
  const vaultGuideLink =
    'https://polycrystal.gitbook.io/polycrystal-finance/crystal-clear-education/untitled-1/unmasking-vaults'

  return (
    <>
      <FlexWrapper flexDirection="column" justifyContent="center" alignItems="flex-end" width="auto" flexGrow={2}>
        <Text color="text" fontSize="20px">
          {t('Questions and Answers')}
        </Text>
        <StyledLink href={docsLink} external>
          {t('Fees and Tokenomics Documents')}
        </StyledLink>
        <StyledLink href={vaultGuideLink} external>
          {t('Learn about our vaults with our Educational Guides')}
        </StyledLink>
      </FlexWrapper>
    </>
  )
}

export default QuestionsAnswers
