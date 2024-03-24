const firebase = require("firebase");
const firebaseConfig = {
  apiKey: // Sua(Your) API key do Firebase,
  authDomain: // Seu(Your) authDomain,
  projectId: // Seu(Your) projectId,
  storageBucket: // Seu(Your) storageBucket,
  messagingSenderId: // Seu(Your) messagingSenderId,
  appId: // Seu(your) appId
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Cliente");
module.exports = User;
