import React, { useEffect, useState } from "react";
import CourseContentRow from "../../Component/Single Course/CourseContentRow";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  setIsTableLoading,
  setSelectedCourse,
} from "../../Redux/Slice/CourseSlice";
import { useGetCourseByIdQuery } from "../../Redux/Services/Courseservice";
import axios from "axios";

const progress = 8;
const courseData = [
  {
    module: "Module 1",
    duration: "20:00 min",
    status: "Completed",
    quizLink: "/quizmodule",
    replayLink: "/courseplay",
  },
  {
    module: "Module 2",
    duration: "30:00 min",
    status: "Not started yet",
    quizLink: "/quizmodule",
    playLink: "/courseplay",
  },
  {
    module: "Module 3",
    duration: "30:00 min",
    status: "Not started yet",
    quizLink: "/quizmodule",
    playLink: "/courseplay",
  },
  {
    module: "Module 4",
    duration: "30:00 min",
    status: "Not started yet",
    quizLink: "/quizmodule",
    playLink: "/courseplay",
  },
  {
    module: "Module 5",
    duration: "30:00 min",
    status: "Not started yet",
    quizLink: "/quizmodule",
    playLink: "/courseplay",
  },
  {
    module: "Module 6",
    duration: "30:00 min",
    status: "Not started yet",
    quizLink: "/quizmodule",
    playLink: "/courseplay",
  },
  // Add more modules as needed
];

const CourseModule = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const paramss = useParams();


  const courseId = paramss.id;
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;
  const { data, isFetching, isLoading } = useGetCourseByIdQuery(courseId);
  const [userProgress, setUserProgress] = useState(null);
  
  const { selectedCourse, isTableLoading } = useSelector(
    (state) => state.course
  );

  useEffect(() => {
    if (!isLoading && !isFetching) {
      dispatch(setSelectedCourse(data?.data));
    } else {
      dispatch(setIsTableLoading(true));
    }
  }, [dispatch, data, isFetching, isLoading]);


  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const response = await axios.get(`https://api-work-place-safety.onrender.com/api/user-progress/${userId}/${courseId}`);
        console.log(response)
        setUserProgress(response.data);
      } catch (error) {
        console.error('Error fetching user progress:', error);
      } 
    };

      fetchUserProgress();
  }, [userId, courseId  ]);


  const allPartsCompleted = userProgress?.moduleProgress?.map(item => item?.partsCompleted);
console.log(allPartsCompleted)

const calculateProgress = () => {
  if (!userProgress || !selectedCourse || !selectedCourse.modules) {
    return 0;
  }

  let completedModules = 0;

  selectedCourse.modules.forEach((module) => {
    const userModule = userProgress.moduleProgress.find((userModule) => userModule.moduleId === module._id);

    if (userModule && module.parts.every((part) => userModule.partsCompleted.some((completedPart) => completedPart.partNumber === part.partNumber))) {
      completedModules++;
    }
  });

  const totalModules = selectedCourse.modules.length;
  const percentage = Math.round((completedModules / totalModules)* 100);

  return percentage;
};
const [progress, setProgress] = useState(calculateProgress());
useEffect(() => {
  const fetchUserProgress = async () => {
    try {
      const response = await axios.get(
        `https://api-work-place-safety.onrender.com/api/user-progress/${userId}/${courseId}`
      );
      setUserProgress(response.data);
    } catch (error) {
      console.error("Error fetching user progress:", error);
    }
  };  

  fetchUserProgress();
}, [userId, courseId]);

// Update progress state when userProgress or selectedCourse changes
 useEffect(() => {
    // Update progress state when userProgress or selectedCourse changes
    setProgress(calculateProgress());
  }, [userProgress, selectedCourse])

console.log(progress)

  return (
    <div className="w-full min-h-screen flex px-2 pt-14 md:p-4">
      <div className="bg-gray-50 w-full">
        <h2 className="text-2xl text-main mb-4">{selectedCourse?.overview}</h2>

        <p>In progress</p>
        <div className="w-full bg-gray-300 rounded-md overflow-hidden mt-4">
          <div
            className="bg-green-500 text-white py-1 text-center"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
        <div className="text-center mt-2">
          <p className="text-gray-600">Step 1/12</p>
        </div>
        <div className="w-full border rounded-lg p-4 md:p-8 mt-4">
          <h2 className="text-2xl text-main mb-4">Course content</h2>
          <table className=" w-full h-full ">
            <thead className="bg-main text-white  ">
              <tr role="row" className="text-left ">
                <th role="columnheader" scope="col" className="pl-2 py-2">
                  Course name
                </th>
                <th role="columnheader" scope="col" className="py-2">
                  Status
                </th>
                <th role="columnheader" scope="col" className="py-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup ">
              <CourseContentRow courseId={selectedCourse?._id} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourseModule;
