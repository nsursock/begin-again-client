import { auth } from "../services/firebase";

export function signup(email, password) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function login(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

export async function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  const result = await auth().signInWithPopup(provider);
  return result.user.getIdToken(/* forceRefresh */ true);
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

export function saveFacebookToken(token) {
  localStorage.setItem("token", token);
}
