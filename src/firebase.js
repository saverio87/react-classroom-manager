import firebase from "firebase/app";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfg_UU2Hc7GLLcPvQrUw6qkGY2MWIctWk",
  authDomain: "esl-toolkit.firebaseapp.com",
  projectId: "esl-toolkit",
  storageBucket: "esl-toolkit.appspot.com",
  messagingSenderId: "151107934163",
  appId: "1:151107934163:web:f1862063e32f0111588126",
  measurementId: "G-RVP1V270CH",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
