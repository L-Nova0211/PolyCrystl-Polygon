import tokens from './tokens'
import { VaultConfig } from './types'

const vaults: VaultConfig[] = [
  {
    pid: 0,
    lpSymbol: 'CRYSTL-MATIC LP',
    lpType: 'APE LP',
    lpAddresses: {
      97: '0xB8e54c9Ea1616beEBe11505a419DD8dF1000E02a',
      137: '0xB8e54c9Ea1616beEBe11505a419DD8dF1000E02a',
    },
    wantAddresses: {
      97: '0xB8e54c9Ea1616beEBe11505a419DD8dF1000E02a',
      137: '0xB8e54c9Ea1616beEBe11505a419DD8dF1000E02a',
    },
    stratAddresses: {
      97: '0xFE64091Fdb3a7B68a718Ec7e00a5a5C3c1CE379f',
      137: '0xFE64091Fdb3a7B68a718Ec7e00a5a5C3c1CE379f',
    },
    token: tokens.crystl,
    quoteToken: tokens.matic,
  },
  {
    pid: 1,
    lpSymbol: 'BANANA-ETH LP',
    lpType: 'APE LP',
    lpAddresses: {
      97: '0x44b82c02F404Ed004201FB23602cC0667B1D011e',
      137: '0x44b82c02F404Ed004201FB23602cC0667B1D011e',
    },
    wantAddresses: {
      97: '0x44b82c02F404Ed004201FB23602cC0667B1D011e',
      137: '0x44b82c02F404Ed004201FB23602cC0667B1D011e',
    },
    stratAddresses: {
      97: '0x5666AdA9FCFE05F55C2982cf546a5b5E6a036CAd',
      137: '0x5666AdA9FCFE05F55C2982cf546a5b5E6a036CAd',
    },
    token: tokens.banana,
    quoteToken: tokens.eth,
  },
]

export default vaults
