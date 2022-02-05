import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.crystl,
    earningToken: tokens.crystl,
    contractAddress: {
      137: '0xeBCC84D2A73f0c9E23066089C6C24F4629Ef1e6d',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.219354838709677',
    sortOrder: 1,
    isFinished: true,
  },
  {
    sousId: 144,
    stakingToken: tokens.crystl,
    earningToken: tokens.wmatic,
    contractAddress: {
      137: '0x2B511D808F5a601297EE96D595b73FD4D73d2BD4',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.002330827067669172',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 145,
    stakingToken: tokens.crystl,
    earningToken: tokens.death,
    contractAddress: {
      137: '0x27adb11af8a9f5e6a97edc406daffa4905e2ab76',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.020467836257309941',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 117,
    stakingToken: tokens.crystl,
    earningToken: tokens.banana,
    contractAddress: {
      137: '0x53aD400c310bEcd180fEF1D47630beCCE90039bf',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.003602631578947368',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 92,
    stakingToken: tokens.crystl,
    earningToken: tokens.banana,
    contractAddress: {
      137: '0x3dbB023ba26Da77267493238E36015a7936b10C9',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.002802631578947368',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 57,
    stakingToken: tokens.crystl,
    earningToken: tokens.banana,
    contractAddress: {
      137: '0x1a661012cBbEF1b3bE8ACb0f89f20F75eE064C10',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.001403508771929824',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 3,
    stakingToken: tokens.crystl,
    earningToken: tokens.banana,
    contractAddress: {
      137: '0xb51620eABFB567Ce383272b922E6ec663e86bdB0',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.006051587301587302',
    sortOrder: 4,
    isFinished: false,
  },
  {
    sousId: 32,
    stakingToken: tokens.crystl,
    earningToken: tokens.pwings,
    contractAddress: {
      137: '0xa31E7a8062ba644693b6EAA07bc88adb1a58124f',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.033258487654320987',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 142,
    stakingToken: tokens.crystl,
    earningToken: tokens.blu,
    contractAddress: {
      137: '0x6de32Bf80f7ebB9571B852432914b7c3155039e7',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '3.508771929824561403',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 141,
    stakingToken: tokens.crystl,
    earningToken: tokens.polydoge,
    contractAddress: {
      137: '0x39bbD398cC48f1Eb0EB0aEadaD8688d99b5DE103',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '164473.684210526315789473',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 139,
    stakingToken: tokens.crystl,
    earningToken: tokens.dogira,
    contractAddress: {
      137: '0xD80b0Ad2bD4A6069eD53BaB0DabEb56EfE6Ad4cF',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '1.169590643',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 138,
    stakingToken: tokens.crystl,
    earningToken: tokens.wmatic,
    contractAddress: {
      137: '0x734980a6Aac72b53BaFd49FC7771e11426891C77',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.001701754385964912',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 137,
    stakingToken: tokens.crystl,
    earningToken: tokens.wcro,
    contractAddress: {
      137: '0x3E60f46238dDE7E7fF14c4274D4C465b806D04Ae',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.003356140350877192',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 136,
    stakingToken: tokens.crystl,
    earningToken: tokens.bnb,
    contractAddress: {
      137: '0x919f801A143219dddCe61a6d27DE87435000aC7C',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000002254385964912',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 135,
    stakingToken: tokens.crystl,
    earningToken: tokens.welt,
    contractAddress: {
      137: '0x6CBD0e94508a805C511e6594cD009AF39D02db45',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.4298245614035088',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 134,
    stakingToken: tokens.crystl,
    earningToken: tokens.mimir,
    contractAddress: {
      137: '0x61A79e1f8617E643a12E81C45C658B6C08b8E864',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.00935672514619883',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 133,
    stakingToken: tokens.crystl,
    earningToken: tokens.pqbert,
    contractAddress: {
      137: '0xf256157bB042E90960E3156b00DeC8361F8388f3',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.049707602339181286',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 132,
    stakingToken: tokens.crystl,
    earningToken: tokens.polygas,
    contractAddress: {
      137: '0x0c4bd00e89f010dbff6e0f7c2a2a914c3e8ea1d3',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '7614',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 131,
    stakingToken: tokens.crystl,
    earningToken: tokens.kom,
    contractAddress: {
      137: '0x5729f57dbcd87d4d4e737e08e42035b5e4619922',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '1.66228070',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 129,
    stakingToken: tokens.crystl,
    earningToken: tokens.relay,
    contractAddress: {
      137: '0x7a3F55B95FF4fbd5E4634031B8dcCb7AE58b30AB',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.003508771929824561',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 128,
    stakingToken: tokens.crystl,
    earningToken: tokens.usdt,
    contractAddress: {
      137: '0x07e68bf9dbc6e4E2a6166358AC8bEe686E82a44A',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.001316',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 126,
    stakingToken: tokens.crystl,
    earningToken: tokens.eth,
    contractAddress: {
      137: '0x50cc54FC4750d70294Ed435cFFF1840010812002',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000000557121052631',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 125,
    stakingToken: tokens.crystl,
    earningToken: tokens.frm,
    contractAddress: {
      137: '0x07BA4C130F5B7465B99919024b1d681f2EBb53D0',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.038114584371032964',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 124,
    stakingToken: tokens.crystl,
    earningToken: tokens.pbrew,
    contractAddress: {
      137: '0xB2f290d86C37b2955665a8aF960bcA523ebDe256',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.112280701754385964',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 123,
    stakingToken: tokens.crystl,
    earningToken: tokens.blu,
    contractAddress: {
      137: '0x67fF78176a247f643dB4bC4EA5b8FfF2fBe618B8',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '1.949317543859649122',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 122,
    stakingToken: tokens.crystl,
    earningToken: tokens.shib,
    contractAddress: {
      137: '0xD8493b01d9d406Fd15f8cB4729Cc3f06d49d2699',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '34.932902631578947368',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 121,
    stakingToken: tokens.crystl,
    earningToken: tokens.four,
    contractAddress: {
      137: '0xbf327Ed476B7A24af9189199c938d4C0887F7BA0',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '1.448040020175438464',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 120,
    stakingToken: tokens.crystl,
    earningToken: tokens.crv,
    contractAddress: {
      137: '0x6B5E1652153dc2d5d974d88f50FaeE7c14755752',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000319298245614035',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 119,
    stakingToken: tokens.crystl,
    earningToken: tokens.mana,
    contractAddress: {
      137: '0x097aF1e9e8Ba65Ef97dE298DB5ECF40DA775dad4',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000309649122807017',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 118,
    stakingToken: tokens.crystl,
    earningToken: tokens.btc,
    contractAddress: {
      137: '0x727003B37A1cF05A1A70c92acb64e92ecf89e3ae',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.00000007',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 116,
    stakingToken: tokens.crystl,
    earningToken: tokens.dai,
    contractAddress: {
      137: '0x84d7c2F49f656Ee3c738e941Bf6b18F24d467c51',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.003508771929824561',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 115,
    stakingToken: tokens.crystl,
    earningToken: tokens.wmatic,
    contractAddress: {
      137: '0x266fb02d8ec8873Ff50c744a41050d443689DAf6',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.002214912280701754',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 114,
    stakingToken: tokens.crystl,
    earningToken: tokens.busd,
    contractAddress: {
      137: '0x3896dcA567BA8B5dd98282e9467869E2f7043947',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.00087719298245614',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 113,
    stakingToken: tokens.crystl,
    earningToken: tokens.link,
    contractAddress: {
      137: '0x20fc4a459b40C8eF16a3d2b4c4d13Ad8696603ff',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000043991228070175',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 112,
    stakingToken: tokens.crystl,
    earningToken: tokens.aave,
    contractAddress: {
      137: '0x2b1ccFEF3bD0A8e3E8C3C15f32e8C530a68c56Ef',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000003903508771929',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 111,
    stakingToken: tokens.crystl,
    earningToken: tokens.bnb,
    contractAddress: {
      137: '0xc9cdf49667a2184957F51A170a1aD0e36dD083Ed',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000007280701754385',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 109,
    stakingToken: tokens.crystl,
    earningToken: tokens.usdc,
    contractAddress: {
      137: '0x84b40ab075e830ebcc5a3f57ad8ab95661e95468',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.003508',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 108,
    stakingToken: tokens.crystl,
    earningToken: tokens.sx,
    contractAddress: {
      137: '0x6Ba67214287020c66eBBb23f8AA3bb2214D19D64',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.03985438596491228',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 106,
    stakingToken: tokens.crystl,
    earningToken: tokens.kom,
    contractAddress: {
      137: '0x3de5EB476749ed8528950daE198B441C6C1c93Ae',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '11.40350877',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 104,
    stakingToken: tokens.crystl,
    earningToken: tokens.usdt,
    contractAddress: {
      137: '0x20251F0C062d2A0a9dDAA5a9a132DCfE2B5520C8',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.003508',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 102,
    stakingToken: tokens.crystl,
    earningToken: tokens.polygas,
    contractAddress: {
      137: '0x0fCb6Bc6f46cEc0748D5bEA7492266f603542d50',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '5921.052632000000000000',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 101,
    stakingToken: tokens.crystl,
    earningToken: tokens.eth,
    contractAddress: {
      137: '0xcf73d8cbf3bccb07994384de6182b13938350c0b',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000001850982456140',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 100,
    stakingToken: tokens.crystl,
    earningToken: tokens.sol,
    contractAddress: {
      137: '0x579c5eafdb0f74fce522ca3ac803b79392576d4e',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000005438596491228',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 99,
    stakingToken: tokens.crystl,
    earningToken: tokens.e8,
    contractAddress: {
      137: '0xe8047dfa5ea257151734154997f4d31637009b3f',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '4080132.026328439',
    sortOrder: 1,
    isFinished: true,
    enableEmergencyWithdraw: true,
  },
  {
    sousId: 98,
    stakingToken: tokens.crystl,
    earningToken: tokens.crv,
    contractAddress: {
      137: '0x89AF67fF657a834942F21b7e1033184A1A80706e',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000486842105263157',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 96,
    stakingToken: tokens.crystl,
    earningToken: tokens.btc,
    contractAddress: {
      137: '0xC213E4bD26c117aE67FECFD45307cA2BBF888e64',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.00000009',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 95,
    stakingToken: tokens.crystl,
    earningToken: tokens.axs,
    contractAddress: {
      137: '0x30D289d76af90ae4Ae60807820742FFc49C6DD51',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000058333333333333',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 94,
    stakingToken: tokens.crystl,
    earningToken: tokens.azuki,
    contractAddress: {
      137: '0xc4B2ee83a0a28dd4E34387B8B61d070a4C3117dd',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.35087719298245614',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 91,
    stakingToken: tokens.crystl,
    earningToken: tokens.collar,
    contractAddress: {
      137: '0x3CF73a743BE5746477D9E639eb1ABAec32931daE',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.001962280701754385',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 90,
    stakingToken: tokens.crystl,
    earningToken: tokens.polydoge,
    contractAddress: {
      137: '0xbd33a0f2e6099cf78a75330c976f29289292b747',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '1865350.87719298245614035',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 89,
    stakingToken: tokens.crystl,
    earningToken: tokens.dai,
    contractAddress: {
      137: '0xf44f0b21a0fd01d022a4d87248ced3a7bc4ed464',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.003508771929824561',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 86,
    stakingToken: tokens.crystl,
    earningToken: tokens.wmatic,
    contractAddress: {
      137: '0xe6c814f48321026c2f674b600461f7cb5d1297a8',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.005671052631578947',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 85,
    stakingToken: tokens.crystl,
    earningToken: tokens.busd,
    contractAddress: {
      137: '0x4b5b8aee0b744d1a24e2630e58872ad4831ba877',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.003378947368421052',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 84,
    stakingToken: tokens.crystl,
    earningToken: tokens.pbrew,
    contractAddress: {
      137: '0x756BbD1510A99114F9D30Ba40688556331CFa58c',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.010087719298245614',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 83,
    stakingToken: tokens.crystl,
    earningToken: tokens.libra,
    contractAddress: {
      137: '0x0573CBFc765E07bf8Aef998dB60091F85A525C34',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.004353383458646616',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 82,
    stakingToken: tokens.crystl,
    earningToken: tokens.avax,
    contractAddress: {
      137: '0xA63baB4C70edD3A498F42258418d2CB09E276e53',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000072184210526315',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 81,
    stakingToken: tokens.crystl,
    earningToken: tokens.link,
    contractAddress: {
      137: '0x321DFDe92fe100754EED945a52163A326eFD0002',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000055263157894736',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 80,
    stakingToken: tokens.crystl,
    earningToken: tokens.aave,
    contractAddress: {
      137: '0x3635F22819649294d4c859fFd706Fb37b1f0fe80',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.00000438596491228',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 79,
    stakingToken: tokens.crystl,
    earningToken: tokens.bnb,
    contractAddress: {
      137: '0x0702fC5b57c1149569ba512912FfeaCf84d97674',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000009236842105263',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 78,
    stakingToken: tokens.crystl,
    earningToken: tokens.usdc,
    contractAddress: {
      137: '0xc392121bc2cd1a9e24bb84461a72a0300565ef4f',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.003508',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 77,
    stakingToken: tokens.crystl,
    earningToken: tokens.dogira,
    contractAddress: {
      137: '0xE32C16F9D65eb42BC470abC3149399D3BE9b28bb',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '2.368421052',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 76,
    stakingToken: tokens.crystl,
    earningToken: tokens.pqbert,
    contractAddress: {
      137: '0x75d5cde08709279cf41bf13daf35874b1648de8c',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.057017543859649122',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 75,
    stakingToken: tokens.crystl,
    earningToken: tokens.grand,
    contractAddress: {
      137: '0xa200765d001e9d414c18f2f4461ad583e07a46c8',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000486842105263157',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 72,
    stakingToken: tokens.crystl,
    earningToken: tokens.usdt,
    contractAddress: {
      137: '0x712932Cb206A97bD516e1E50ed5fFE6d5fb4c75D',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.003508',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 68,
    stakingToken: tokens.crystl,
    earningToken: tokens.gbnt,
    contractAddress: {
      137: '0x046863f74b8dC65a31B5c54f7a59E87b4A06e378',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.135964912280701754',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 67,
    stakingToken: tokens.crystl,
    earningToken: tokens.gpul,
    contractAddress: {
      137: '0xb2e2bc33de72cd2e20408d7fdd9e46c7e61ff3f8',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.219298245614035087',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 66,
    stakingToken: tokens.crystl,
    earningToken: tokens.eth,
    contractAddress: {
      137: '0xF26914ea34EE64A439caAaBb1FACf9f063c7B234',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000001910526315789',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 65,
    stakingToken: tokens.crystl,
    earningToken: tokens.sol,
    contractAddress: {
      137: '0x90c4b626596019652fe4c6fa8596d7d8dd2e0e07',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000006728070175438',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 59,
    stakingToken: tokens.crystl,
    earningToken: tokens.btc,
    contractAddress: {
      137: '0xB702eAf2E3A8FBbF226f6fcc4E625C8FB34F8a79',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.00000009',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 58,
    stakingToken: tokens.crystl,
    earningToken: tokens.usdc,
    contractAddress: {
      137: '0xF558Ee7460775cAb4bfbE25d636a2D69ba5602b8',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.005263',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 55,
    stakingToken: tokens.crystl,
    earningToken: tokens.sx,
    contractAddress: {
      137: '0x889bf2e378fbbf7bd3decae1e40732615e8d58d9',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.047017543859649122',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 53,
    stakingToken: tokens.crystl,
    earningToken: tokens.wmatic,
    contractAddress: {
      137: '0xc9d16eb1f510609418d0e83d95e67a22087c9d09',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.003089473684210526',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 51,
    stakingToken: tokens.crystl,
    earningToken: tokens.dai,
    contractAddress: {
      137: '0x195ada858f1243dd3eD139057dB50517c465aE76',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.003508771929824561',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 49,
    stakingToken: tokens.crystl,
    earningToken: tokens.sandman,
    contractAddress: {
      137: '0x114047F7815D8810f6642B7cC37a66327eE479d2',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.006541353383458646',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 48,
    stakingToken: tokens.crystl,
    earningToken: tokens.link,
    contractAddress: {
      137: '0xcDB7be6932e6B8f2117Fb54B601a8FB3CBd80640',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000045438596491228',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 46,
    stakingToken: tokens.crystl,
    earningToken: tokens.bnb,
    contractAddress: {
      137: '0xedA52e46B73d7B0fd31543d6213F3Bd8a38C59AF',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000007719298245614',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 41,
    stakingToken: tokens.crystl,
    earningToken: tokens.sing,
    contractAddress: {
      137: '0xc372f6De267C96d7c48a19Ebd79697d7b2CaCE68',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.00614055331',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 39,
    stakingToken: tokens.crystl,
    earningToken: tokens.hair,
    contractAddress: {
      137: '0x1Cc6E94F30f40C6C2814fB96EC44902475F37229',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.065789473684210526',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 36,
    stakingToken: tokens.crystl,
    earningToken: tokens.phx,
    contractAddress: {
      137: '0xd11FB7dAe73B6808E992AB8CF0Ef7978955CcF56',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.034722222222222222',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 34,
    stakingToken: tokens.crystl,
    earningToken: tokens.pear,
    contractAddress: {
      137: '0xB6177C32AdCd9138d46fB227C704693775EE61A0',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.003950617283950617',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 9,
    stakingToken: tokens.crystl,
    earningToken: tokens.eth,
    contractAddress: {
      137: '0x90eAE8A0aE866979C3218860226acCd617a828fB',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000005787037037037037',
    sortOrder: 3,
    isFinished: false,
  },
  {
    sousId: 1,
    stakingToken: tokens.crystl,
    earningToken: tokens.usdc,
    contractAddress: {
      137: '0x4E9e19B2943c74A2A6f801Be0421eD3c563b83E9',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '.008267',
    sortOrder: 2,
    isFinished: false,
  },
  {
    sousId: 26,
    stakingToken: tokens.crystl,
    earningToken: tokens.spade,
    contractAddress: {
      137: '0x9e1DFDAeCb960cEc24af14341221Af619257fd43',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000120679012345679',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 2,
    stakingToken: tokens.crystl,
    earningToken: tokens.jdi,
    contractAddress: {
      137: '0x80163Ae2ed3f0f572F580E9749A57A4d999e3F5b',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.04133597883597884',
    sortOrder: 3,
    isFinished: false,
  },
  {
    sousId: 13,
    stakingToken: tokens.crystl,
    earningToken: tokens.roll,
    contractAddress: {
      137: '0x6fEB23d31e017481B52Ee08ED3268f6D3148fF9a',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.24970987654320986',
    sortOrder: 6,
    isFinished: false,
  },
  {
    sousId: 28,
    stakingToken: tokens.crystl,
    earningToken: tokens.piratep,
    contractAddress: {
      137: '0x3E02F4d0cfFEF88a224CE51A14622d1fe30847a4',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.115740740740740740',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 6,
    stakingToken: tokens.crystl,
    earningToken: tokens.omen,
    contractAddress: {
      137: '0xaD32b37c8E7C1eC187a0C653E3F630D2B0E0689A',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.08930941358024691',
    sortOrder: 7,
    isFinished: false,
  },
  {
    sousId: 30,
    stakingToken: tokens.crystl,
    earningToken: tokens.omen,
    contractAddress: {
      137: '0x8149628c2b5D127C07772a6042D95DF4555B5193',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.220402777777777777',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 4,
    stakingToken: tokens.crystl,
    earningToken: tokens.wmatic,
    contractAddress: {
      137: '0xDE771a3445d60AB734E14F2e4Aa1aAac6D724403',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.007716049382716049',
    sortOrder: 5,
    isFinished: false,
  },
  {
    sousId: 5,
    stakingToken: tokens.crystl,
    earningToken: tokens.fish,
    contractAddress: {
      137: '0x03A6c95Be4d1CeFD51511C0A7ce6be66f0Aa4957',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000569444444444444',
    sortOrder: 6,
    isFinished: false,
  },

  {
    sousId: 7,
    stakingToken: tokens.crystl,
    earningToken: tokens.tako,
    contractAddress: {
      137: '0xf815904d78D48E877616c7760d6B23933ad522C7',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.011952932098765428',
    sortOrder: 8,
    isFinished: false,
  },
  {
    sousId: 10,
    stakingToken: tokens.crystl,
    earningToken: tokens.honor,
    contractAddress: {
      137: '0x7c238f6E30F58d4F52C2C87FD36191Bb9853af24',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.23148148148148148',
    sortOrder: 5,
    isFinished: false,
  },
  {
    sousId: 11,
    stakingToken: tokens.crystl,
    earningToken: tokens.dai,
    contractAddress: {
      137: '0x6810022De877DDd10D0592800a2BF3ECCf9A9cE5',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.007716049382716049',
    sortOrder: 5,
    isFinished: false,
  },
  {
    sousId: 12,
    stakingToken: tokens.crystl,
    earningToken: tokens.snx,
    contractAddress: {
      137: '0x3c2148b4B023a801A228eb2624D7e463c7e10Ccc',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.0011574074074074073',
    sortOrder: 5,
    isFinished: false,
  },
  {
    sousId: 14,
    stakingToken: tokens.crystl,
    earningToken: tokens.bscgirl,
    contractAddress: {
      137: '0x6F4C372443C5b73320cf9c15D0d4Fa54BAE25045',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.38580246',
    sortOrder: 7,
    isFinished: false,
  },
  {
    sousId: 16,
    stakingToken: tokens.crystl,
    earningToken: tokens.btc,
    contractAddress: {
      137: '0x0f0f04a2e28E2E54572C14985DA86a8370542b2a',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.00000022',
    sortOrder: 9,
    isFinished: false,
  },
  {
    sousId: 17,
    stakingToken: tokens.crystl,
    earningToken: tokens.usdt,
    contractAddress: {
      137: '0xB62705EDC09558FdF9C6cCc59acFacE653801c09',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.007716',
    sortOrder: 10,
    isFinished: false,
  },
  {
    sousId: 18,
    stakingToken: tokens.crystl,
    earningToken: tokens.bnb,
    contractAddress: {
      137: '0x3b38f94200Eb02E693897b3D66761adB1d12a9dd',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000024520061728395',
    sortOrder: 11,
    isFinished: false,
  },
  {
    sousId: 20,
    stakingToken: tokens.crystl,
    earningToken: tokens.cosmic,
    contractAddress: {
      137: '0x40592ce2161CCb5498A2004D755a513E23439c42',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.001929012345679012',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 22,
    stakingToken: tokens.crystl,
    earningToken: tokens.link,
    contractAddress: {
      137: '0x25629ef73c82e018Ab214E7683a9D416f57471aA',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000413580246913580',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 23,
    stakingToken: tokens.crystl,
    earningToken: tokens.busd,
    contractAddress: {
      137: '0x77784ccd9df8079CEE6f5D9E3B93078dcCAB08a6',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.003858024691358024',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 25,
    stakingToken: tokens.crystl,
    earningToken: tokens.mana,
    contractAddress: {
      137: '0xCB841c75884DeBAABD2b3a509d77DBfbc57958Ed',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.001055555555555555',
    sortOrder: 1,
    isFinished: false,
  },

  {
    sousId: 27,
    stakingToken: tokens.crystl,
    earningToken: tokens.neptune,
    contractAddress: {
      137: '0xcB2B989BFb69Be64ccf4Bd6F92Fe4A77576Aa63f',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.0000771604938271604',
    sortOrder: 1,
    isFinished: false,
  },

  {
    sousId: 29,
    stakingToken: tokens.crystl,
    earningToken: tokens.sol,
    contractAddress: {
      137: '0x2317c46D6065d0677018aBddA1e98Ec89c084716',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000109567901234567',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 143,
    stakingToken: tokens.crystl,
    earningToken: tokens.destiny,
    contractAddress: {
      137: '0x2e2fa5CfE95EE72cbD0b0E901fC125cb9dFa0b9a',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.032894736842105263',
    sortOrder: 1,
    isFinished: false,
    gemPool: true,
  },
  {
    sousId: 140,
    stakingToken: tokens.crystl,
    earningToken: tokens.desire,
    contractAddress: {
      137: '0x1e4Cf41272eED4B2398503094fCEF6856072AFD6',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.021531100478468899',
    sortOrder: 1,
    isFinished: false,
    gemPool: true,
  },
  {
    sousId: 130,
    stakingToken: tokens.crystl,
    earningToken: tokens.salsa,
    contractAddress: {
      137: '0x7f818c8280080f2d116c3d5db7676af8ea1bdc7f',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.002455357142857142',
    sortOrder: 1,
    isFinished: false,
    gemPool: true,
  },
  {
    sousId: 127,
    stakingToken: tokens.crystl,
    earningToken: tokens.destruction,
    contractAddress: {
      137: '0xb271F11f200c69eA20D216e37Dd89e4B9B8DD6Ef',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.00037593984962406',
    sortOrder: 1,
    isFinished: false,
    gemPool: true,
  },
  {
    sousId: 93,
    stakingToken: tokens.crystl,
    earningToken: tokens.proto,
    contractAddress: {
      137: '0xC247A53e02E5Ad873cfb6bBF3BbDaB3755409e60',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.011203922263157894',
    sortOrder: 1,
    isFinished: false,
    gemPool: true,
  },
  {
    sousId: 87,
    stakingToken: tokens.crystl,
    earningToken: tokens.polygas,
    contractAddress: {
      137: '0xce003Cd00869464f81faacD15919e3eCe0c36f77',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '15789.473684210526315789',
    sortOrder: 1,
    isFinished: false,
    gemPool: true,
  },
  {
    sousId: 70,
    stakingToken: tokens.crystl,
    earningToken: tokens.polygas,
    contractAddress: {
      137: '0x28Cbe670654bA9e6c7df1A679EC4948BD87A21C5',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '54511.278195488721804511',
    sortOrder: 1,
    isFinished: false,
    gemPool: true,
  },
  {
    sousId: 69,
    stakingToken: tokens.crystl,
    earningToken: tokens.arablelands,
    contractAddress: {
      137: '0x4D6e2BAE414383b2d6B0167971638860869bdA83',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '276.846858928571409774',
    sortOrder: 1,
    isFinished: false,
    gemPool: true,
  },
  {
    sousId: 52,
    stakingToken: tokens.crystl,
    earningToken: tokens.quokk,
    contractAddress: {
      137: '0x818ab7Ff2153B2fab9fA7D97D749F2B77dEFC34b',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.078657894736842105',
    sortOrder: 1,
    isFinished: false,
    gemPool: true,
  },
  {
    sousId: 42,
    stakingToken: tokens.crystl,
    earningToken: tokens.time,
    contractAddress: {
      137: '0x226Cc9E1b6D33b79cB90Bf5F7dE24feD7Af2342C',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.00112781954887218',
    sortOrder: 1,
    isFinished: false,
    gemPool: true,
  },
  {
    sousId: 40,
    stakingToken: tokens.crystl,
    earningToken: tokens.wand,
    contractAddress: {
      137: '0x3c5A1be8704A3a59d2f8861AcE9BBA828B0A2f38',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.001632864661654135',
    sortOrder: 1,
    isFinished: false,
    gemPool: true,
  },
  {
    sousId: 38,
    stakingToken: tokens.crystl,
    earningToken: tokens.ham,
    contractAddress: {
      137: '0xa76716927598987d0180dd8fCBB959C450853d3B',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.000992063492063492',
    sortOrder: 1,
    isFinished: false,
    gemPool: true,
  },
  {
    sousId: 31,
    stakingToken: tokens.crystl,
    earningToken: tokens.teabag,
    contractAddress: {
      137: '0x885A74Bc304c9FC2512D4b621Da8d2812c2B19f5',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.002777777777777777',
    sortOrder: 1,
    isFinished: false,
    gemPool: true,
  },
]

export default pools