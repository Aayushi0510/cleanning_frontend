import { Slice, createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      accessToken: "",
      refreshToken: "",
      isTableLoading: false

    },
    reducers: {
      setUser:(state ,action) =>{
        state.user=action.payload
      },
      setAccessToken:(state ,action) =>{
        state.accessToken=action.payload
      },
      setRefreshToken: (state, action) => {
        state.refreshToken = action.payload
    },
    setIsTableLoading:(state ,action) =>{
      state.isTableLoading=action.payload
    },
   
    },
})
export const {setUser ,setAccessToken ,setRefreshToken ,setIsTableLoading } = authSlice.actions

export default authSlice.reducer