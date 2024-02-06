import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "../../Redux/Services/Courseservice";
import {
  setIsTableLoading,
  setSelectedCourse,
} from "../../Redux/Slice/CourseSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const CourseContentRow = ({ name, parts, _id }) => {
  const params = useParams();
  const courseId = params.id;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;
  const { data, isFetching, isLoading } = useGetCourseByIdQuery(courseId);
  const [userProgress, setUserProgress] = useState(null);

  const { selectedCourse, isTableLoading } = useSelector(
    (state) => state.course
  );
  const [statuses, setStatuses] = useState([]);
  const duration = "20min";
  const playLink = "/courseplay";
  const quizLink = "/quizmodule";

  useEffect(() => {
    if (!isLoading && !isFetching) {
      dispatch(setSelectedCourse(data?.data));
    } else {
      dispatch(setIsTableLoading(true));
    }
  }, [dispatch, data, isFetching, isLoading]);

  const modulesData = selectedCourse?.modules;

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const response = await axios.get(`https://api-work-place-safety.onrender.com/api/user-progress/${userId}/${courseId}`);
        setUserProgress(response.data);
      } catch (error) {
        console.error('Error fetching user progress:', error);
      }
    };

    fetchUserProgress();
  }, [userId, courseId]);

  useEffect(() => {
    const updateModuleStatuses = async () => {
      const moduleStatuses = await Promise.all(
        selectedCourse?.modules?.map(async (module) => {
          const userModule = userProgress?.moduleProgress?.find((userModule) => userModule?.moduleId === module?._id);

          if (userModule && module?.parts.every((part) => userModule?.partsCompleted.some((completedPart) => completedPart.partNumber === part.partNumber))) {
            return "Completed";
          } else {
            return "Not Started yet";
          }
        }) || []
      );

      setStatuses(moduleStatuses);
    };

    updateModuleStatuses();
  }, [userProgress, selectedCourse]);
  return (
    <>
      {/* Module Rows */}
      {(!modulesData || isFetching || isLoading) && (
        <tr>
          <td colSpan="3">Loading...</td>
        </tr>
      )}

      {modulesData?.map((module ,index) => (
        <React.Fragment key={module._id}>
          <tr role="row" className="w-full bg-slate-200 ">
            <td role="col" className="p-2 py-4">
              <div className="es-launch-course__course-content__module">
                <span className="es-launch-course__course-content__module__name mr-2">
                  {module.name}
                </span>
                <span className="es-launch-course__course-content__module__duration">
                  {duration}
                </span>
              </div>
            </td>
            <td role="col" className="py-4">
              <div
                className={`es-badge--${
                  statuses[index] === "Completed" ? "success" : "neutral"
                } text-nowrap es-badge--sm flex items-center gap-3`}
              >
              
                <span className="align-middle">{statuses[index]}</span>
              </div>
            </td>
            <td role="col" className="py-4">
              <div className="d-flex justify-content-end">
                <Link
                  to={{
                    pathname: playLink,
                    search: `?courseId=${courseId}&moduleId=${module._id}`,
                  }}
                  target="_blank"
                  className="flex items-center gap-3 btn es-btn es-btn--secondary-outline es-btn--sm learn-course-button-width btn-secondary"
                >
                  <div className="d-flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-repeat"
                    >
                      <polyline points="17 1 21 5 17 9" />
                      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                      <polyline points="7 23 3 19 7 15" />
                      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                    </svg>
                  </div>
                  <span className="ml-2">Play Module</span>
                </Link>
              </div>
            </td>
          </tr>
          {module.name.toLowerCase().startsWith("module") && quizLink && (
            <tr role="row" className="w-full">
              <td role="col" className="p-2 py-4 pl-10">
                <div className="es-launch-course__course-content__quiz">
                  ↳ QUIZ
                </div>
              </td>
              <td role="col" className="py-4">
                <div
                  className={`es-badge--${
                    statuses[index] === "Completed" ? "success" : "neutral"
                  } text-nowrap es-badge--sm flex items-center gap-3`}
                >
                
                  <span className="align-middle">{statuses[index]}</span>
                </div>
              </td>
              <td role="col" className="py-4">
                <div className="d-flex justify-content-end">
                  {quizLink && (
                    <Link
                      to={{
                        pathname: quizLink,
                        search: `?courseId=${courseId}&moduleId=${module._id}`,
                      }}
                      className="bg-main text-white px-3 py-2 rounded-lg"
                    >
                      <span className="ml-2">Start Quiz</span>
                    </Link>
                  )}
                </div>
              </td>
            </tr>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default CourseContentRow;
