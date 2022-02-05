import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Toggle, Text, Flex, NotificationDot } from '@crystals/uikit'
import { useTranslation } from 'contexts/Localization'

interface Props {
  stakedOnly: boolean
  setStakedOnly: (setStaked: boolean) => void
  hasStakeInFinishedVaults: boolean
}

const VaultTabButtons: React.FC<Props> = ({ stakedOnly, setStakedOnly, hasStakeInFinishedVaults }) => {
  const { url } = useRouteMatch()
  const { t } = useTranslation()
  const isHistory = url.includes('history')

  const liveOrFinishedSwitch = (
    <ButtonMenu activeIndex={isHistory ? 1 : 0} scale="sm" variant="subtle">
      <ButtonMenuItem as={Link} to="/vaults-v2">
        {t('Live')}
      </ButtonMenuItem>
      <NotificationDot show={hasStakeInFinishedVaults}>
        <ButtonMenuItem as={Link} to="/vaults-v2/history">
          {t('Finished')}
        </ButtonMenuItem>
      </NotificationDot>
    </ButtonMenu>
  )

  const stakedOnlySwitch = (
    <Flex mt={['4px', null, 0, null]} ml={[0, null, '24px', null]} justifyContent="center" alignItems="center">
      <Toggle scale="sm" checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
      <Text ml={['4px', '4px', '8px']} pr="8px">
        {t('Staked only')}
      </Text>
    </Flex>
  )

  return (
    <Flex
      alignItems="center"
      justifyContent={['space-around', 'space-around', 'flex-start']}
      mb={['24px', '24px', '24px', '0px']}
    >
      {stakedOnlySwitch}
      {liveOrFinishedSwitch}
    </Flex>
  )
}

export default VaultTabButtons
