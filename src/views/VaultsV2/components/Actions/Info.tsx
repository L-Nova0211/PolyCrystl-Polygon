import React from 'react'
import styled from 'styled-components'
import { Text, Flex, LinkExternal } from '@crystals/uikit'
import { useTranslation } from 'contexts/Localization'
import { getBscScanAddressUrl } from 'utils/bscscan'

export interface InfoProps {
  projectLink?: string
  lpAddress?: string
  farmLink?: string
  isMobile?: boolean
}

const FlexWrapper = styled(Flex)`
  margin-top: 8px;
  margin-bottom: 8px;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: 16px;
    margin-bottom: 16px;
  }
`
const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

const Info: React.FC<InfoProps> = ({ projectLink, lpAddress, farmLink, isMobile }) => {
  const { t } = useTranslation()
  const contractLink = getBscScanAddressUrl(lpAddress)

  if (!isMobile) {
    return (
      <>
        <FlexWrapper flexDirection="column" justifyContent="center" flexGrow={1}>
          <Text color="text" fontSize="20px">
            {t('Information')}
          </Text>
          <StyledLinkExternal href={projectLink}>{t('View Project Site')}</StyledLinkExternal>
          <StyledLinkExternal href={farmLink}>{t('View Farm Site')}</StyledLinkExternal>
          <StyledLinkExternal href={contractLink}>{t('View Contract')}</StyledLinkExternal>
        </FlexWrapper>
      </>
    )
  }

  return (
    <>
      <FlexWrapper flexDirection="row" justifyContent="space-around" flexWrap="wrap">
        <StyledLinkExternal href={projectLink}>{t('View Project Site')}</StyledLinkExternal>
        <StyledLinkExternal href={farmLink}>{t('View Farm Site')}</StyledLinkExternal>
        <StyledLinkExternal href={contractLink}>{t('View Contract')}</StyledLinkExternal>
      </FlexWrapper>
    </>
  )
}

export default Info
