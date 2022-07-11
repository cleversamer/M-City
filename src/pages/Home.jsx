import Featured from "../components/featured";
import Matches from "../components/Matches";
import MeetPlayers from "../components/MeetPlayers";
import Promotion from "../components/Promotion";

const Home = () => {
  return (
    <div className="bck_blue">
      <Featured />
      <Matches />
      <MeetPlayers />
      <Promotion />
    </div>
  );
};

export default Home;
