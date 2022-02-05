import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import farmsReducer from './farms'
import vaultsReducer from './vaults'
import vaultsV2Reducer from './vaultsV2'
import poolsReducer from './pools'
import predictionsReducer from './predictions'
import profileReducer from './profile'
import teamsReducer from './teams'
import achievementsReducer from './achievements'
import blockReducer from './block'
import collectiblesReducer from './collectibles'

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    achievements: achievementsReducer,
    block: blockReducer,
    farms: farmsReducer,
    pools: poolsReducer,
    vaults: vaultsReducer,
    vaultsV2: vaultsV2Reducer,
    predictions: predictionsReducer,
    profile: profileReducer,
    teams: teamsReducer,
    collectibles: collectiblesReducer,
  },
})

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
