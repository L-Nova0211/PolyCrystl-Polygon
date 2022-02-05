import { usePriceCrystlBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalCrystl = getBalanceNumber(totalRewards)
  const crystlPriceBusd = usePriceCrystlBusd()

  return totalCrystl * crystlPriceBusd.toNumber()
}

export default useLotteryTotalPrizesUsd
