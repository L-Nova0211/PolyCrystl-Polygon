import React from 'react'
import styled from 'styled-components'
import { Modal, Flex, Box, LinkExternal, Text } from '@crystals/uikit'
import { useTranslation } from 'contexts/Localization'
import { getBscScanAddressUrl } from 'utils/bscscan'

interface VaultInformationModal {
  onDismiss?: () => void
  projectLink?: string
  lpAddress?: string
  farmLink?: string
  lpLabel: string
}

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

const FlexWrapper = styled(Flex)`
  margin-left: 16px;
`

const VaultInformationModal: React.FC<VaultInformationModal> = ({
  projectLink,
  lpAddress,
  farmLink,
  onDismiss,
  lpLabel,
}) => {
  const { t } = useTranslation()
  const contractLink = getBscScanAddressUrl(lpAddress)

  return (
    <Modal title={lpLabel} onDismiss={onDismiss}>
      <FlexWrapper flexDirection="column" justifyContent="center" alignItems="flex-start" flexGrow={1}>
        <Text color="text" fontSize="20px">
          {t('Information')}
        </Text>
        <Box mb="15px" maxWidth="340px">
          <StyledLinkExternal href={projectLink}>{t('View Project Site')}</StyledLinkExternal>
          <StyledLinkExternal href={farmLink}>{t('View Farm Site')}</StyledLinkExternal>
          <StyledLinkExternal href={contractLink}>{t('View Contract')}</StyledLinkExternal>
        </Box>
      </FlexWrapper>
    </Modal>
  )
}

export default VaultInformationModal
