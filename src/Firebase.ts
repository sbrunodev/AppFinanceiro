import * as firebase from 'firebase';
import firestore from 'firebase/firestore'


const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyAOo93Ow2l3Ut4pSM93sqxF8-agNbBqqBk",
  authDomain: "meudinheiro-1d1d1.firebaseapp.com",
  databaseURL: "https://meudinheiro-1d1d1.firebaseio.com",
  projectId: "meudinheiro-1d1d1",
  storageBucket: ""
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;