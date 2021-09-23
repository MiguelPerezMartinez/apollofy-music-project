import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
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
    });
}

export function logOut() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("Sign Out successfull");
    })
    .catch((error) => {
      // An error happened.
    });
}
