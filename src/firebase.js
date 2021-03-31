import firebase from 'firebase/app'
import 'firebase/auth'

var firebaseConfig = {
  /*firebaseConfig here*/
};

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
export{auth, firebase}