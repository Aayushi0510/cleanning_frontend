import { useState, useEffect } from "react";
import { sliderData } from "../../Utils/SliderData";
import { AiFillFire } from "react-icons/ai";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <div className="relative overflow-hidden">
      <MdArrowBackIos
        className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer text-4xl text-white hover:text-gray-300 z-10"
        onClick={prevSlide}
      />
      <MdArrowForwardIos
        className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-4xl text-white hover:text-gray-300 z-10"
        onClick={nextSlide}
      />
      {sliderData.map((slide, index) => (
        <div
          key={index}
          className={`w-full h-full relative transition-transform duration-500 transform translate-x-${
            index - currentSlide
          }`}
        >
          {index === currentSlide && (
            <>
              <div
                className="h-[340px] md:h-[520px] bg-cover bg-center justify-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="h-full text-white relative flex items-center ">
                  <div className="grid grid-cols-12 items-center justify-between px-16 relative z-10">
                    <div className="col-span-12 md:col-span-6">
                      <div className="flex flex-col gap-5">
                        <h1 className="font-bold text-2xl md:text-[44px] leading-8"  >{slide.heading}</h1>
                        <p className="w-full md:w-96 text-sm md:text-[18px] font-normal "  style={{ lineHeight: '30px' }}>
                          {slide.content}
                        </p>
                        <div className="flex items-center justify-between gap-5">
                          <div className="flex items-center gap-2">
                            <button
                              className="text-black font-bold text-[15px] px-6 rounded-3xl py-4 bg-mains font-roboto;"
                              // onClick={() => {
                              //   navigate("/signup");
                              // }}
                              style={{ lineHeight: '15px' }}
                            >
                              Explore More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6 flex items-center justify-center relative">
                      <div className="flex items-center justify-end absolute bottom-20 right-16">
                        {/* Add your additional elements here */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-black opacity-25"></div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Slider;
