/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "./store/user";

import Home from "./pages/home";
import NotFound from "./pages/notFound";
import Login from "./pages/login";
import Dashboard from "./pages/admin/dashboard";
import Players from "./pages/admin/players";
import AddEditPlayer from "./pages/admin/players/AddEditPlayer";
import Team from "./pages/team";
import Matches from "./pages/matches";

import Header from "./components/header";
import Footer from "./components/footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "./config.json";

const App = ({ store }) => {
  const user = useSelector(selectUser);
  const adminRoutes = [
    <Route key={1} path={config.routes.adminPlayers} element={<Players />} />,
    <Route key={2} path={config.routes.dashboard} element={<Dashboard />} />,
    <Route
      key={3}
      path={config.routes.addPlayer}
      element={<AddEditPlayer />}
    />,
    <Route
      key={4}
      path={`${config.routes.editPlayer.path}`}
      element={<AddEditPlayer />}
    />,
  ];

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {});

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Fragment>
      <Header />

      <Routes>
        {user && adminRoutes}
        <Route path={config.routes.matches} element={<Matches />} />
        <Route path={config.routes.team} element={<Team />} />
        <Route path={config.routes.login} element={<Login />} />
        <Route path={config.routes.notFound} element={<NotFound />} />
        <Route path={config.routes.home} element={<Home />} />
        <Route
          path="/"
          element={<Navigate to={config.routes.home} replace />}
        />
        <Route
          path="*"
          element={<Navigate to={config.routes.notFound} replace />}
        />
      </Routes>

      <ToastContainer />

      <Footer />
    </Fragment>
  );
};

export default App;
