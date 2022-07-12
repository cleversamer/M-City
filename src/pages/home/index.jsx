import Featured from "../../components/home/featured";
import Matches from "../../components/home/matches";
import MeetPlayers from "../../components/meetPlayers";
import Promotion from "../../components/promotion";

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
