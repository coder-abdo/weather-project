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
const postData = async (url, data) => {
  try {
    const postData = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      credentials: "same-origin",
      body: JSON.stringify(data),
    });
    const result = await postData.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
const updateUi = async () => {
  try {
    const fetchingData = await fetch("/all");
    const result = await fetchingData.json();
    $dateHolder.textContent = result && result.date;
    $tempHolder.textContent = result && result.temp;
    $contentHolder.textContent = result && result.feelings;
  } catch (error) {
    console.error(error);
  }
};
const fetchWeather = async (zip) => {
  try {
    const data = await fetch(`${BASE_URL}?zip=${zip}&appid=${API_KEY}`);
    const result = await data.json();
    await postData("/addWeather", {
      temp: result && result.main && result.main.temp,
      date: newDate,
      feelings: $feelingsField.value,
    });
    await updateUi();
  } catch (error) {
    console.error(error);
  }
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
