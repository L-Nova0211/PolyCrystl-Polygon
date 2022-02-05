import { getVaultHealerContract } from 'utils/contractHelpers'
import fetchVault from './fetchVault'
import { PublicVaultData } from './fetchVaultData'

const fetchVaultCount = async () => {
  const vaultHealerContract = getVaultHealerContract()
  return vaultHealerContract.methods.poolLength().call()
}

const fetchVaults = async (account: string): Promise<Array<PublicVaultData | null>> => {
  const pidCount = await fetchVaultCount()

  return Promise.all(
    [...Array(parseInt(pidCount))].map(async (e, pid) => {
      return fetchVault(pid, account)
    }),
  )
}

export default fetchVaults
