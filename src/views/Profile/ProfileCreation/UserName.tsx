import React, { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import {
  Card,
  CardBody,
  Heading,
  Text,
  Input as UIKitInput,
  Button,
  AutoRenewIcon,
  CheckmarkIcon,
  Flex,
  WarningIcon,
  useModal,
  Skeleton,
  Checkbox,
} from '@crystals/uikit'
import { parseISO, formatDistance } from 'date-fns'
import { useWeb3React } from '@web3-react/core'
import useToast from 'hooks/useToast'
import useWeb3 from 'hooks/useWeb3'
import { useTranslation } from 'contexts/Localization'
import useHasCrystlBalance from 'hooks/useHasCrystlBalance'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import debounce from 'lodash/debounce'
import ConfirmProfileCreationModal from '../components/ConfirmProfileCreationModal'
import useProfileCreation from './contexts/hook'
import { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH, REGISTER_COST } from './config'

enum ExistingUserState {
  IDLE = 'idle', // initial state
  CREATED = 'created', // username has already been created
  NEW = 'new', // username has not been created
}

const profileApiUrl = process.env.REACT_APP_API_PROFILE
const minimumCrystlToRegister = new BigNumber(REGISTER_COST).multipliedBy(DEFAULT_TOKEN_DECIMAL)

const InputWrap = styled.div`
  position: relative;
  max-width: 240px;
`

const Input = styled(UIKitInput)`
  padding-right: 40px;
`

const Indicator = styled(Flex)`
  align-items: center;
  height: 24px;
  justify-content: center;
  margin-top: -12px;
  position: absolute;
  right: 16px;
  top: 50%;
  width: 24px;
`

const UserName: React.FC = () => {
  const [isAcknowledged, setIsAcknowledged] = useState(false)
  const { teamId, selectedNft, userName, actions, minimumCrystlRequired, allowance } = useProfileCreation()
  const { t } = useTranslation()
  const { account, library } = useWeb3React()
  const { toastError } = useToast()
  const web3 = useWeb3()
  const [existingUserState, setExistingUserState] = useState<ExistingUserState>(ExistingUserState.IDLE)
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const hasMinimumCrystlRequired = useHasCrystlBalance(minimumCrystlToRegister)
  const [onPresentConfirmProfileCreation] = useModal(
    <ConfirmProfileCreationModal
      userName={userName}
      selectedNft={selectedNft}
      account={account}
      teamId={teamId}
      minimumCrystlRequired={minimumCrystlRequired}
      allowance={allowance}
    />,
    false,
  )
  const isUserCreated = existingUserState === ExistingUserState.CREATED

  const checkUsernameValidity = debounce(async (value: string) => {
    try {
      setIsLoading(true)
      const res = await fetch(`${profileApiUrl}/api/users/valid/${value}`)

      if (res.ok) {
        setIsValid(true)
        setMessage('')
      } else {
        const data = await res.json()
        setIsValid(false)
        setMessage(data?.error?.message)
      }
    } finally {
      setIsLoading(false)
    }
  }, 200)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    actions.setUserName(value)
    checkUsernameValidity(value)
  }

  const handleConfirm = async () => {
    try {
      setIsLoading(true)

      const signature = library?.bnbSign
        ? (await library.bnbSign(account, userName))?.signature
        : // web3.utils.utf8ToHex("...") will not be called here on username if hex like string
          // https://github.com/ChainSafe/web3.js/blob/5d027191c5cb7ffbcd44083528bdab19b4e14744/packages/web3-core-helpers/src/formatters.js#L225
          // Last param is the password, and is null to request a signature in the wallet
          await web3.eth.personal.sign(web3.utils.utf8ToHex(userName), account, null)

      const response = await fetch(`${profileApiUrl}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: account,
          username: userName,
          signature,
        }),
      })

      if (response.ok) {
        setExistingUserState(ExistingUserState.CREATED)
      } else {
        const data = await response.json()
        toastError(t('Error'), data?.error?.message)
      }
    } catch (error) {
      toastError(error?.message ? error.message : JSON.stringify(error))
    } finally {
      setIsLoading(false)
    }
  }

  const handleAcknowledge = () => setIsAcknowledged(!isAcknowledged)

  // Perform an initial check to see if the wallet has already created a username
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${profileApiUrl}/api/users/${account}`)
        const data = await response.json()

        if (response.ok) {
          const dateCreated = formatDistance(parseISO(data.created_at), new Date())
          setMessage(t('Created %dateCreated% ago', { dateCreated }))

          actions.setUserName(data.username)
          setExistingUserState(ExistingUserState.CREATED)
          setIsValid(true)
        } else {
          setExistingUserState(ExistingUserState.NEW)
        }
      } catch (error) {
        toastError(t('Error'), t('Unable to verify username'))
      }
    }

    if (account) {
      fetchUser()
    }
  }, [account, setExistingUserState, setIsValid, setMessage, actions, toastError, t])

  return (
    <>
      <Text fontSize="20px" color="textSubtle" bold>
        {t('Step %num%', { num: 4 })}
      </Text>
      <Heading as="h3" scale="xl" mb="24px">
        {t('Set Your Name')}
      </Heading>
      <Text as="p" mb="24px">
        {t('This name will be shown in team leaderboards and search results as long as your profile is active.')}
      </Text>
      <Card mb="24px">
        <CardBody>
          <Heading as="h4" scale="lg" mb="8px">
            {t('Set Your Name')}
          </Heading>
          <Text as="p" color="textSubtle" mb="24px">
            {t(
              'Your name must be at least 3 and at most 15 standard letters and numbers long. You can’t change this once you click Confirm.',
            )}
          </Text>
          {existingUserState === ExistingUserState.IDLE ? (
            <Skeleton height="40px" width="240px" />
          ) : (
            <InputWrap>
              <Input
                onChange={handleChange}
                isWarning={userName && !isValid}
                isSuccess={userName && isValid}
                minLength={USERNAME_MIN_LENGTH}
                maxLength={USERNAME_MAX_LENGTH}
                disabled={isUserCreated}
                placeholder={t('Enter your name...')}
                value={userName}
              />
              <Indicator>
                {isLoading && <AutoRenewIcon spin />}
                {!isLoading && isValid && userName && <CheckmarkIcon color="success" />}
                {!isLoading && !isValid && userName && <WarningIcon color="failure" />}
              </Indicator>
            </InputWrap>
          )}
          <Text color="textSubtle" fontSize="14px" py="4px" mb="16px" style={{ minHeight: '30px' }}>
            {message}
          </Text>
          <Text as="p" color="failure" mb="8px">
            {t(
              "Only reuse a name from other social media if you're OK with people viewing your wallet. You can't change your name once you click Confirm.",
            )}
          </Text>
          <label htmlFor="checkbox" style={{ display: 'block', cursor: 'pointer', marginBottom: '24px' }}>
            <Flex alignItems="center">
              <div style={{ flex: 'none' }}>
                <Checkbox id="checkbox" scale="sm" checked={isAcknowledged} onChange={handleAcknowledge} />
              </div>
              <Text ml="8px">{t('I understand that people can view my wallet if they know my username')}</Text>
            </Flex>
          </label>
          <Button onClick={handleConfirm} disabled={!isValid || isUserCreated || isLoading || !isAcknowledged}>
            {t('Confirm')}
          </Button>
        </CardBody>
      </Card>
      <Button onClick={onPresentConfirmProfileCreation} disabled={!isValid || !isUserCreated}>
        {t('Complete Profile')}
      </Button>
      {!hasMinimumCrystlRequired && (
        <Text color="failure" mt="16px">
          {t('A minimum of %num% CRYSTL is required', { num: REGISTER_COST })}
        </Text>
      )}
    </>
  )
}

export default UserName
