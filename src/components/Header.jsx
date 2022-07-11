import { Link } from "react-router-dom";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";

import { useSelector, useDispatch } from "react-redux";
import { selectUser, logoutUser } from "../store/user";

import { AppBar, Toolbar, Button } from "@mui/material";
import Logo from "./common/Logo";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const style = {
    backgroundColor: "#98c5e9",
    boxShadow: "none",
    paddin: "10px 0",
    borderBottom: "2px solid #00285e",
  };

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logoutUser());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AppBar position="fixed" style={style}>
      <Toolbar style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }}>
          <div className="header_logo">
            <Logo link={true} linkTo={"/"} width="70px" height="70px" />
          </div>
        </div>

        <Link to="/team">
          <Button color="inherit">The team</Button>
        </Link>

        <Link to="/matches">
          <Button color="inherit">Matches</Button>
        </Link>

        {user && (
          <>
            <Link to="/dashboard">
              <Button color="inherit">Dashboard</Button>
            </Link>

            <Button color="inherit" onClick={handleSignout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
