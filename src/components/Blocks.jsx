import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { matchesQuery } from "../firebase";
import { Slide } from "react-awesome-reveal";
import Match from "../hoc/Match";

const Blocks = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(matchesQuery, (snapshot) => {
      const data = snapshot.docs
        .slice(0, 6)
        .map((doc) => ({ id: doc.id, ...doc.data() }));
      setMatches(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const showMatches = (matches) =>
    matches.length
      ? matches.map((match) => (
          <Slide bottom key={match.id} className="item" triggerOnce>
            <div>
              <div className="wrapper">
                <Match match={match} />
              </div>
            </div>
          </Slide>
        ))
      : null;

  return <div className="home_matches">{showMatches(matches)}</div>;
};

export default Blocks;
