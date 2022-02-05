import pools from 'config/constants/pools'
import { getSouschefContract, getSouschefV2Contract } from 'utils/contractHelpers'

// Pool 0 is special (CRYSTL pool)
// Pool 78 is a broken pool, not used, and break the tests
const idsToRemove = [0, 78]
const poolsToTest = pools.filter((pool) => !idsToRemove.includes(pool.sousId))

describe('Config pools', () => {
  it.each(pools.map((pool) => pool.sousId))('Pool #%d has an unique sousId', (sousId) => {
    const duplicates = pools.filter((p) => sousId === p.sousId)
    expect(duplicates).toHaveLength(1)
  })
  it.each(pools.map((pool) => [pool.sousId, pool.contractAddress]))(
    'Pool #%d has an unique contract address',
    (sousId, contractAddress) => {
      const duplicates = pools.filter((p) => contractAddress[56] === p.contractAddress[56])
      expect(duplicates).toHaveLength(1)
    },
  )
  it.each(poolsToTest.filter((pool) => pool.earningToken.symbol !== 'BNB'))(
    'Pool %p has the correct earning token',
    async (pool) => {
      const contract = getSouschefContract(pool.sousId)
      const rewardTokenAddress = await contract.methods.rewardToken().call()
      expect(rewardTokenAddress.toLowerCase()).toBe(pool.earningToken.address[56].toLowerCase())
    },
  )
  it.each(poolsToTest.filter((pool) => pool.stakingToken.symbol !== 'BNB'))(
    'Pool %p has the correct staking token',
    async (pool) => {
      let stakingTokenAddress = null
      try {
        const contract = getSouschefV2Contract(pool.sousId)
        stakingTokenAddress = await contract.methods.stakedToken().call()
      } catch (error) {
        const contract = getSouschefContract(pool.sousId)
        stakingTokenAddress = await contract.methods.syrup().call()
      }

      expect(stakingTokenAddress.toLowerCase()).toBe(pool.stakingToken.address[56].toLowerCase())
    },
  )
})
