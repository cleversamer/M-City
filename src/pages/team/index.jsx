import { useEffect, useState } from "react";
import { Slide } from "react-awesome-reveal";
import { CircularProgress } from "@mui/material";
import PlayerCard from "../../hoc/PlayerCard";
import { getDocs } from "firebase/firestore";
import { playersQuery } from "../../firebase";
import * as toasts from "../../utils/toast";

const Team = () => {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    setLoading(true);

    getDocs(playersQuery)
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlayers(data);
      })
      .catch((err) => {
        toasts.showError("Could not fetch data from firestore.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const showPlayerByCategory = (category) => {
    if (!players.length) {
      return null;
    }

    return players
      .filter((player) => player.position === category)
      .map((player) => (
        <Slide left key={player.id} triggerOnce>
          <div className="item">
            <PlayerCard
              number={player.number}
              name={player.name}
              lastname={player.lastname}
              bck={player.image}
            />
          </div>
        </Slide>
      ));
  };

  return (
    <div className="the_team_container">
      {loading ? (
        <div className="progress">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div className="team_category_wrapper">
            <div className="title">Keepers</div>
            <div className="team_cards">{showPlayerByCategory("Keeper")}</div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Defence</div>
            <div className="team_cards">{showPlayerByCategory("Defence")}</div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Midfield</div>
            <div className="team_cards">{showPlayerByCategory("Midfield")}</div>
          </div>

          <div className="team_category_wrapper">
            <div className="title">Strikers</div>
            <div className="team_cards">{showPlayerByCategory("Striker")}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
