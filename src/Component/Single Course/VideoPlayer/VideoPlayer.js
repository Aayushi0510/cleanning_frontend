import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const VideoPlayer = ({ videoUrl, onPrevious, onNext ,handleVideoEnd ,handleVideoChange }) => {
  if (!videoUrl) {
    return null;
  }

  console.log(videoUrl);


  return (
    <div>
      <video width="100%" height="360" controls autoPlay  onEnded={handleVideoEnd} >
        <source src={videoUrl} type="video/mp4"  />
        Your browser does not support the video tag.
      </video>
      <div className="  flex justify-end ">
        <button
          className=" text-gray-700 py-2 px-3 rounded-lg mr-2"
          onClick={onPrevious}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          className=" text-gray-700 px-3 py-2 rounded-lg"
          onClick={onNext}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
