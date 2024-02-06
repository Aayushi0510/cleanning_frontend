import React, { useEffect } from 'react'
import Footer from '../../Component/Footer'
import { Link } from 'react-router-dom';
// import { content } from '../../Component/Utils/SafetyTrainingData';
import { useGetCourseQuery } from '../../Redux/Services/Courseservice';
import { useDispatch, useSelector } from 'react-redux';
import img2 from "../../Assets/people-safety-equipment-their-workplace.jpg";
import Loader from '../../Component/Loader/Loader';


const Courses = () => {
  const dispatch=useDispatch()
const {course ,isTableLoading}=useSelector((state)=>state.course)
console.log(course)
  // useEffect(()=>{
  //   if(!isLoading && !isFetching)
  //   {
  //     dispatch(setCourse(data?.data))
  //   }
  //   else{
  //     dispatch(setIsTableLoading(true))
  //   }
  // },[dispatch ,data ,isFetching ,isLoading])

  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };
  
  return (
    <>
   
   {!course? (
        <Loader /> // Display loader while loading
      ) : (
        <>
          <div className="bg-gray-900 text-white py-8">
            <div className="container px-8 mx-auto">
              <h1 className="text-center text-3xl">Courses</h1>
            </div>
          </div>
          <div className="container mx-auto p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {course?.map((div, index) => (
              <div key={index} className="flex flex-col   w-full gap-3" >
              <div className="bg-white  flex flex-col relative  pb-5" >
                <img
                  src={img2}
                  alt={"img"}
                  className="object-cover h-56 w-full"
                />
                 <div className="bg-red-800  px-5 py-5 w-24 h-[22px] flex items-center rounded-l-full absolute top-0 right-0 text-white text-xs">
                  <p className="text-xs"> $ {div.price} </p>
                  </div>
                {/* <div className="flex ps-2 justify-between">
                  <div>
                    <img
                      src={man}
                      alt={`slide-${currentSlide}-${index}`}
                      className="rounded-full h-[50px] w-[50px] -mt-8"
                    />
                  </div>
                  <div className="pt-2 text-sm text-gray-700 ">
John                      </div>
                 
                </div> */}

                <h2 className="  px-4 py-4 text-main tracking-wide font-semibold text-lg ">
                  {div.title}
                </h2>
                <h2 className="px-4 text-gray-600 pb-4  ">
                  {truncateDescription(div?.description, 40)}
                </h2>
                  <div className="bg-gray-200 mt-2 h-1"></div>
                <div className="p-3 flex justify-between">
                <div className="flex flex-col">
                <span className="text-sm text-gray-500"                      >
                    Duration:
                  </span>
                  <span   className="text-sm text-gray-500"                    >
                    2hourse 30 min
                  </span>
                </div>
                  <Link
                    className="text-black bg-mains text-xs  font-semibold mt-3 px-4 py-2 rounded"
                    to={`/course/${div._id}`}
                  >
                    VIEW MORE
                  </Link>
                </div>
              </div>
            </div>
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  )
}

export default Courses