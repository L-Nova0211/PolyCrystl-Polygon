import React from 'react'
import { Modal, ModalBody, Text, Image, Button, Link, OpenNewIcon } from '@crystals/uikit'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { Token } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'

interface Props {
  currency: Token
  onDismiss?: () => void
}

const GetLpModal: React.FC<Partial<Props>> = ({ currency, onDismiss }) => {
  const { t } = useTranslation()
  return (
    <Modal title={t('LP Tokens required')} onDismiss={onDismiss}>
      <ModalBody maxWidth="288px">
        <Image
          src={`/images/farms/${currency.symbol.split(' ')[0].toLocaleLowerCase()}.svg`}
          width={72}
          height={72}
          margin="auto"
          mb="24px"
        />
        <Text mb="16px">{t('You’ll need CRYSTL-MATIC LP tokens to participate in the IFO!')}</Text>
        <Text mb="24px">{t('Get LP tokens, or make sure your tokens aren’t staked somewhere else.')}</Text>
        <Button
          as={Link}
          external
          href={`${BASE_ADD_LIQUIDITY_URL}/BNB/0x94c854f1b64bf2c8401ab0795a93e40b90142e89`}
          endIcon={<OpenNewIcon color="white" />}
          minWidth="100%" // Bypass the width="fit-content" on Links
        >
          {t('Get LP tokens')}
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default GetLpModal
