import { easePolyOut } from "d3-ease";
import Animate from "react-move/Animate";
import PlayerCard from "../hoc/PlayerCard";

let cards = [
  {
    bottom: 90,
    left: 300,
    player: "/assets/images/players/Vincent_Kompany.png",
  },
  {
    bottom: 60,
    left: 200,
    player: "/assets/images/players/Raheem_Sterling.png",
  },
  {
    bottom: 30,
    left: 100,
    player: "/assets/images/players/Otamendi.png",
  },
  {
    bottom: 0,
    left: 0,
    player: "/assets/images/players/Vincent_Kompany.png",
  },
];

const PlayerCards = (props) => {
  const showAnimateCards = () =>
    cards.map((card, i) => (
      <Animate
        key={i}
        show={props.show}
        start={{
          left: 0,
          bottom: 0,
        }}
        enter={{
          left: [card.left],
          bottom: [card.bottom],
          timing: { delay: 500, duration: 500, ease: easePolyOut },
        }}
      >
        {({ left, bottom }) => (
          <div
            style={{
              position: "absolute",
              left,
              bottom,
            }}
          >
            <PlayerCard
              number="30"
              name="Nicolas"
              lastname="Otamendi"
              bck={card.player}
            />
          </div>
        )}
      </Animate>
    ));

  return <div>{showAnimateCards()}</div>;
};

export default PlayerCards;
