import React from "react";
import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Login from "./components/Login";
import Home from "./container/Home";
import { fetchUser } from "./utils/fetchUser";

import { AnimatePresence } from "framer-motion";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const user = fetchUser();

    if (!user) navigate("/login");
  }, []);
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
    <Routes location={location} key={location.pathname}>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
    </AnimatePresence>
  );
};

export default App;