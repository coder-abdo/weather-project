// Setup empty JS object to act as endpoint for all routes

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
// Start up an instance of app

const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));
let projectData = {};

// Setup Server
const port = 5000;
app.get("/all", (req, res) => {
  res.send(projectData);
});
app.post("/addWeather", (req, res) => {
  const { temp, date, feelings } = req.body;
  projectData.temp = temp;
  projectData.date = date;
  projectData.feelings = feelings;
});

app.listen(port, () =>
  console.log(`server is running at http://localhost:${port}`)
);
