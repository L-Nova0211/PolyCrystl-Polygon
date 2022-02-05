import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 2 farms (PID 0, 1) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'CRYSTL',
    lpAddresses: {
      137: '0x76bF0C28e604CC3fE9967c83b3C3F31c213cfE64',
    },
    token: tokens.crystl,
    quoteToken: tokens.crystl,
  },
  {
    pid: 1,
    lpSymbol: 'CRYSTL-WMATIC LP',
    lpAddresses: {
      137: '0xB8e54c9Ea1616beEBe11505a419DD8dF1000E02a',
    },
    token: tokens.crystl,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 68,
    lpSymbol: 'WELT-USDC LP',
    lpAddresses: {
      137: '0xfAc2C6B690E171cDbB595B60cA58ed70fa19e90C',
    },
    token: tokens.welt,
    quoteToken: tokens.usdc,
  },
  {
    pid: 67,
    lpSymbol: 'MIMIR-WMATIC LP',
    lpAddresses: {
      137: '0xADaC86d1B3afDac3ecED11347f14BF9540069394',
    },
    token: tokens.mimir,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 3,
    lpSymbol: 'BANANA-WETH LP',
    lpAddresses: {
      137: '0x44b82c02f404ed004201fb23602cc0667b1d011e',
    },
    token: tokens.banana,
    quoteToken: tokens.eth,
  },
  {
    pid: 66,
    lpSymbol: 'RELAY-WMATIC LP',
    lpAddresses: {
      137: '0x65027B18B7E0A4Cae17fa22Ff0497Ed6Bf46F914',
    },
    token: tokens.relay,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 65,
    lpSymbol: 'FRMX-WETH LP',
    lpAddresses: {
      137: '0x59985e9a61b272fb4fce38d4af1da11ba646b6ab',
    },
    token: tokens.frmx,
    quoteToken: tokens.eth,
  },
  {
    pid: 64,
    lpSymbol: 'pBREW-WMATIC LP',
    lpAddresses: {
      137: '0x3a1793E7094890DCB5a467e4191ca7Ca123Cfabe',
    },
    token: tokens.pbrew,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 63,
    lpSymbol: 'BLU-WMATIC LP',
    lpAddresses: {
      137: '0x61d0438a019fd8f126bf1e1bd1c427a2d22b01a2',
    },
    token: tokens.blu,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 62,
    lpSymbol: 'FOUR-WMATIC LP',
    lpAddresses: {
      137: '0x411a34d3e47d9694e1c6ac20c694f55e3f20f8a1',
    },
    token: tokens.four,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 61,
    lpSymbol: 'PAW-WMATIC LP',
    lpAddresses: {
      137: '0x836051A89124d0ec92d4D614e23915Dc00898566',
    },
    token: tokens.paw,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 60,
    lpSymbol: 'EGG-WMATIC LP',
    lpAddresses: {
      137: '0x8eEce066dbf80d5D6CD998b9e90643AB3Cb2C100',
    },
    token: tokens.egg,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 58,
    lpSymbol: 'AZUKI-WMATIC LP',
    lpAddresses: {
      137: '0xe471815a323f8Efd35A288A00FA9768a139e7CBe',
    },
    token: tokens.azuki,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 56,
    lpSymbol: 'DOGIRA-WMATIC LP',
    lpAddresses: {
      137: '0x103062f71b7106a8df6fd2a4dd9368358c44a9d0',
    },
    token: tokens.dogira,
    quoteToken: tokens.wmatic,
  },

  {
    pid: 54,
    lpSymbol: 'pQBERT-WMATIC LP',
    lpAddresses: {
      137: '0x312d2eab1c01c0c3d74f41a3b7dd5772ad9f3ca2',
    },
    token: tokens.pqbert,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 53,
    lpSymbol: 'KOM-WMATIC LP',
    lpAddresses: {
      137: '0x0806a407d6eea72788d91c36829a19d424446040',
    },
    token: tokens.kom,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 52,
    lpSymbol: 'SX-WMATIC LP',
    lpAddresses: {
      137: '0xf90331cb67f9ae85739f5aedfa93dec68b7ce32e',
    },
    token: tokens.sx,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 50,
    lpSymbol: 'SING-WMATIC LP',
    lpAddresses: {
      137: '0x854d3639f38f65c091664062230091858955ddc2',
    },
    token: tokens.sing,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 49,
    lpSymbol: 'HAIR-WMATIC LP',
    lpAddresses: {
      137: '0x491c17b1b9aa867f3a7a480baffc0721d59a7393',
    },
    token: tokens.hair,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 8,
    lpSymbol: 'PolyDoge-WMATIC LP',
    lpAddresses: {
      137: '0x5d9d66ac0db91ec463fb3e9e5b1513dbff02fd0f',
    },
    token: tokens.polydoge,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 2,
    lpSymbol: 'USDT-WMATIC LP',
    lpAddresses: {
      137: '0x65D43B64E3B31965Cd5EA367D4c2b94c03084797',
    },
    token: tokens.usdt,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 48,
    lpSymbol: 'PEAR-WMATIC LP',
    lpAddresses: {
      137: '0xE35FBe6BFfb5dd0FA1A81D07967b4d6E6bcEDf4c',
    },
    token: tokens.pear,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 47,
    lpSymbol: 'PHX-WMATIC LP',
    lpAddresses: {
      137: '0xc0381c7ac185a8a9b6625c107ed048a26da9f1c7',
    },
    token: tokens.phx,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 45,
    lpSymbol: 'USDC-XDO LP',
    lpAddresses: {
      137: '0x398a0b2823be1bd42c36d96a750bd73511ae2217',
    },
    token: tokens.xdo,
    quoteToken: tokens.usdc,
  },
  {
    pid: 46,
    lpSymbol: 'USDC-xUSD LP',
    lpAddresses: {
      137: '0x9d5373d95e95ad9e47800f7959d4d8c195c35df1',
    },
    token: tokens.xusd,
    quoteToken: tokens.usdc,
  },
  {
    pid: 44,
    lpSymbol: 'PIRATEP-WMATIC LP',
    lpAddresses: {
      137: '0xed0ddb60b99a9d7b774e50cadb71fbd3e25768a9',
    },
    token: tokens.piratep,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 9,
    lpSymbol: 'JDI-WMATIC LP',
    lpAddresses: {
      137: '0xb01baf15079ee93590a862df37234e8f7c9825bf',
    },
    token: tokens.jdi,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 15,
    lpSymbol: 'FISH-WMATIC LP',
    lpAddresses: {
      137: '0x64d1393b53e3c4a8b04fb1dde2c7b40bc0897222',
    },
    token: tokens.fish,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 33,
    lpSymbol: 'TAKO-WMATIC LP',
    lpAddresses: {
      137: '0xd30f018e0dd3c9fd1ff5077a05d86ba82d04c73c',
    },
    token: tokens.tako,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 30,
    lpSymbol: 'TAPE-WMATIC LP',
    lpAddresses: {
      137: '0x54ba3183ef5dc7529213d7e2d83e79a27963ef0a',
    },
    token: tokens.tape,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 31,
    lpSymbol: 'HONOR-WMATIC LP',
    lpAddresses: {
      137: '0xcda8e98d5aa3be4e46f3b3b23e0e7defa4560439',
    },
    token: tokens.honor,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 36,
    lpSymbol: 'BSCGIRL-WMATIC LP',
    lpAddresses: {
      137: '0xf02cb3d08004999448384f87f1fc4a97845be741',
    },
    token: tokens.bscgirl,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 4,
    lpSymbol: 'WETH-WMATIC LP',
    lpAddresses: {
      137: '0x6cf8654e85ab489ca7e70189046d507eba233613',
    },
    token: tokens.eth,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 5,
    lpSymbol: 'LINK-WMATIC LP',
    lpAddresses: {
      137: '0xa8eca6cc6fb9f8cfa9d3b17d4997cce79e5110cf',
    },
    token: tokens.link,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 6,
    lpSymbol: 'AAVE-WMATIC LP',
    lpAddresses: {
      137: '0x42ed6d85ccf43859cbc46f6efa1f21e21cc24030',
    },
    token: tokens.aave,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 7,
    lpSymbol: 'CRV-WMATIC LP',
    lpAddresses: {
      137: '0x7433afe84df37d0954ff87d7f5788f124f8597f8',
    },
    token: tokens.crv,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 16,
    lpSymbol: 'USDT-WETH LP',
    lpAddresses: {
      137: '0x7b2dd4bab4487a303f716070b192543ea171d3b2',
    },
    token: tokens.eth,
    quoteToken: tokens.usdt,
  },
  {
    pid: 21,
    lpSymbol: 'SNX-WMATIC LP',
    lpAddresses: {
      137: '0x1807cac8576468d96a09a2c04fbdf6fdf0ed2a1d',
    },
    token: tokens.snx,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 26,
    lpSymbol: 'WBTC-WMATIC LP',
    lpAddresses: {
      137: '0xe82635a105c520fd58e597181cbf754961d51e3e',
    },
    token: tokens.btc,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 41,
    lpSymbol: 'BANANA',
    lpAddresses: {
      137: tokens.banana.address[137],
    },
    token: tokens.banana,
    quoteToken: tokens.banana,
    single: true,
  },
  {
    pid: 27,
    lpSymbol: 'USDT',
    lpAddresses: {
      137: tokens.usdt.address[137],
    },
    token: tokens.usdt,
    quoteToken: tokens.usdt,
    single: true,
  },
  {
    pid: 28,
    lpSymbol: 'WMATIC',
    lpAddresses: {
      137: tokens.wmatic.address[137],
    },
    token: tokens.wmatic,
    quoteToken: tokens.wmatic,
    single: true,
  },
  {
    pid: 29,
    lpSymbol: 'WETH',
    lpAddresses: {
      137: tokens.eth.address[137],
    },
    token: tokens.eth,
    quoteToken: tokens.eth,
    single: true,
  },
  {
    pid: 32,
    lpSymbol: 'pSPACE-WETH LP',
    lpAddresses: {
      137: '0x4e540fad17f1a51380Fa2BbA7185DBdF4f54A713',
    },
    token: tokens.pspace,
    quoteToken: tokens.eth,
  },
  {
    pid: 42,
    lpSymbol: 'WBUSD-WMATIC LP',
    lpAddresses: {
      137: '0x7888036ed1367010ee05e1b22d146ca42afb3601',
    },
    token: tokens.busd,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 10,
    lpSymbol: 'USDC-USDT LP',
    lpAddresses: {
      137: '0x9ec257c1862f1bdf0603a6c20ed6f3d6bae6deb0',
    },
    token: tokens.usdc,
    quoteToken: tokens.usdt,
  },
  {
    pid: 11,
    lpSymbol: 'DAI-USDT LP',
    lpAddresses: {
      137: '0xede04e0cd393a076c49deb95d3686a52ccc49c71',
    },
    token: tokens.dai,
    quoteToken: tokens.usdt,
  },
  {
    pid: 12,
    lpSymbol: 'DAI-USDC LP',
    lpAddresses: {
      137: '0x5b13b583d4317ab15186ed660a1e4c65c10da659',
    },
    token: tokens.dai,
    quoteToken: tokens.usdc,
  },
  {
    pid: 13,
    lpSymbol: 'WETH-USDC LP',
    lpAddresses: {
      137: '0x84964d9f9480a1db644c2b2d1022765179a40f68',
    },
    token: tokens.eth,
    quoteToken: tokens.usdc,
  },
  {
    pid: 14,
    lpSymbol: 'USDT-wBTC LP',
    lpAddresses: {
      137: '0xcdbcc1ac4d4e18fb1f2f2d604144fd33e77cda52',
    },
    token: tokens.btc,
    quoteToken: tokens.usdt,
  },
  {
    pid: 17,
    lpSymbol: 'AAVE-WETH LP',
    lpAddresses: {
      137: '0xbff538ad7c1fd067f5529bbc7aa3b403f66d70cf',
    },
    token: tokens.aave,
    quoteToken: tokens.eth,
  },
  {
    pid: 18,
    lpSymbol: 'LINK-WETH LP',
    lpAddresses: {
      137: '0xab291e39cd0f8235ba42a20a86f996a3f8b934e1',
    },
    token: tokens.link,
    quoteToken: tokens.eth,
  },
  {
    pid: 19,
    lpSymbol: 'CRV-WETH LP',
    lpAddresses: {
      137: '0x8bf34ff5945d519cf3eb4360e97585605c99daa6',
    },
    token: tokens.crv,
    quoteToken: tokens.eth,
  },
  {
    pid: 20,
    lpSymbol: 'SNX-WETH LP',
    lpAddresses: {
      137: '0x64d372dfed8c0be989d51c955b4bb2f8f848b461',
    },
    token: tokens.snx,
    quoteToken: tokens.eth,
  },
  {
    pid: 22,
    lpSymbol: 'SNX-USDC LP',
    lpAddresses: {
      137: '0x110bc65553bb8013b9db639fe269cc4ba5d3a9a9',
    },
    token: tokens.snx,
    quoteToken: tokens.usdc,
  },
  {
    pid: 23,
    lpSymbol: 'SNX-USDT LP',
    lpAddresses: {
      137: '0x44c2995a79d5a94d812792263e111e74bbec782d',
    },
    token: tokens.snx,
    quoteToken: tokens.usdt,
  },
  {
    pid: 24,
    lpSymbol: 'WBTC-USDC LP',
    lpAddresses: {
      137: '0x237ac473ac0ae4551019d9298a4118b3144f26a8',
    },
    token: tokens.btc,
    quoteToken: tokens.usdc,
  },
  {
    pid: 25,
    lpSymbol: 'WBTC-WETH LP',
    lpAddresses: {
      137: '0x8b6631324d4bb1759f708dde77e93ba898bb58c4',
    },
    token: tokens.btc,
    quoteToken: tokens.eth,
  },
  {
    pid: 35,
    lpSymbol: 'ROLL-WMATIC LP',
    lpAddresses: {
      137: '0x65c37f48781a555e2ad5542e4306ebab1ae93cd7',
    },
    token: tokens.roll,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 57,
    lpSymbol: 'COLLAR-WMATIC LP',
    lpAddresses: {
      137: '0x45cE6Bd7a2eF64bf980559C64e602B79f2a0d8f0',
    },
    token: tokens.collar,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 55,
    lpSymbol: 'GRAND-WMATIC LP',
    lpAddresses: {
      137: '0xEEa4e92b61cF87f9cf743ca14F3065b4e51Fdaa4',
    },
    token: tokens.grand,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 51,
    lpSymbol: 'AES-WMATIC LP',
    lpAddresses: {
      137: '0x509fa338650a707ff2f1ac7820535e1902daeac4',
    },
    token: tokens.aes,
    quoteToken: tokens.wmatic,
  },
  {
    pid: 59,
    lpSymbol: 'E8-WMATIC LP',
    lpAddresses: {
      137: '0x68a231d130fe6109cdc02ee931211eab13496991',
    },
    token: tokens.e8,
    quoteToken: tokens.wmatic,
  },
]

export default farms
