/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "./store/user";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = ({ store }) => {
  const user = useSelector(selectUser);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {});

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Fragment>
      <Header />

      {!user && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      )}

      {user && (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      )}

      <ToastContainer />

      <Footer />
    </Fragment>
  );
};

export default App;
