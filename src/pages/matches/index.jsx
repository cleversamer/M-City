import React, { useEffect, useState } from "react";

import LeagueTable from "./LeagueTable";
import MatchesList from "./MatchesList";

import { getDocs } from "firebase/firestore";
import { matchesQuery } from "../../firebase";
import { CircularProgress } from "@mui/material";
import * as toasts from "../../utils/toast";

const TheMatches = () => {
  const [isLoading, setLoading] = useState(false);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    setLoading(true);

    getDocs(matchesQuery)
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMatches(data);
      })
      .catch((err) => {
        toasts.showError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return isLoading ? (
    <div className="progress">
      <CircularProgress />
    </div>
  ) : (
    <div className="the_matches_container">
      <div className="the_matches_wrapper">
        <div className="left">
          <MatchesList matches={matches} />
        </div>
        <div className="right">
          <LeagueTable />
        </div>
      </div>
    </div>
  );
};

export default TheMatches;
