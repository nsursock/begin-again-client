import { auth } from "../services/firebase";

export function signup(email, password) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function login(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}

export function signInWithGitHub() {
  const provider = new auth.GithubAuthProvider();
  return auth().signInWithPopup(provider);
}

export function signInWithFacebook() {
  const provider = new auth.FacebookAuthProvider();
  return auth().signInWithPopup(provider);
}

export function signInWithTwitter() {
  const provider = new auth.TwitterAuthProvider();
  return auth().signInWithPopup(provider);
}
