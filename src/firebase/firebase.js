import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyA8hKWbtM-8y8j-vQ300UI6p9BcMW9h9QE",
  authDomain: "expensift-9575c.firebaseapp.com",
  databaseURL: "https://expensift-9575c.firebaseio.com",
  projectId: "expensift-9575c",
  storageBucket: "expensift-9575c.appspot.com",
  messagingSenderId: "1049828440125"
};

firebase.initializeApp(config);

// test shit
const db = firebase.database();
db.ref().set({
  name: "Paul",
  age: "32",
  isSingle: false,
  location: { city: "cape town", country: "ZA" }
}).then(() => {
  console.log('data successfully saved');
}).catch(e => {
  console.log('firebase failed', e);
});

// db.ref().set("this is a string");

db.ref('age').set(35);
db.ref('location/city').set('durban');
db.ref('location/city').set('cape town');
