/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { VaultState, Vault } from '../types'
import fetchAllVaults from './fetchVaults'

const initialState: VaultState = {
  isInitialized: false,
  isLoading: true,
  data: null,
}

export const vaultsSlice = createSlice({
  name: 'vaults',
  initialState,
  reducers: {
    vaultsFetchStart: (state) => {
      state.isLoading = true
    },
    vaultsFetchSucceeded: (state, action) => {
      state.isInitialized = true
      state.isLoading = false
      const liveVaultsData: Vault[] = action.payload
      state.data = liveVaultsData
    },
    vaultsFetchFailed: (state) => {
      state.isLoading = false
      state.isInitialized = true
    },
  },
})

// Actions
export const { vaultsFetchStart, vaultsFetchSucceeded, vaultsFetchFailed } = vaultsSlice.actions

export const fetchVaults = (account: string) => async (dispatch) => {
  try {
    dispatch(vaultsFetchStart())
    const vaults = await fetchAllVaults(account)
    dispatch(vaultsFetchSucceeded(vaults))
  } catch (error) {
    dispatch(vaultsFetchFailed())
  }
}

export default vaultsSlice.reducer
