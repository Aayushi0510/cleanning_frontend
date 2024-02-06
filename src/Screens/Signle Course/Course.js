// UserDetails.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import TopBanner from '../../Component/Single Course/TobBanner'
import RelatedCourse from '../../Component/Related Course/RelatedCourse';
import { setIsTableLoading, setSelectedCourse } from '../../Redux/Slice/CourseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCourseByIdQuery } from '../../Redux/Services/Courseservice';
import Loader from '../../Component/Loader/Loader';

function Course() {
  const { id } = useParams();
  const dispatch=useDispatch()
  const {data ,isFetching ,isLoading}=useGetCourseByIdQuery(id)
  const {selectedCourse ,isTableLoading}=useSelector((state)=>state.course)
  useEffect(()=>{
    if(!isLoading && !isFetching)
    {
      dispatch(setSelectedCourse(data?.data))
    }
    else{
      dispatch(setIsTableLoading(true))
    }
  },[dispatch ,data ,isFetching ,isLoading])



  return (
    <>
   
      {!selectedCourse ? (
        <Loader/> // Display loader while loading
      ) : (
        <>
          <TopBanner selectedCourse={selectedCourse} />
          <div className='container mx-auto py-10'>
            <h3 className='text-3xl text-center text-secondry'>Related Course</h3>
            <RelatedCourse />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Course;
