/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "./store/user";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

import Header from "./components/Header";
import Footer from "./components/Footer";

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

      {!user && <Login />}

      {user && (
        <Routes>
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      )}

      <Footer />
    </Fragment>
  );
};

export default App;
