import { VaultApy } from 'state/types'

// eslint-disable-next-line import/prefer-default-export
export const isInactiveVault = (apys: VaultApy) => {
  return Object.values(apys).reduce((_, value) => {
    return value === 0
  }, false)
}
