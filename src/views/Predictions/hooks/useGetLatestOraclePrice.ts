import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useChainlinkOracleContract } from 'hooks/useContract'
import useLastUpdated from 'hooks/useLastUpdated'
import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'

const useGetLatestOraclePrice = () => {
  const [price, setPrice] = useState(BIG_ZERO)
  const { lastUpdated, setLastUpdated: refresh } = useLastUpdated()
  const chainlinkOracleContract = useChainlinkOracleContract()

  useEffect(() => {
    const fetchPrice = async () => {
      const response = await chainlinkOracleContract.methods.latestAnswer().call()
      setPrice(getBalanceAmount(new BigNumber(response), 8))
    }

    fetchPrice()
  }, [chainlinkOracleContract, lastUpdated, setPrice])

  return { price, lastUpdated, refresh }
}

export default useGetLatestOraclePrice
