import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { selectUser, logoutUser } from "../../store/user";
import { handleSignout } from "../../utils/auth";
import * as toast from "../../utils/toast";
import config from "../../config.json";

import { AppBar, Toolbar, Button } from "@mui/material";
import Logo from "../common/Logo";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const style = {
    backgroundColor: "#98c5e9",
    boxShadow: "none",
    paddin: "10px 0",
    borderBottom: "2px solid #00285e",
  };

  const onSignout = () => {
    handleSignout(
      (res) => {
        dispatch(logoutUser());
        toast.showSuccess(config.toasts.logout);
      },
      (err) => {
        toast.showError(config.errors.logout);
      }
    );
  };

  return (
    <AppBar position="fixed" style={style}>
      <Toolbar style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }}>
          <div className="header_logo">
            <Logo
              link={true}
              linkTo={config.routes.home}
              width="70px"
              height="70px"
            />
          </div>
        </div>

        <Link to={config.routes.team}>
          <Button color="inherit">The team</Button>
        </Link>

        <Link to={config.routes.matches}>
          <Button color="inherit">Matches</Button>
        </Link>

        {user ? (
          <>
            <Link to={config.routes.dashboard}>
              <Button color="inherit">Dashboard</Button>
            </Link>

            <Button color="inherit" onClick={onSignout}>
              Logout
            </Button>
          </>
        ) : (
          <Link to={config.routes.login}>
            <Button color="inherit">Login</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
