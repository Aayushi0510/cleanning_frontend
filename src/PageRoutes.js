import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import LandingPage from "./Screens/LandingPage/LandingPage";
import Dashboard from "./Screens/Dashboard/Dashboard";
import MainLayout from "./Layout/Mainlayout";
import Course from "./Screens/Signle Course/Course";
import Courses from "./Screens/Courses/Courses";
import Checkout from "./Screens/Checkout/Checkout";
import CourseModule from "./Screens/Dashboard/CourseModule";
import QuizModule from "./Screens/Dashboard/QuizModule";
import PlayModule from "./Screens/Dashboard/PlayModule";
import Layout from "./Layout/Layout";
import AccountInfo from "./Screens/Dashboard/AccountInfo";
import Receipt from "./Screens/Dashboard/Receipt";
import Contact from "./Screens/Contact";
import Sucess from "./Sucess";
import Cancel from "./Cancel";

const PageRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              }
              path="/dashboard"
            />
            <Route
              element={
                <MainLayout>
                  <CourseModule />
                </MainLayout>
              }
              path="/coursemodule/:id"
            />
            <Route
              element={
                  <QuizModule />
              }
              path="/quizmodule"
            />
            <Route element={<PlayModule />} path="/courseplay" />
            <Route
              element={
                <MainLayout>
                  <AccountInfo />
                </MainLayout>
              }
              path="/dashboard/accountinfo"
            />
            <Route
              element={
                <MainLayout>
                  <Receipt />
                </MainLayout>
              }
              path="/dashboard/receipt"
            />
            <Route element={<Login />} path="/login" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<Contact />} path="/contact" />
            <Route element={<LandingPage />} path="/" />
            <Route element={<Course />} path="/course/:id" />
            <Route element={<Courses />} path="/courses" />
            <Route element={<Checkout />} path="/checkout" />
            <Route path="/sucess" element={<Sucess />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default PageRoutes;
