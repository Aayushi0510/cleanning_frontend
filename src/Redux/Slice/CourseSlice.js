import { Slice, createSlice } from '@reduxjs/toolkit'

export const CourseSlice = createSlice({
    name: 'course',
    initialState: {
      course: [],
      selectedCourse:null,
      isTableLoading: false

    },
    reducers: {
      setCourse:(state ,action) =>{
        state.course=action.payload
      },

    setIsTableLoading:(state ,action) =>{
      state.isTableLoading=action.payload
    },
    setSelectedCourse:(state ,action) =>{
        state.selectedCourse=action.payload
      },
   
    },
})
export const {setCourse ,setIsTableLoading ,setSelectedCourse} = CourseSlice.actions

export default CourseSlice.reducer