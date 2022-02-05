import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { AutoRenewIcon, Button } from '@crystals/uikit'
import { useVaultHealerV2Approve } from 'hooks/useApprove'
import { Vault } from 'state/types'
import { getBep20Contract } from 'utils/contractHelpers'
import useWeb3 from 'hooks/useWeb3'

export interface ApprovalProps {
  vault: Vault
}

const ApprovalWrapper = styled.div``

const Approval: React.FC<ApprovalProps> = ({ vault }) => {
  const { t } = useTranslation()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const web3 = useWeb3()
  const lpContract = getBep20Contract(vault.wantAddress, web3)

  const { onApprove } = useVaultHealerV2Approve(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  const disabled = vault.paused

  return (
    <ApprovalWrapper>
      <Button
        isLoading={requestedApproval}
        endIcon={requestedApproval ? <AutoRenewIcon spin color="currentColor" /> : null}
        disabled={disabled || requestedApproval}
        onClick={handleApprove}
        width="100%"
        style={{ marginBottom: '10px', marginTop: '15px' }}
      >
        {t('Approve Contract')}
      </Button>
    </ApprovalWrapper>
  )
}

export default Approval
