let button = document.querySelector('.button');
let inputValue = document.querySelector('.input-value');
let city = document.querySelector('.city');
let daytime = document.querySelector('.day');
let temp = document.querySelector('.temp');
let cond = document.querySelector('.cond');

let sun = document.querySelector('.sunny');
let fewClouds = document.querySelector('.partly_cloudy');

let API_KEY = "9be6078ffe0c3e65abbf2642f7429c1a"

//Denna fetch skickar en förfrågan när sidan laddas in så det finns värden från start
fetch('http://api.openweathermap.org/data/2.5/weather?q=Västerås&units=metric&appid='+API_KEY)
  .then(response => response.json())
  .then(data => {
    //console.log(data);
    let nameValue = data['name'];
    let tempValue = data['main']['temp'];
    let condValue = data['weather'][0]['description'];
    let dayValue = new Date();
    daytime.innerText = dayValue;
    city.innerText = nameValue;
    temp.innerText = tempValue+'°';
    cond.innerText = condValue;
		if (condValue == "clear sky") {
			sun.classList.add('show');
		}
		if (condValue == "few clouds") {
			fewClouds.classList.add('show');
		} else {
			fewClouds.classList.remove('show');
		}
})

button.addEventListener('click', function() {

	fetch('http://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&units=metric&appid='+API_KEY)
		.then(response => response.json())
		.then(data => {
			//console.log(data);
			let nameValue = data['name'];
			let tempValue = data['main']['temp'];
			let condValue = data['weather'][0]['description'];
			let dayValue = new Date();
			daytime.innerText = dayValue;
			city.innerText = nameValue;
			temp.innerText = tempValue+'°';
			cond.innerText = condValue;

			if (condValue == "clear sky") {
				sun.classList.add('show');
			} else {
				sun.classList.remove('show');
			}
			if (condValue == "few clouds") {
				fewClouds.classList.add('show');
			} else {
				fewClouds.classList.remove('show');
			}
			console.log(condValue);
		})
	.catch(err => alert("Wrong city name!"))
});

//console.log(condValue);