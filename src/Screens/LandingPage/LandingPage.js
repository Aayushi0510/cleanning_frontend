import React from "react";
import { useNavigate } from "react-router-dom";
import { AiFillFire } from "react-icons/ai";

import Footer from "../../Component/Footer";
import Slider from "../../Component/Ladning page/Slider/Slider";
import FeaturedCourse from "../../Component/FeaturedCourse/FeaturedCourse";
import SafetyTraining from "../../Component/Ladning page/SafetyTraining/SafetyTraining";
import CardLogin from "../../Component/Ladning page/CardLogin/CardLogin";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
  
      <Slider />
      <CardLogin/>
      <FeaturedCourse />

      <SafetyTraining/>
    
      <Footer />
    </>
  );
};

export default LandingPage;