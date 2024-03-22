const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyBMY6ig8TiUNLl3QHZ09AApAwOyMP7UFLg",
  authDomain: "testeathos-27577.firebaseapp.com",
  projectId: "testeathos-27577",
  storageBucket: "testeathos-27577.appspot.com",
  messagingSenderId: "415183701543",
  appId: "1:415183701543:web:5635684357c5878c58f002"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Cliente");
module.exports = User;
