fetchWeatherData("alex");
document.querySelector(".find-btn").addEventListener("click", function () {
  let city = document.getElementById("location").value;
  fetchWeatherData(city);
});
document.getElementById("location").addEventListener("keyup", function () {
  let city = document.getElementById("location").value;
  fetchWeatherData(city);
});
async function fetchWeatherData(city) {
  const apiKey = "be87307462a84ae9ad4173424241906";
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log(data);
  display(data);
}

function display(data) {
  // Day 1
  const dayData0 = data.forecast.forecastday[0];
  const dayElement = document.getElementById(`day-1`);
  const dateElement = document.getElementById(`date-1`);

  dayElement.textContent = new Date(dayData0.date).toLocaleDateString("en-US", {
    weekday: "long",
  });
  dateElement.textContent = new Date(dayData0.date).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    }
  );
  document.getElementById("city").innerHTML = data.location.name;
  document.getElementById("temp-1").innerHTML = `${data.current.temp_c}°C`;
  const iconElement = document.getElementById(`icon-status-1`);
  iconElement.src = `https:${dayData0.day.condition.icon}`;
  document.getElementById("status-1").innerHTML = dayData0.day.condition.text;
  document.getElementById(
    "humidity"
  ).innerHTML = `${dayData0.day.avghumidity}%`;
  document.getElementById(
    "wind-speed"
  ).innerHTML = `${dayData0.day.maxwind_kph} Km/h`;
  document.getElementById("wind-direction").innerHTML = data.current.wind_dir;

  // Day 2 & 3
  for (let i = 1; i < 3; i++) {
    const dayData = data.forecast.forecastday[i];
    const dayElement = document.getElementById(`day-${i + 1}`);

    dayElement.textContent = new Date(dayData.date).toLocaleDateString(
      "en-US",
      {
        weekday: "long",
      }
    );
    document.getElementById(
      `max-temp-${i + 1}`
    ).innerHTML = `${dayData.day.maxtemp_c}°C`;
    document.getElementById(
      `min-temp-${i + 1}`
    ).innerHTML = `${dayData.day.mintemp_c}°C`;
    const iconElement = document.getElementById(`icon-status-${i + 1}`);
    iconElement.src = `https:${dayData.day.condition.icon}`;
    document.getElementById(`status-${i + 1}`).innerHTML =
      dayData.day.condition.text;
  }
}
