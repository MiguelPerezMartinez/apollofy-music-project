import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

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
      console.log(user);
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      console.error("Log in failed: ", error.message);
    });
}

export function logOut() {
  const auth = getAuth();
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
      // const errorCode = error.code;
      // const errorMessage = error.message;
      console.error("Password reset email not sent!: ", error.message);
    });
}

export async function getCurrentUserToken() {
  const auth = getAuth();
  // console.log("await", auth);
  console.log(auth.currentUser);
  return auth.currentUser.getIdToken();
}

export async function getCurrentUserId() {
  const auth = getAuth();
  return auth.currentUser.uid;
}
