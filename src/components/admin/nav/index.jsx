import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ListItem } from "@mui/material";
import { handleSignout } from "../../../utils/auth";
import { logoutUser } from "../../../store/user";
import * as toast from "../../../utils/toast";

const AdminNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const links = [
    {
      title: "Matches",
      linkTo: "/admin_matches",
    },
    {
      title: "Players",
      linkTo: "/admin_players",
    },
  ];

  const renderItems = () =>
    links.map((link) => (
      <Link to={link.linkTo} key={link.title}>
        <ListItem button className="admin_nav_link">
          {link.title}
        </ListItem>
      </Link>
    ));

  const onSignout = () => {
    handleSignout(
      (res) => {
        dispatch(logoutUser());
        toast.showSuccess("Good bye!");
        navigate("/");
      },
      (err) => {
        toast.showError(err.message);
      }
    );
  };

  return (
    <div>
      {renderItems()}

      <Link to="/">
        <ListItem button className="admin_nav_link" onClick={onSignout}>
          Logout
        </ListItem>
      </Link>
    </div>
  );
};

export default AdminNav;
