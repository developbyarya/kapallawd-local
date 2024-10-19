import express from "express";
import cors from "cors";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import bodyParser from "body-parser";

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

const fb = initializeApp(firebaseConfig);

const db = getFirestore(fb);

import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";

const gpsRef = collection(db, "gps");

const app = express();
const port = 3000; // Port for Express server

// Replace with your serial port path and baud rate
const serialPortPath = "/dev/ttyACM0"; // e.g., COM3 for Windows, /dev/ttyUSB0 for Linux
const baudRate = 2000000;

// // // Create a new serial port
const serialPort = new SerialPort(serialPortPath, { baudRate: baudRate });
const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\n" }));

// Middleware to parse JSON requests
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("client"));

let lat_loc = null;
let mission_started = false;
let lintasan = null;

app.get("/mission", (req, res) => {
  res.status(200);
  return res.json({ started: mission_started, lintasan });
});

app.post("/mission", (req, res) => {
  const data = req.body;
  console.log(data);
  mission_started = data.mission_started;
  lintasan = data.lintasan;
  res.sendStatus(200);
});

app.post("/stop-mission", (req, res) => {
  mission_started = false;
  lintasan = null;
  res.sendStatus(200);
});

app.get("/gps", (req, res) => {
  res.json(lat_loc);
});

// POST API to receive data and send it to the serial port

// // Listen for data coming from the serial port
parser.on("data", async (data) => {
  console.log("Received from serial port:", data);
  const [lat, lng, speed] = data.split(",");
  lat_loc = { lat, lng, speed };

  const docRef = await addDoc(gpsRef, {
    loc: [lat, lng],
    speed: speed,
    timestamp: Timestamp.now(),
  });
});

serialPort.on("error", (err) => {});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  //   console.log(
  //     `Listening on serial port ${serialPortPath} with baud rate ${baudRate}`
  //   );
});
