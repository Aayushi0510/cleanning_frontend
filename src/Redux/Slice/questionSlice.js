import { createSlice } from '@reduxjs/toolkit';

const questionSLice = createSlice({
  name: 'question',
  initialState: {
    quizData: [],
    isTableLoading: false,
  },
  reducers: {
    setQuizData: (state, action) => {
      state.quizData = action.payload;

    },
    setIsTableLoading: (state, action) => {
        state.isTableLoading = action.payload;
      },
  },
});

export const { setQuizData, setError ,setIsTableLoading} = questionSLice.actions;
export default questionSLice.reducer;
