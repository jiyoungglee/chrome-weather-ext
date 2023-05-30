const codes = {
	"Sunny": {src: 'images/sun.png', msg: 'It\'s sunny out! Go outside and get some Vitamin D!'},
	"Clear": {src: 'images/moon.png', msg:'Clear Skies! Take a look at the stars outside!'},

	"Partly cloudy": {src: 'images/sunCloud.png', msg: 'It\'s partly cloudy.'},

	"Cloudy": {src:'images/clouds.png', msg: '~Head in the clouds~'},
	"Overcast": {src:'images/clouds.png', msg: '~Head in the clouds~'},
	"Mist": {src:'images/clouds.png', msg: '~Head in the clouds~'},

	// Rain
	"Patchy rain possible": {src:'images/rain.png', msg: 'It\'s raining! Don\'t forget your umbrella!'},
	"Patchy light drizzle": {src:'images/rain.png', msg: 'It\'s raining! Don\'t forget your umbrella!'},
	"Light drizzle": {src:'images/rain.png', msg: 'It\'s raining! Don\'t forget your umbrella!'},
	"Freezing drizzle": {src:'images/rain.png', msg: 'It\'s raining! Don\'t forget your umbrella!'},
	"Heavy freezing drizzle": {src:'images/rain.png', msg: 'It\'s raining! Don\'t forget your umbrella!'},
	"Patchy light rain": {src:'images/rain.png', msg: 'It\'s raining! Don\'t forget your umbrella!'},
	"Light rain": {src:'images/rain.png', msg: 'It\'s raining! Don\'t forget your umbrella!'},
	"Moderate rain at times": {src:'images/rain.png', msg: 'It\'s raining! Don\'t forget your umbrella!'},
	"Moderate rain": {src:'images/rain.png', msg: 'It\'s raining! Don\'t forget your umbrella!'},
	"Heavy rain at times": {src:'images/rain.png', msg: 'It\'s raining! Don\'t forget your umbrella!'},
	"Heavy rain": {src:'images/rain.png', msg: 'It\'s raining! Don\'t forget your umbrella!'},
	"Light freezing rain": {src:'images/rain.png', msg: 'It\'s raining! Don\'t forget your umbrella!'},
	"Light rain shower": {src:'images/rain.png', msg: 'It\'s raining! Don\'t forget your umbrella!'},
	"Moderate or heavy rain shower": {src:'images/rain.png', msg: 'It\'s raining! Don\'t forget your umbrella!'},
	"Torrential rain shower": {src:'images/rain.png', msg: 'It\'s raining! Don\'t forget your umbrella!'},
	"Patchy light rain with thunder": {src:'images/rain.png', msg: 'It\'s raining! Don\'t forget your umbrella!'},
	"Thundery outbreaks possible": {src:'images/rain.png', msg: 'It\'s raining! Don\'t forget your umbrella!'},
	"Moderate or heavy rain with thunder": {src:'images/rain.png', msg: 'It\'s raining! Don\'t forget your umbrella!'},
	"Patchy freezing drizzle possible": {src:'images/rain.png', msg: 'It\'s raining! Don\'t forget your umbrella!'},
	"Moderate or heavy freezing rain": {src:'images/rain.png', msg: 'It\'s raining! Don\'t forget your umbrella!'},

	// Snow
	"Patchy snow possible": {src: 'images/snow.png', msg: 'Do you wanna build a snowman?'},
	"Patchy sleet possible": {src: 'images/snow.png', msg: 'Do you wanna build a snowman?'},
	"Blowing snow": {src: 'images/snow.png', msg: 'Do you wanna build a snowman?'},
	"Blizzard": {src: 'images/snow.png', msg: 'Do you wanna build a snowman?'},
	"Light sleet": {src: 'images/snow.png', msg: 'Do you wanna build a snowman?'},
	"Moderate or heavy sleet": {src: 'images/snow.png', msg: 'Do you wanna build a snowman?'},
	"Patchy light snow": {src: 'images/snow.png', msg: 'Do you wanna build a snowman?'},
	"Light snow": {src: 'images/snow.png', msg: 'Do you wanna build a snowman?'},
	"Patchy moderate snow": {src: 'images/snow.png', msg: 'Do you wanna build a snowman?'},
	"Moderate snow": {src: 'images/snow.png', msg: 'Do you wanna build a snowman?'},
	"Patchy heavy snow": {src: 'images/snow.png', msg: 'Do you wanna build a snowman?'},
	"Heavy snow": {src: 'images/snow.png', msg: 'Do you wanna build a snowman?'},
	"Ice pellets": {src: 'images/snow.png', msg: 'Do you wanna build a snowman?'},
	"Light sleet showers": {src: 'images/snow.png', msg: 'Do you wanna build a snowman?'},
	"Moderate or heavy sleet showers": {src: 'images/snow.png', msg: 'Do you wanna build a snowman?'},
	"Light snow showers": {src: 'images/snow.png', msg: 'Do you wanna build a snowman?'},
	"Moderate or heavy snow showers": {src: 'images/snow.png', msg: 'Do you wanna build a snowman?'},
	"Light showers of ice pellets": {src: 'images/snow.png', msg: 'Do you wanna build a snowman?'},
	"Moderate or heavy showers of ice pellets": {src: 'images/snow.png', msg: 'Do you wanna build a snowman?'},
	"Patchy light snow with thunder": {src: 'images/snow.png', msg: 'Do you wanna build a snowman?'},
	"Moderate or heavy snow with thunder": {src: 'images/snow.png', msg: 'Do you wanna build a snowman?'},
 
	// Fog
	"Fog": {src: 'images/fog.png', msg: 'It\'s foggy out.'},
	"Freezing fog": {src: 'images/fog.png', msg: 'It\'s foggy out.'},
}

document.addEventListener('DOMContentLoaded', () => {
	const icon = document.querySelector('#icon');
	const message = document.querySelector('#message');
	const button = document.querySelector('#submit'); 
	const input = document.querySelector('#input');
	const newRq = document.querySelector('#new');
	icon.setAttribute('id', '#img-sun');

	button.style.visibility = 'hidden';
	input.style.visibility = 'hidden';
	newRq.style.visibility = 'hidden';

	button.addEventListener('click', () => {
		button.style.visibility = 'hidden';
		input.style.visibility = 'hidden';
		newRq.style.visibility = 'hidden';
		getWeather(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${input.value}&aqi=no`);
	})

	function setIcon({src, msg}) {
		// if (raining) icon.src = chrome.runtime.getURL('images/rain.png');
		icon.src = src;
		message.textContent = msg;

		chrome.storage.local.set({ src: src }, function() {
			console.log("String saved successfully.");
		});
	};

	// weather API
	async function getWeather(url) {
		try {
			const response = await fetch(url);
			const data = await response.json();
			console.log(data);
			setIcon(codes[data.current.condition.text]);
			button.style.visibility = 'visible';
			input.style.visibility = 'visible';
			newRq.style.visibility = 'visible';
		} catch(error) {
			console.error(error);
		}
	}

	navigator.geolocation.getCurrentPosition(
		function (position) {
		const lat = position.coords.latitude;
		const lon = position.coords.longitude;
		getWeather(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`);
		},
		function (error) {
		console.error('Error retrieving geolocation:', error);
		}
	);


})