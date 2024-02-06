import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    sessionId: null,
    error: null,
  },
  reducers: {
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.sessionId = null;
      state.error = action.payload;
    },
  },
});

export const { setSessionId, setError } = paymentSlice.actions;
export default paymentSlice.reducer;
