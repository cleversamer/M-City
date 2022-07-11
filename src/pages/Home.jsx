import Featured from "../components/featured";
import Matches from "../components/Matches";
import MeetPlayers from "../components/MeetPlayers";

const Home = () => {
  return (
    <div className="bck_blue">
      <Featured />
      <Matches />
      <MeetPlayers />
    </div>
  );
};

export default Home;
