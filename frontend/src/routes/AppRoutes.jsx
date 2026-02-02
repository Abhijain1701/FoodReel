import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import UserLogin from "../pages/user/UserLogin";
import UserRegister from "../pages/user/UserRegister";
import FoodPartnerLogin from "../pages/foodpartner/FoodPartnerLogin";
import FoodPartnerRegister from "../pages/foodpartner/FoodPartnerRegister";
import Home from '../pages/general/Home';
import ProtectedRoute from "../components/ProtectedRoute";
import UserProtectedRoute from "../components/UserProtectedRoute";
import FoodPartnerProfile from "../pages/food-partner/profile";
import CreateFood from "../pages/food-partner/CreateFood";
import SavedReels from "../pages/general/SavedReels";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Home/>
         </ProtectedRoute>
        }/>
        <Route path="/saved" element={
          <ProtectedRoute>
            <SavedReels/>
        </ProtectedRoute>
        }/>
        <Route path="/create-food" element={
          <ProtectedRoute>
            <CreateFood/>
          </ProtectedRoute>
        } />


       <Route path="/food-partner/:id" element={<FoodPartnerProfile/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
