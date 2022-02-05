import fetchVaultData, { PublicVaultData } from './fetchVaultData'

const fetchVault = async (pid: number, account: string): Promise<PublicVaultData | null> => {
  return fetchVaultData(pid, account)
}

export default fetchVault
