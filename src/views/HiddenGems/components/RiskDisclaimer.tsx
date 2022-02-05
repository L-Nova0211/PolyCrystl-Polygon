import React, { useState } from 'react'
import {
  ModalContainer,
  ModalBody,
  Text,
  Button,
  Flex,
  InjectedModalProps,
  Checkbox,
  ModalHeader,
  ModalTitle,
  Heading,
  Box,
} from '@crystals/uikit'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'

interface RiskDisclaimerProps extends InjectedModalProps {
  onSuccess: () => void
}

const GradientModalHeader = styled(ModalHeader)`
  background: ${({ theme }) => theme.colors.gradients.bubblegum};
  padding-bottom: 24px;
  padding-top: 24px;
`

const RiskDisclaimer: React.FC<RiskDisclaimerProps> = ({ onSuccess, onDismiss }) => {
  const [acknowledgeRisk, setAcknowledgeRisk] = useState(false)
  const { t } = useTranslation()

  const handleSetAcknowledgeRisk = () => {
    setAcknowledgeRisk(!acknowledgeRisk)
  }

  const handleConfirm = () => {
    onSuccess()
    onDismiss()
  }

  return (
    <ModalContainer title={t('Welcome!')} minWidth="320px">
      <GradientModalHeader>
        <ModalTitle>
          <Heading scale="lg">{t('Welcome!')}</Heading>
        </ModalTitle>
      </GradientModalHeader>
      <ModalBody p="24px" maxWidth="400px">
        <Box maxHeight="300px" overflowY="auto">
          <Heading as="h3" mb="24px">
            {t('Hidden Gems Disclaimer:')}
          </Heading>

          <Text as="p" color="textSubtle" mb="24px">
            {t(
              'DeFi is an experimental space. The gains may be high but so are the stakes. Here you may earn third-party tokens without risk to your principal $CRYSTL💎 investment. Use your own best judgement and always do-your-own-research (DYOR).',
            )}
          </Text>

          <label htmlFor="checkbox" style={{ display: 'block', cursor: 'pointer', marginBottom: '24px' }}>
            <Flex alignItems="center">
              <div style={{ flex: 'none' }}>
                <Checkbox id="checkbox" scale="sm" checked={acknowledgeRisk} onChange={handleSetAcknowledgeRisk} />
              </div>
              <Text ml="8px">
                {t('I understand that third-party tokens are subject to risks from external platforms.')}
              </Text>
            </Flex>
          </label>
        </Box>
        <Button width="100%" onClick={handleConfirm} disabled={!acknowledgeRisk}>
          {t('Continue')}
        </Button>
      </ModalBody>
    </ModalContainer>
  )
}

export default RiskDisclaimer
