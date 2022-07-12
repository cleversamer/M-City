import { auth } from "../firebase";
import { signOut, signInWithEmailAndPassword } from "firebase/auth";

export const handleSignout = (onSuccess, onError) => {
  signOut(auth).then(onSuccess).catch(onError);
};

export const handleSignIn = (credentials, onSuccess, onError) => {
  signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then(onSuccess)
    .catch(onError);
};
