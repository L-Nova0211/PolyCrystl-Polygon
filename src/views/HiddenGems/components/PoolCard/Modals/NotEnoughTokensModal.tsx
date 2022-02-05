import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Modal, Text, Button } from '@crystals/uikit'
import useTheme from 'hooks/useTheme'
import { Token } from 'config/constants/types'
import getSwapUrl from 'utils/getSwapUrl'
import { getAddress } from 'utils/addressHelpers'

interface NotEnoughTokensModalProps {
  token: Token
  onDismiss?: () => void
}

const NotEnoughTokensModal: React.FC<NotEnoughTokensModalProps> = ({ token, onDismiss }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  return (
    <Modal
      title={t('%symbol% required', { symbol: token.symbol })}
      onDismiss={onDismiss}
      headerBackground={theme.colors.gradients.cardHeader}
    >
      <Text color="failure" bold>
        {t('Insufficient %symbol% balance', { symbol: token.symbol })}
      </Text>
      <Text mt="24px">{t('You’ll need %symbol% to stake in this pool!', { symbol: token.symbol })}</Text>
      <Text>
        {t('Buy some %symbol%, or make sure your %symbol% isn’t in another pool or LP.', {
          symbol: token.symbol,
        })}
      </Text>
      <Button mt="24px" as="a" external href={getSwapUrl(getAddress(token.address))}>
        {t('Buy')} {token.symbol}
      </Button>
      <Button variant="text" onClick={onDismiss}>
        {t('Close Window')}
      </Button>
    </Modal>
  )
}

export default NotEnoughTokensModal
