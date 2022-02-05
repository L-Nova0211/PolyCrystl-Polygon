import { useMemo } from 'react'
import useWeb3 from 'hooks/useWeb3'
import {
  getBep20Contract,
  getCrystlContract,
  getBunnyFactoryContract,
  getBunnySpecialContract,
  getPolyCrystalRabbitContract,
  getProfileContract,
  getIfoV1Contract,
  getIfoV2Contract,
  getLotteryContract,
  getLotteryTicketContract,
  getMasterchefContract,
  getPointCenterIfoContract,
  getSouschefContract,
  getClaimRefundContract,
  getTradingCompetitionContract,
  getEasterNftContract,
  getErc721Contract,
  getCrystlVaultContract,
  getPredictionsContract,
  getChainlinkOracleContract,
  getSouschefV2Contract,
  getLotteryV2Contract,
  getApePriceGetterContract,
  getVaultHealerContract,
  getVaultHealerV2Contract,
} from 'utils/contractHelpers'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoV1Contract = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getIfoV1Contract(address, web3), [address, web3])
}

export const useIfoV2Contract = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getIfoV2Contract(address, web3), [address, web3])
}

export const useERC20 = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getBep20Contract(address, web3), [address, web3])
}

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useERC721 = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getErc721Contract(address, web3), [address, web3])
}

export const useCrystl = () => {
  const web3 = useWeb3()
  return useMemo(() => getCrystlContract(web3), [web3])
}

export const useBunnyFactory = () => {
  const web3 = useWeb3()
  return useMemo(() => getBunnyFactoryContract(web3), [web3])
}

export const usePolyCrystalRabbits = () => {
  const web3 = useWeb3()
  return useMemo(() => getPolyCrystalRabbitContract(web3), [web3])
}

export const useProfile = () => {
  const web3 = useWeb3()
  return useMemo(() => getProfileContract(web3), [web3])
}

export const useLottery = () => {
  const web3 = useWeb3()
  return useMemo(() => getLotteryContract(web3), [web3])
}

export const useLotteryTicket = () => {
  const web3 = useWeb3()
  return useMemo(() => getLotteryTicketContract(web3), [web3])
}

export const useLotteryV2Contract = () => {
  const web3 = useWeb3()
  return useMemo(() => getLotteryV2Contract(web3), [web3])
}

export const useMasterchef = () => {
  const web3 = useWeb3()
  return useMemo(() => getMasterchefContract(web3), [web3])
}

export const useSousChef = (id) => {
  const web3 = useWeb3()
  return useMemo(() => getSouschefContract(id, web3), [id, web3])
}

export const useSousChefV2 = (id) => {
  const web3 = useWeb3()
  return useMemo(() => getSouschefV2Contract(id, web3), [id, web3])
}

export const usePointCenterIfoContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getPointCenterIfoContract(web3), [web3])
}

export const useBunnySpecialContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getBunnySpecialContract(web3), [web3])
}

export const useClaimRefundContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getClaimRefundContract(web3), [web3])
}

export const useTradingCompetitionContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getTradingCompetitionContract(web3), [web3])
}

export const useEasterNftContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getEasterNftContract(web3), [web3])
}

export const useCrystlVaultContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getCrystlVaultContract(web3), [web3])
}

export const usePredictionsContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getPredictionsContract(web3), [web3])
}

export const useChainlinkOracleContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getChainlinkOracleContract(web3), [web3])
}
export const usePriceGetter = () => {
  const web3 = useWeb3()
  return useMemo(() => getApePriceGetterContract(web3), [web3])
}
export const useVaultHealer = () => {
  const web3 = useWeb3()
  return useMemo(() => getVaultHealerContract(web3), [web3])
}
export const useVaultHealerV2 = () => {
  const web3 = useWeb3()
  return useMemo(() => getVaultHealerV2Contract(web3), [web3])
}
