import PageRoutes from "./PageRoutes";

import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setIsTableLoading, setUser } from "./Redux/Slice/authSlice";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Loader from "./Component/Loader/Loader";
import { setCourse ,setIsTableLoading as coursesetIsTableLoading} from "./Redux/Slice/CourseSlice";
import { useGetCourseQuery } from "./Redux/Services/Courseservice";

function App() {
  const dispatch = useDispatch();
  const {isTableLoading}=useSelector((state)=>state.auth)
  const {data ,isFetching ,isLoading}=useGetCourseQuery()


  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      dispatch(setUser(userData));
      dispatch(setAccessToken(userData.accessToken))
    }
    dispatch(setIsTableLoading(true))
  }, [dispatch]);


  useEffect(()=>{
    if(!isLoading && !isFetching)
    {
      dispatch(setCourse(data?.data))
    }
    else{
      dispatch(coursesetIsTableLoading(true))
    }
  },[dispatch ,data ,isFetching ,isLoading])
  

  if (!isTableLoading) {
    return null;
  }

  return (
    <div className="">
   
      <div>
        <PageRoutes />
        <ToastContainer />
      </div>
  
  </div>
  );
}

export default App;
