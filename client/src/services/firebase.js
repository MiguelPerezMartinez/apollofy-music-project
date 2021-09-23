import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

export function registerNewUser(email, password) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      console.error("Registration failed: ", error.message);
    });
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
