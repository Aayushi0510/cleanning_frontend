import React, { useEffect, useState } from "react";
import VideoPlayer from "../../Component/Single Course/VideoPlayer/VideoPlayer";
import { useLocation } from "react-router-dom";
import { setSelectedCourse } from "../../Redux/Slice/CourseSlice";
import { setIsTableLoading } from "../../Redux/Slice/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetCourseDetailByModuleIdQuery } from "../../Redux/Services/Courseservice";
import GlossaryContent from "../../Component/GlossaryContent/GlossaryContent";
import axios from "axios";

const PlayModule = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const courseId = params.get("courseId");
  const moduleId = params.get("moduleId");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);

  const { user } = useSelector((state) => state.auth);
  const userId = user._id;
  console.log(userId);
  const { data, isFetching, isLoading } = useGetCourseDetailByModuleIdQuery({
    courseId: courseId,
    moduleId: moduleId,
  });

  const { selectedCourse, isTableLoading } = useSelector(
    (state) => state.course
  );

  useEffect(() => {
    if (!isLoading && !isFetching) {
      dispatch(setSelectedCourse(data));
      const firstTopic = topicsWithUrls?.[0]?.topic;
      if (firstTopic) {
        handleTopicClick(firstTopic);
      }
    } else {
      dispatch(setIsTableLoading(true));
    }
  }, [dispatch, data, isFetching, isLoading]);

  const moduleDetails = data?.moduleDetails;
  console.log(moduleDetails, "moduleDetails");
  const topicsWithUrls = moduleDetails?.parts?.map((part, index) => ({
    topic: part?.partNumber,
    videoUrl: part?.video,
    index: index,
  }));


  const [selectedTopic, setSelectedTopic] = useState(
    topicsWithUrls?.[0] || null
  );
  const [activeTab, setActiveTab] = useState("menu");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const [currentPartNumber, setCurrentPartNumber] = useState(
    selectedTopic?.partNumber || null
  );

  const handleTopicClick = (topic) => {
    const selectedTopicObject = topicsWithUrls?.find(
      (item) => item?.topic === topic
    );
    setSelectedTopic(selectedTopicObject);
    setCurrentPartNumber(selectedTopicObject?.partNumber);
    console.log(selectedTopicObject?.partNumber)
  };
  const handlePrevious = () => {
    const currentIndex = selectedTopic?.index || 0;
    const prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : 0;
    handleTopicClick(topicsWithUrls?.[prevIndex]?.topic);
  };

  const handleNext = () => {
    const currentIndex = selectedTopic?.index || 0;
    const nextIndex =
      currentIndex + 1 < topicsWithUrls?.length
        ? currentIndex + 1
        : topicsWithUrls?.length - 1;
    handleTopicClick(topicsWithUrls?.[nextIndex]?.topic);
  };
  const videoUrls = topicsWithUrls?.map((item) => item.videoUrl); // Extract video URLs
  console.log(videoUrls);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prevValue) => !prevValue);
  };
  const handleVideoEnd = () => {
    if (selectedTopic?.videoUrl) {
      handleVideoChange(selectedTopic.videoUrl);
      console.log(currentPartNumber ,"")
    }
  };

  console.log(topicsWithUrls ,"topicsWithUrls")
  const handleVideoChange = (videoUrl) => {
    const matchingPart = topicsWithUrls.find((part) => part.videoUrl === videoUrl);
    console.log(matchingPart)
    if (matchingPart) {
      console.log("hdsh")
      setCurrentPartNumber(matchingPart.topic);
      updateProgress(matchingPart.topic);

      console.log(matchingPart.topic); // Use matchingPart.topic instead of matchingPart.partNumber
    }
  };


  const updateProgress = async (currentPartNumber) => {
    console.log(currentPartNumber,"currentPartNumber")
    try {

      const response = await axios.post(
        "https://api-work-place-safety.onrender.com/api/user-progress/update",
        {
          userId: userId,
          courseId: courseId,
          moduleId: moduleId,
          partNumber: currentPartNumber,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isMobileMenuOpen ? "" : "overflow-x-hidden"
      }`}
    >
      <div className="flex flex-col md:flex-row md:min-h-screen justify-between">
        <div
          className={`w-full md:w-1/3 bg-main p-8 text-white ${
            isMobileMenuOpen ? "" : "hidden"
          }`}
        >
          <div className="flex p-4 mb-4 border-t border-b">
            <div
              className={`cursor-pointer mr-4 ${
                activeTab === "menu" ? "font-bold border-b-2 border-main" : ""
              }`}
              onClick={() => handleTabClick("menu")}
            >
              Menu
            </div>
            <div
              className={`cursor-pointer ${
                activeTab === "glossary"
                  ? "font-bold border-b-2 border-main"
                  : ""
              }`}
              onClick={() => handleTabClick("glossary")}
            >
              Glossary
            </div>
          </div>

          <h3 className="text-xl">{moduleDetails?.name}</h3>
          {activeTab === "menu" && (
            <ul className="mt-4 pl-1">
              {topicsWithUrls?.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleTopicClick(item.topic)}
                  className={`py-3 flex justify-between  cursor-pointer rounded-xl  mb-2 px-3 ${
                    selectedTopic?.topic === item.topic
                      ? " bg-gray-700 text-white"
                      : "bg-slate-200 text-main"
                  }`}
                >
                  <span>{item.topic}</span>
                  {selectedTopic?.topic === item.topic && (
                    <button className="ml-2">&#9658;</button>
                  )}
                </li>
              ))}
            </ul>
          )}
          {activeTab === "glossary" && (
            <div className="">
              <GlossaryContent summary={moduleDetails?.summary} />
            </div>
          )}
        </div>
        <div
          className={`w-full md:full  bg-slate-100 ${
            isMobileMenuOpen ? "px-6" : "px-6"
          }`}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={handleMobileMenuToggle}
              className="text-main p-2 focus:outline-none -mr-24"
            >
              <svg
                className="fill-current h-6 w-6"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
            <h3 className="text-xl text-main  ml-28">{selectedTopic?.topic}</h3>
          </div>

          {selectedTopic && (
            <VideoPlayer
              handleVideoEnd={handleVideoEnd}
              handleVideoChange={handleVideoChange}
              key={selectedTopic.videoUrl}
              topic={selectedTopic?.topic}
              videoUrl={selectedTopic?.videoUrl}
              currentIndex={selectedTopic?.index}
              videoUrls={videoUrls}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayModule;
