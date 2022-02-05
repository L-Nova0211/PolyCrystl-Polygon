import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Text, Card, CardBody, Heading } from '@crystals/uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getMaticAddress } from 'utils/addressHelpers'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import getApiUrl from 'utils/getApiUrl'
import getPolygonScanTxn from 'utils/getPolygonScanTxn'
import UnlockButton from 'components/UnlockButton'
import { exchangeUrl } from 'components/Menu/config'
import useLocalStorage from 'hooks/useLocalStorage'
import getImagePath from 'utils/getImagePath'
import MaticWalletBalance from './MaticWalletBalance'

const GemSpinner = styled.div`
  position: relative;
  & img {
    width: 300px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`

const Block = styled.div`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

export interface ClaimMaticProps {
  small?: boolean
}

const maxMatic = parseFloat(process.env.REACT_APP_MATIC_FAUCET_MAX_BALANCE)

const ClaimMatic: React.FC<ClaimMaticProps> = ({ small }: ClaimMaticProps) => {
  const { t } = useTranslation()
  const { balance: maticBalance } = useTokenBalance(getMaticAddress())
  const maticBalanceNumber = getBalanceNumber(maticBalance)
  const { account } = useWeb3React()
  const [lastFaucetUsage, setLastUsage] = useLocalStorage(btoa('lastFaucetUsage'), null)
  const [data, setData] = useState<{
    err: string | null
    hash: string | null
    loading: boolean
  }>({
    err: null,
    hash: null,
    loading: false,
  })

  const handleClick = async () => {
    setData({
      err: null,
      hash: null,
      loading: true,
    })
    const url = getApiUrl(
      `/api/claim-matic?token=${btoa(
        JSON.stringify({
          account,
          lastFaucetUsage,
        }),
      )}`,
    )
    try {
      const res = await fetch(url)
      const { err, hash, timestamp } = await res.json()
      if (!err) {
        setLastUsage(timestamp)
      }
      setData({
        err,
        hash,
        loading: false,
      })
    } catch (err) {
      setData({
        err: 'Polygon is busy, try again later :(',
        hash: null,
        loading: false,
      })
    }
  }

  const renderAction = () => {
    if (account) {
      if (maticBalanceNumber > maxMatic) {
        return (
          <Button width="100%" disabled>
            {t('You Have Enough MATIC Already!')}
          </Button>
        )
      }
      if (data.loading) {
        return (
          <Button width="100%" disabled>
            {t('Sending MATIC Your Way!')}
          </Button>
        )
      }
      if (data.err) {
        return (
          <Button width="100%" disabled>
            {data.err}
          </Button>
        )
      }
      if (data.hash) {
        return (
          <>
            <Link to={{ pathname: exchangeUrl }} target="_blank" rel="noreferrer">
              <Button width="100%" marginBottom="1em" external>
                Buy $CRYSTL!
              </Button>
            </Link>
            <Link to={{ pathname: getPolygonScanTxn(data.hash) }} target="_blank" rel="noreferrer">
              <Button width="100%" external>
                View Transaction
              </Button>
            </Link>
          </>
        )
      }
      return (
        <Button onClick={handleClick} width="100%">
          {t('Use our MATIC Faucet')}
        </Button>
      )
    }
    return <UnlockButton width="100%" />
  }

  const copy = (
    <Block>
      <Text>Sometimes you just need a little gas to get you going.</Text>
      <Text>Use our faucet whenever you are in need of a hand!</Text>
    </Block>
  )

  const spinner = (
    <GemSpinner>
      <img alt="Buy $CRYSTL!" src={getImagePath('crystl.gif')} />
    </GemSpinner>
  )

  return (
    <Card>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {t('Need Some MATIC?')}
        </Heading>
        {!small && copy}
        <Block>
          <Label>{t('MATIC in your Wallet')}:</Label>
          <MaticWalletBalance />
        </Block>
        <Actions>
          {!small && spinner}
          {renderAction()}
        </Actions>
      </CardBody>
    </Card>
  )
}

export default ClaimMatic
