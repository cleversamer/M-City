import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ListItem } from "@mui/material";
import { handleSignout } from "../../../utils/auth";
import { logoutUser } from "../../../store/user";
import * as toast from "../../../utils/toast";
import config from "../../../config.json";

const AdminNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const links = [
    {
      title: "Matches",
      linkTo: config.routes.adminMatches,
    },
    {
      title: "Players",
      linkTo: config.routes.adminPlayers,
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
        toast.showSuccess(config.toasts.logout);
        navigate(config.routes.home);
      },
      (err) => {
        toast.showError(config.errors.logout);
      }
    );
  };

  return (
    <div>
      {renderItems()}

      <Link to={config.routes.home}>
        <ListItem button className="admin_nav_link" onClick={onSignout}>
          Logout
        </ListItem>
      </Link>
    </div>
  );
};

export default AdminNav;
