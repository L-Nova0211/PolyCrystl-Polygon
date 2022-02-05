import React, { useState } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Flex, Button } from '@crystals/uikit'
import { useTranslation } from 'contexts/Localization'
import { useVaultHealerV2 } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import useToast from 'hooks/useToast'

const StyledCard = styled(Card)`
  display: flex;
  justify-content: center;
  width: 100%;
  flex: 1;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 240px;
    max-width: 240px;
    margin-left: auto;
  }
`

const CompoundCard = () => {
  const { t } = useTranslation()
  const vaultHealerV2Contract = useVaultHealerV2()
  const { toastError, toastSuccess } = useToast()
  const { account } = useWeb3React()
  const [pendingTx, setPendingTx] = useState(false)

  const handleConfirmClick = async () => {
    vaultHealerV2Contract.methods
      .earnAll()
      .send({ from: account, gas: 15000000 })
      .on('sending', () => {
        setPendingTx(true)
      })
      .on('receipt', () => {
        toastSuccess(t('Vaults Compounded!'), t('All vault earnings have been successfully compounded.'))
        setPendingTx(false)
      })
      .on('error', (error) => {
        console.error(error)
        toastError(t('Could not compound'), t('There may be an issue with your transaction.'))
        setPendingTx(false)
      })
  }

  return (
    <StyledCard>
      <CardBody>
        <Flex alignItems="center" justifyContent="space-between">
          <Button isLoading={pendingTx} scale="md" onClick={account && handleConfirmClick}>
            {t('Compound Vaults')}
          </Button>
        </Flex>
      </CardBody>
    </StyledCard>
  )
}

export default CompoundCard
