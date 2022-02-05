import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'
import tokens from './constants/tokens'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const BSC_BLOCK_TIME = 2

export const CRYSTL_PER_BLOCK = new BigNumber(0)
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365) // 10512000
export const CRYSTL_PER_YEAR = CRYSTL_PER_BLOCK.times(BLOCKS_PER_YEAR)
export const BASE_URL = 'https://crystl.finance'
export const BASE_EXCHANGE_URL = `https://${process.env.REACT_APP_BASE_EXCHANGE_DOMAIN}`
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/pool`
export const BASE_BSC_SCAN_URL = 'https://polygonscan.com'
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50
export const LOTTERY_TICKET_PRICE = 1
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 1000000
export const DEFAULT_VAULT_GAS_LIMIT = 10000000
export const DEFAULT_GAS_PRICE = 40
export const TESTNET_CHAIN_ID = '97'
export const MAINNET_CHAIN_ID = '137'

// VAULT CONFIGS
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const DAILY_COMPOUND_FREQUENCY = 1.5 // it represents what compounder it's doing in average.
export const PERFORMANCE_FEE = 5
export const WITHDRAWAL_FEE = 0.001
export const TOKEN_PER_BLOCK_MAP = {
  '0x1948abC5400Aa1d72223882958Da3bec643fb4E5': 'dinoPerBlock',
  '0x4e22399070aD5aD7f7BEb7d3A7b543e8EcBf1d85': 'cakePerBlock',
  '0xC6Ae34172bB4fC40c49C3f53badEbcE3Bb8E6430': 'hairPerBlock',
  '0x0d17C30aFBD4d29EEF3639c7B1F009Fd6C9f1F72': 'BONE_PER_BLOCK',
  '0xC8Bd86E5a132Ac0bf10134e270De06A8Ba317BFe': 'wexPerBlock',
  '0x90AB4f52bD975DcB17965666c98FC908fA173d31': 'kavianPerBlock',
  '0xA375495919205251a05f3B259B4D3cc30a4d3ED5': 'gammaPulsarPerBlock',
  '0xB19300246e19929a617C4260189f7B759597B8d8': 'takoPerBlock',
  '0x3C58EA8D37f4fc6882F678f822E383Df39260937': 'rollPerBlock',
  '0x21BE35019F1b2C89Baab802fbA72F20b25435087': 'LibraPerBlock',
  '0xca2DeAc853225f5a4dfC809Ae0B7c6e39104fCe5': 'brewPerBlock',
  '0x85A025BA2C054117Bc53666342F8A0Be08C38A9F': 'destructionPerBlock',
  '0xDe1c7b7126aada7bBaDb28C79c5FB20Ba667b85F': 'salsaPerBlock',
  '0xa6f5d8eD74eaab164cddAe9eabE1Fd2900132B8a': 'desirePerBlock',
  '0x06Aeddc58d6148ECF2F199Bd0f57876e5f94Bcb8': 'destinyPerBlock',
  '0x08bdDc6f5Ed8C8B3A472513bD831c61cE0f24804': 'sandManPerSecond',
}

export const FARMS = {
  '0x1948abC5400Aa1d72223882958Da3bec643fb4E5': 'Dinoswap',
  '0x4e22399070aD5aD7f7BEb7d3A7b543e8EcBf1d85': 'Jetswap',
  '0xC6Ae34172bB4fC40c49C3f53badEbcE3Bb8E6430': 'Barbershop',
  '0x0d17C30aFBD4d29EEF3639c7B1F009Fd6C9f1F72': 'Boneswap',
  '0xC8Bd86E5a132Ac0bf10134e270De06A8Ba317BFe': 'Waultswap',
  '0x90AB4f52bD975DcB17965666c98FC908fA173d31': 'Kavian',
  '0xA375495919205251a05f3B259B4D3cc30a4d3ED5': 'Polypulsar',
  '0xB19300246e19929a617C4260189f7B759597B8d8': 'TakoDefi',
  '0x3C58EA8D37f4fc6882F678f822E383Df39260937': 'Polyroll',
  '0x21BE35019F1b2C89Baab802fbA72F20b25435087': 'Libra',
  '0xca2DeAc853225f5a4dfC809Ae0B7c6e39104fCe5': 'Cafeswap',
  '0x85A025BA2C054117Bc53666342F8A0Be08C38A9F': 'Destruction',
  '0xDe1c7b7126aada7bBaDb28C79c5FB20Ba667b85F': 'Salsa',
  '0xa6f5d8eD74eaab164cddAe9eabE1Fd2900132B8a': 'Desire',
  '0x06Aeddc58d6148ECF2F199Bd0f57876e5f94Bcb8': 'Destiny',
  '0x08bdDc6f5Ed8C8B3A472513bD831c61cE0f24804': 'Death',
}

export const FARM_SITES = {
  '0x1948abC5400Aa1d72223882958Da3bec643fb4E5': 'https://dinoswap.exchange',
  '0x4e22399070aD5aD7f7BEb7d3A7b543e8EcBf1d85': 'https://polygon.jetswap.finance',
  '0xC6Ae34172bB4fC40c49C3f53badEbcE3Bb8E6430': 'https://www.barbershop.finance/',
  '0x0d17C30aFBD4d29EEF3639c7B1F009Fd6C9f1F72': 'https://farm.boneswap.finance',
  '0xC8Bd86E5a132Ac0bf10134e270De06A8Ba317BFe': 'https://app.wault.finance/polygon/',
  '0x90AB4f52bD975DcB17965666c98FC908fA173d31': 'https://kavian.finance/',
  '0xA375495919205251a05f3B259B4D3cc30a4d3ED5': 'https://gamma.polypulsar.farm/',
  '0xB19300246e19929a617C4260189f7B759597B8d8': 'https://takodefi.com/',
  '0x3C58EA8D37f4fc6882F678f822E383Df39260937': 'https://polyroll.org',
  '0x21BE35019F1b2C89Baab802fbA72F20b25435087': 'https://libra.astrofarms.finance',
  '0xca2DeAc853225f5a4dfC809Ae0B7c6e39104fCe5': 'https://polygon.cafeswap.finance/',
  '0x85A025BA2C054117Bc53666342F8A0Be08C38A9F': 'https://app.destruction.sandman.finance/',
  '0xDe1c7b7126aada7bBaDb28C79c5FB20Ba667b85F': 'https://salsa.tacoparty.finance/',
  '0xa6f5d8eD74eaab164cddAe9eabE1Fd2900132B8a': 'https://app.desire.sandman.finance/',
  '0x06Aeddc58d6148ECF2F199Bd0f57876e5f94Bcb8': 'https://app.destiny.sandman.finance/',
  '0x08bdDc6f5Ed8C8B3A472513bD831c61cE0f24804': 'https://app.death.sandman.finance/',
}

export const PROJECT_SITES = {
  '0xB394009787C2d0cb5B45D06E401a39648e21D681': tokens.hair.projectLink,
  '0x491C17B1b9Aa867f3A7A480bAFFC0721d59A7393': tokens.hair.projectLink,
  '0xB8e54c9Ea1616beEBe11505a419DD8dF1000E02a': tokens.crystl.projectLink,
  '0x44b82c02F404Ed004201FB23602cC0667B1D011e': tokens.banana.projectLink,
  '0x854D3639F38F65c091664062230091858955Ddc2': tokens.sing.projectLink,
  '0x1bF9805B40a5f69c7d0f9E5d1Ab718642203c652': tokens.sx.projectLink,
  '0x173E90f2a94Af3b075DeEC7e64Df4d70EfB4Ac3D': 'https://pbs.twimg.com/media/EWYbP7DXQAMDgz5?format=jpg&name=large',
  '0x20BF018FDDBa3b352f3d913FE1c81b846fE0F490': tokens.usdc.projectLink,
  '0x0A4374b0D63597a5d314aD65fB687892bcaAB22e': tokens.kavian.projectLink,
  '0xc6fCd85DDd4A301C9BabFfeFC07dAdDDf7b413a4': tokens.gpul.projectLink,
  '0x5bfd0CA929aC41e110B709a5be069Cb7D5D8A15e': tokens.inku.projectLink,
  '0xd30f018e0DD3c9FD1fF5077a05D86bA82d04c73C': tokens.tako.projectLink,
  '0xC5Ad09A1317c3F40e45076F9114D5e951b97a343': tokens.piratep.projectLink,
  '0x65C37f48781a555e2AD5542e4306ebAb1Ae93Cd7': tokens.roll.projectLink,
  '0xd883c361d1e8a7e1f77d38e0a6e45d897006b798': tokens.gbnt.projectLink,
  '0x082b58350a04D8D38b4BCaE003BB1191b9aae565': tokens.kom.projectLink,
  '0x034293F21F1cCE5908BC605CE5850dF2b1059aC0': tokens.banana.projectLink,
  '0xa1B5E9ec859fEaCCCEE12697a9b2655d10212c74': tokens.libra.projectLink,
  '0xCBBe4DA39C1403601f65eFD45FCD8c793ADc48E1': tokens.libra.projectLink,
  '0xd0985A2E8410c03B3bB0D7997DA433428D58342f': tokens.azuki.projectLink,
  '0x92Bb3233F59561FC1fEC53EfC3339E4Af8E917F4': tokens.azuki.projectLink,
  '0x9cb31B03089eca4C0f42554256d0217326D15AE7': tokens.doki.projectLink,
  '0xcCeD5cB001D6081c4561bf7911F11Ccd9aAA1474': tokens.doki.projectLink,
  '0x5b13B583D4317aB15186Ed660A1E4C65C10da659': tokens.usdc.projectLink,
  '0x0359001070cF696D5993E0697335157a6f7dB289': tokens.bnb.projectLink,
  '0xe82635a105c520fd58e597181cBf754961d51E3e': tokens.btc.projectLink,
  '0x65D43B64E3B31965Cd5EA367D4c2b94c03084797': tokens.usdt.projectLink,
  '0x6Cf8654e85AB489cA7e70189046D507ebA233613': 'https://pbs.twimg.com/media/EWYbP7DXQAMDgz5?format=jpg&name=large',
  '0x436803355d26943DD0BC9826D39F9079199a890a': tokens.link.projectLink,
  '0x4fd19e59A1041e82aCB3Ecc6773EE99913076868': tokens.btc.projectLink,
  '0x80F93221e875D14aeDdFdFC778Ca755Ab3562ce3': tokens.aave.projectLink,
  '0x723e866989Cacc8EFC346e1DCf5a9D73572bCFc8': tokens.pbrew.projectLink,
  '0x5356D0F2E8B22FF6133e11762600984d819b15d1': 'https://pbs.twimg.com/media/EWYbP7DXQAMDgz5?format=jpg&name=large',
  '0xBB0dbC0e2B6fBeF902BC046ECFC2D664658BaafC': tokens.usdc.projectLink,
  '0xFCcabD913DF5a17721c30bF23fEB7eA865422f45': tokens.ust.projectLink,
  '0xd32f3139A214034A0f9777c87eE0a064c1FF6AE2': tokens.dai.projectLink,
  '0x3EF3a87d745FABCAc255E9352Ea402d20F922C1C': tokens.pbrew.projectLink,
  '0xc7f1B47F4ed069E9B34e6bD59792B8ABf5a66339': tokens.usdt.projectLink,
  '0x6C6aC1C806379877b6a4ea236b47890b9d195aE4': tokens.quick.projectLink,
  '0x7f4cdeA583b6c4dd3241fD6618236FF1fE57f549': tokens.usdc.projectLink,
  '0x85deFbE2b1B1dCe039cDEadcC4AF63493bfB5188': tokens.pauto.projectLink,
  '0x08BCb3173ec8886e18685d52206b38d79A29d00b': tokens.pwings.projectLink,
  '0x3324af8417844e70b81555A6D1568d78f4D4Bf1f': tokens.dino.projectLink,
  '0x0C77b6682b6fFfFe9599B41E39eBa1c1bCf923D8': tokens.frm.projectLink,
  '0xB78aC4FD3aEE81A407e3a60c17922295bb7711C9': tokens.crystl.projectLink,
  '0xbedEE6a7c572aa855a0c84d2f504311d482862F4': tokens.polydoge.projectLink,
  '0x5FB641De2663e8a94C9dea0a539817850d996e99': tokens.shib.projectLink,
  '0x287bD6518aE54a4299BD766faa6DF3ED795fB6C1': tokens.destruction.projectLink,
  '0x1c50b2187B2fB666A7aA9CFbD032C5cb0B7fd189': tokens.destruction.projectLink,
  '0x7CA8e540DF6326005B72661E50F1350C84C0E55D': tokens.relay.projectLink,
  '0x74DcA70e4bABf8BE5E6B329Cf963BEE97dfBEBaa': tokens.salsa.projectLink,
  '0x1844be27768751C3888056234E08B49530633454': tokens.salsa.projectLink,
  '0xcBf71C04148e5C463223F07A64a50f2Df46B6cdc': tokens.abr.projectLink,
  '0xfD168748dD07a32A401E800240aEC8EC6EFc706f': tokens.wcro.projectLink,
  '0x7a6830a9E6F964104b52243922a7738dE4cfF84a': tokens.elixir.projectLink,
  '0x204a7ADc76Db7fE8c5E5F499cb3c4cFf6D7282c2': tokens.tech.projectLink,
  '0x9f03309A588e33A239Bf49ed8D68b2D45C7A1F11': tokens.dino.projectLink,
  '0x8da8e328114C490809330F767281e113eAAE0217': tokens.desire.projectLink,
  '0x5C2d9217aeF2B7478F3Cf301619CAd236c345567': tokens.desire.projectLink,
  '0x8dc7a8e7040832920831436Fb370ea12f661f797': tokens.destiny.projectLink,
  '0x1052c59e067Ca92A261F9813A92900e8eFAE514d': tokens.destiny.projectLink,
  '0xC419c78039Dc2E35e639cB0aB1aC7351A4A9AA44': tokens.dino.projectLink,
  '0xcE621CE85eABC6dd95088B81CaB683DFb4628864': tokens.dino.projectLink,
  '0x18f501866FCaA9935367A223b79041e603b3B86E': tokens.usdc.projectLink,
  '0xA629252b0e41111a0aA0112aE04CEE4bCeeAe476': 'https://pbs.twimg.com/media/EWYbP7DXQAMDgz5?format=jpg&name=large',
  '0xc961AC0404f95141573DAe224525Ae936Bd3bf64': tokens.wmatic.projectLink,
  '0xa8fB745919D959fbbDFAB71b88E82BB4E6BA502E': 'https://pbs.twimg.com/media/EWYbP7DXQAMDgz5?format=jpg&name=large',
  '0x55E49F32fbBa12AA360EeC55200DAFd1AC47AaED': tokens.welt.projectLink,
  '0xE89faE1B4AdA2c869f05a0C96C87022DaDC7709a': tokens.mimatic.projectLink,
  '0x315e00839a4d96b204D64545b18beaa2b54C44E7': tokens.aga.projectLink,
  '0x2735d319739eDC6c47C3A20Aa5402b931c3F1A1E': tokens.nfty.projectLink,
  '0x0806A407d6eEa72788d91C36829A19d424446040': tokens.kom.projectLink,
  '0xA7E340Eead5DFF3752c4818aE1AeeEB7b81b78d1': tokens.death.projectLink,
  '0x07a5B2F5275cf61a5C7a5B766988f5cF30C9c42B': tokens.death.projectLink,
}

export const LP_PROVIDER = {
  '0xc35DADB65012eC5796536bD9864eD8773aBc74C4': 'SUSHI LP',
  '0x668ad0ed2622C62E24f0d5ab6B6Ac1b9D2cD4AC7': 'JETSWAP LP',
  '0xa98ea6356A316b44Bf710D5f9b6b4eA0081409Ef': 'WAULT LP',
  '0xE7Fb3e833eFE5F9c441105EB65Ef8b261266423B': 'DFYN LP',
  '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32': 'QUICK LP',
  '0xCf083Be4164828f00cAE704EC15a36D711491284': 'APE LP',
  '0x477Ce834Ae6b7aB003cCe4BC4d8697763FF456FA': 'POLYCAT LP',
  '0x800b052609c355cA8103E06F022aA30647eAd60a': 'COMETH LP',
  '0x5eDe3f4e7203Bf1F12d57aF1810448E5dB20f46C': 'CAFE LP',
  '0x624Ccf581371F8A4493e6AbDE46412002555A1b6': 'DINO LP',
}

export const LIQUIDITY_LINKS = {
  '0xc35DADB65012eC5796536bD9864eD8773aBc74C4': 'https://app.sushi.com/add',
  '0x668ad0ed2622C62E24f0d5ab6B6Ac1b9D2cD4AC7': 'https://polygon-exchange.jetswap.finance/#/add',
  '0xa98ea6356A316b44Bf710D5f9b6b4eA0081409Ef': 'https://swap.wault.finance/polygon/index.html#/add',
  '0xE7Fb3e833eFE5F9c441105EB65Ef8b261266423B': 'https://exchange.dfyn.network/#/add',
  '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32': 'https://quickswap.exchange/#/add',
  '0xCf083Be4164828f00cAE704EC15a36D711491284': BASE_ADD_LIQUIDITY_URL,
  '0x477Ce834Ae6b7aB003cCe4BC4d8697763FF456FA': 'https://polycat.finance/add',
  '0x800b052609c355cA8103E06F022aA30647eAd60a': 'https://swap.cometh.io/#/add',
  '0x5eDe3f4e7203Bf1F12d57aF1810448E5dB20f46C': 'https://polygondex.cafeswap.finance/#/add',
  '0x624Ccf581371F8A4493e6AbDE46412002555A1b6': 'https://trade.dinoswap.exchange/?t=l#/add',
}

export const QUICK_FARMS = [
  '0x91061e09e9c7819CBbb92a418240954A4D8a9fed',
  '0x403A2604226585Cb1e07D644780930D650EA4b73',
  '0x807a2EF804a8557bF5eC9c03FF869888E6af8E83',
  '0x8eF44aF84D79717577C54DD7eC60a60945404680',
  '0xd2A750C2Ce25E47C3A0Abe9B5966a20e60288091',
  '0x428F09ab6aF0B0A235fD0FcEC1519912DA610011',
  '0xD039f25F567C406393D0534Cbae304d2294141d0',
  '0xE85f2dc81006fB580c7e5007399D5167Ea806F41',
  '0x06e49078b1900A8489462Cd2355ED8c09f507499',
]

export const QUICK_DUALREWARDS_FARMS = ['0x14977e7E263FF79c4c3159F497D9551fbE769625']

export const DOKI_FARMS = [
  '0xc0a1dFb85734E465C5dadc5683DE58358C906598',
  '0x69Cb6f98E45c13A230d292bE0a6aF93a6521c39B',
  '0x2146baC214D9BF2Da56c3d4A69b9149e457F9d8c',
  '0xBbDC1681e43549d3871CF1953D1dD9afF320feF0',
]

export const DFYN_FARMS = [
  '0xAbfaB571CD23C1134D0b4a663691b93F35CE4DB0',
  '0x1d5F09c8E0dcac6355338e94936D53df35E681b4',
  '0x3C045a183ED4784142c042070be6B25AE6D9854D',
]

export const APESWAP_MINICHEF = '0x54aff400858Dcac39797a81894D9920f16972D1D'

export const APESWAP_SECOND_REWARDER_V1 = '0x1F234B1b83e21Cb5e2b99b4E498fe70Ef2d6e3bf'
export const APESWAP_SECOND_REWARDER_TOTALALLOCPOINT = new BigNumber(10000)

export const DEPOSIT_FEES_BY_PID_V1 = {
  '2': '2',
}

export const DEPOSIT_FEES_BY_PID_V2 = {}

export enum RiskLevel {
  ZERO = 0,
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
}
