/* Global Variables */
const API_KEY = "cc010da6d43b3f5956787acfd19f2755";
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
// DOM Elements
const $appContainer = document.getElementById("app");
const $zipField = $appContainer.querySelector("#zip");
const $feelingsField = $appContainer.querySelector("#feelings");
const $holderContainer = $appContainer.querySelector(".holder.entry");
const $dateHolder = $holderContainer.querySelector("#date");
const $tempHolder = $holderContainer.querySelector("#temp");
const $contentHolder = $holderContainer.querySelector("#content");
const $generateBtn = $appContainer.querySelector("#generate");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
const postData = (url, data) => {
  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => data);
};
const updateUi = () => {
  fetch("/all")
    .then((res) => res.json())
    .then((data) => {
      $dateHolder.innerHTML = data && data.date;
      $tempHolder.innerHTML = data && data.temp;
      $contentHolder.innerHTML = data && data.feelings;
    })
    .catch((err) => console.error(err));
};
const fetchWeather = async (zip) => {
  fetch(`${BASE_URL}?zip=${zip}&units=metric&appid=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      postData("/addWeather", {
        temp: data && data.main && data.main.temp,
        date: newDate,
        feelings: $feelingsField.value,
      });
      updateUi();
    })
    .catch((err) => console.error(err));
};

// generate data
$generateBtn.addEventListener("click", () => {
  if (
    (!$zipField.value && $zipField.value.trim() === "") ||
    (!$feelingsField.vlaue && $feelingsField.value.trim() === "")
  ) {
    alert("zip field and feelings field are required");
  } else {
    fetchWeather($zipField.value);
  }
});
