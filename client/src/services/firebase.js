import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "firebase/auth";

import { setIsActive } from "./api";

export async function registerNewUser(email, password) {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
}

export function authenticationObserver(callback) {
  const auth = getAuth();
  onAuthStateChanged(auth, callback);
}

export function logIn(email, password) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setIsActive(true);
      console.log(user);
    })
    .catch((error) => {
      console.error("Log in failed: ", error.message);
    });
}

export function logOut() {
  const auth = getAuth();
  setIsActive(false);
  signOut(auth)
    .then(() => {
      console.log("Sign out successfull");
    })
    .catch((error) => {
      console.error("Sign out failed");
    });
}

export function resetPassword(email) {
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Password reset email sent!: ", email);
    })
    .catch((error) => {
      console.error("Password reset email not sent!: ", error.message);
    });
}

export async function getCurrentUserToken() {
  const auth = getAuth();
  console.log("await", auth);
  console.log(auth.currentUser);
  const token = auth.currentUser.getIdToken();
  return token;
}

export async function getCurrentUserId() {
  const auth = getAuth();
  return auth.currentUser.uid;
}

export async function firebaseEmailUpdate(email) {
  const auth = getAuth();

  updateEmail(auth.currentUser, email)
    .then(() => {
      console.log("Profile updated!");
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export async function updateUserPass(newPassword) {
  const auth = getAuth();
  await updatePassword(auth.currentUser, newPassword)
    .then(() => {
      console.log("Password updated!");
    })
    .catch((error) => {
      console.log(error);
    });
}
