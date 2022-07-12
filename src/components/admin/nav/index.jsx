import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ListItem } from "@mui/material";
import { handleSignout } from "../../../utils/auth";

const AdminNav = () => {
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

  return (
    <div>
      {renderItems()}

      <Link to="/">
        <ListItem
          button
          className="admin_nav_link"
          onClick={() => handleSignout(dispatch)}
        >
          Logout
        </ListItem>
      </Link>
    </div>
  );
};

export default AdminNav;
