/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { VaultStateV2, Vault } from '../types'
import fetchAllVaults from './fetchVaults'

const initialState: VaultStateV2 = {
  isInitialized: false,
  isLoading: true,
  data: null,
}

export const vaultsSliceV2 = createSlice({
  name: 'vaults',
  initialState,
  reducers: {
    vaultsV2FetchStart: (state) => {
      state.isLoading = true
    },
    vaultsV2FetchSucceeded: (state, action) => {
      state.isInitialized = true
      state.isLoading = false
      const liveVaultsData: Vault[] = action.payload
      state.data = liveVaultsData
    },
    vaultsV2FetchFailed: (state) => {
      state.isLoading = false
      state.isInitialized = false
    },
  },
})

// Actions
export const { vaultsV2FetchStart, vaultsV2FetchSucceeded, vaultsV2FetchFailed } = vaultsSliceV2.actions

export const fetchVaultsV2 = (account: string) => async (dispatch) => {
  try {
    dispatch(vaultsV2FetchStart())
    const vaults = await fetchAllVaults(account)
    dispatch(vaultsV2FetchSucceeded(vaults))
  } catch (error) {
    dispatch(vaultsV2FetchFailed())
  }
}

export default vaultsSliceV2.reducer
