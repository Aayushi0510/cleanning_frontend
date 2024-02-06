import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import visa01 from "../../src/Assets/visa01.jpg"
import visa02 from "../../src/Assets/visa02.jpg"
import visa03 from "../../src/Assets/visa03.jpg"

const Footer = () => {
  return (
    <>
      <div className="bg-gray-50 w-full pt-6 pb-10 px-10 md:px-16 ">
        <div className="flex flex-col md:flex-row  justify-between ">
          {/* <div className="flex w-1/4 flex-col justify-between gap-5">
            <p className="text-main text-2xl font-medium">Work Place Safety</p>
            <p className="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
            <div className="flex items-center gap-5 text-main">
              <FaFacebook size={30}/>
              <FaTwitter size={30}/>
              <FaInstagramSquare size={30}/>
            </div>
          </div> */}
          <div className="flex flex-col justify-between gap-3 ">
          <p className="text-main font-medium text-lg py-3">Customer Support</p>

            <p className="text-gray-700 text-sm">FAQs</p>
            <p className="text-gray-700  text-sm">Call us (866) 470-7740</p>
            <p className="text-gray-700 text-sm">Contact us </p>
            <p className="text-gray-700 text-sm">About us</p>
            <p className="text-gray-700 text-sm">Blog</p>
          </div>
          <div className="flex flex-col justify-between gap-3 ">
          <p className="text-main font-medium text-lg py-3">Courses</p>
            <p className="text-gray-700 text-sm">AI Courses</p>
            <p className="text-gray-700 text-sm">Courses For myself</p>
            <p className="text-gray-700 text-sm">Courses for my staff</p>
            <p className="text-gray-700 text-sm">Consultation</p>
            <p className="text-gray-700 text-sm">Verify Certification</p>
          </div>
          <div className="flex flex-col justify-between gap-3  ">
            <p className="text-main font-medium text-lg py-3">Company</p>
            <p className="text-gray-700 text-sm">Customer Reviews</p>
            <p className="text-gray-700 text-sm">Terms and conditions</p>
            <p className="text-gray-700 text-sm">Privacy Policy</p>
            <p className="text-gray-700 text-sm">Cookies Policy</p>
            <p className="text-gray-700 text-sm">Refund Policy</p>
          </div>
          <div className="flex flex-col justify-between gap-3 ">
            <p className="text-main font-medium text-lg py-3">Buyer Protection</p>
            <p className="text-gray-700 text-sm">Secure Payments Powered By Stripe</p>
            <p className="text-gray-700 text-sm">Safe and Secure SSL Encrypted </p>

            <div className="flex items-center gap-5 text-main">
            <img src={visa01} style={{ height: '40px', width: '50px' }} />
            <img src={visa02} style={{ height: '40px', width: '50px' }}/>
            <img src={visa03} style={{ height: '40px', width: '50px' }}/>

            </div>
      
          </div>
   
        </div>
        
      </div>
      <div className=" bg-lightpurple text-center text-gray-700 text-sm py-4">
          <p> Copyright @2022 workplacesafety Training . All Rights Reserved.</p>
        </div>
    </>
  );
};

export default Footer;
