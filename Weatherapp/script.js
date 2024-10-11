const apikey = '74d5db86d1bc7b7f9917c66839e50cad';
const form = document.getElementById('form');
const city = document.getElementById('city');
const weatherDiv = document.getElementById('weather');
const iconDiv = document.getElementById('icon');
const temperatureDiv = document.getElementById('temperature');
const descriptionDiv = document.getElementById('description');
const detailsDiv = document.getElementById('details');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const cityValue = city.value;
  getWeather(cityValue);
});

async function getWeather(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );

    const data = await response.json();
    console.log(data);

    const temparature = Math.round(data.main.temp);
    const icon = data.weather[0].icon;
    const details = [
      `Felt: ${Math.round(data.main.feels_like)}`,
      `Humidity Rate:${data.main.humidity}%`,
      `Wind:${data.wind.speed} m/s`,
    ];

    iconDiv.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
    temperatureDiv.textContent = `${temparature}°C`;

    let detailsNew = details.map((detail) => `<div>${detail}</div>`).join('');
    console.log(detailsNew);
    descriptionDiv.textContent = '';

    detailsDiv.innerHTML = detailsNew;
  } catch (error) {
    iconDiv.innerHTML = '';
    temperatureDiv.textContent = '';
    descriptionDiv.textContent = 'Please enter a valid city';
    detailsDiv.innerHTML = '';
  }
}
