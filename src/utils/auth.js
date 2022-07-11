import { auth } from "../firebase";
import { signOut } from "firebase/auth";

import { logoutUser } from "../store/user";

import * as toast from "./toast";

export const handleSignout = (dispatch) => {
  signOut(auth)
    .then(() => {
      dispatch(logoutUser());
      toast.showSuccess("Good bye!");
    })
    .catch((err) => {
      toast.showError(err.message);
    });
};
