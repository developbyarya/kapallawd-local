const firebaseConfig = {
  apiKey: "AIzaSyCr3V4xwWEP0yTdYRcvt4vzuKNdUAEB5bI",

  authDomain: "kapallawd-40b01.firebaseapp.com",

  projectId: "kapallawd-40b01",

  storageBucket: "kapallawd-40b01.appspot.com",

  messagingSenderId: "383307595328",

  appId: "1:383307595328:web:e3cf259d7c707e9de629a5",
};

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

import { collection, getDocs } from "firebase/firestore";

import { query, orderBy, limit } from "firebase/firestore";

const gpsRef = collection(db, "gps");

const q = query(gpsRef, orderBy("timestamp", "desc"), limit(1));
