let button = document.querySelector('.button');
let inputValue = document.querySelector('.input-value');
//inputValue = inputValue.value;
let city = document.querySelector('.city');
let daytime = document.querySelector('.day');
let temp = document.querySelector('.temp');
let cond = document.querySelector('.cond');

let sun = document.querySelector('.sunny');
let fewClouds = document.querySelector('.partly_cloudy');

let API_KEY = "9be6078ffe0c3e65abbf2642f7429c1a";




let FS_CLIENT_ID = "NJBPOFWW5BIH00SCYOGEF5QTWYZVXH1WXMNJKBWPT1TN2ULM"; //Foursquare client id
let FS_CLIENT_SECRET = "NJSRW14LAU43JJLNTK55SVTDEZKQGENT2MANMHOMSNNG4XCS"; //foursquare client secret

//Denna fetch skickar en förfrågan när sidan laddas in så det finns värden från start
fetch(`http://api.openweathermap.org/data/2.5/weather?q=Västerås&units=metric&appid=${API_KEY}`)
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
	let OWM_URL = `http://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&units=metric&appid=${API_KEY}`;
	fetch(OWM_URL)
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

	let FS_API_URL = `https://api.foursquare.com/v2/venues/explore?&limit=10&near=${inputValue.value}&client_id=${FS_CLIENT_ID}&client_secret=${FS_CLIENT_SECRET}&v=20210209`;

	let foursquareEl = document.querySelector('.foursquare');
	let weatherEl = document.getElementById('weather')
	let WeatherCB = document.getElementById('weatherCB');

		// if(WeatherCB.checked) {
		// 	foursquareEl.classList.add('hide');
		// } else if (fsAttractionCB.checked) {
		// 	weatherEl.classList.add('hide');
		// }
	
	removeAll();
	fetch(FS_API_URL)
		.then(response => response.json())
		.then(result => {
			console.log(result);
			
			let items = result['response']['groups']['0']['items'];
			console.log(items);
			for (let i = 0; i <= items.length; i++) {
				let VENUE_ID = items[i]['venue']['id'];
				let FS_IMG_URL = `https://api.foursquare.com/v2/venues/${VENUE_ID}/photos?client_id=${FS_CLIENT_ID}&client_secret=${FS_CLIENT_SECRET}&v=20200209`;
				//console.log(FS_IMG_URL);
				
				let fsContainer = document.querySelector('.foursquare .row');
				let fsColumn = document.createElement('div')
				let fsImg = document.createElement('img');
				let fsItemName = document.createElement('p');
				let fsItemLocation = document.createElement('p');
				let fsItemCity = document.createElement('p');
				let fsCard = document.createElement('div');
				fsColumn.className = "attraction col-12 col-sm-6 col-lg-4";
				fsCard.className = "card";
				fsItemName.innerText = items[i]['venue']['name'];
				fsItemLocation.innerText = items[i]['venue']['location']['address'];
				fsItemCity.innerText = items[i]['venue']['location']['city'];


				fetch(FS_IMG_URL)
					.then(response => response.json())
					.then(res => {
						console.log(res);
						let prefix = res['response']['photos']['items'][0]['prefix'];
						let suffix = res['response']['photos']['items'][0]['suffix'];
						let size = "400x400"
						let img = prefix + size + suffix;
						fsImg.src = img;
						fsCard.appendChild(fsImg);
						console.log(img)
					})
				.catch(err => console.log("something wrong"))
				
				fsContainer.appendChild(fsColumn);
				fsColumn.appendChild(fsCard);
				fsCard.appendChild(fsItemName);
				fsCard.appendChild(fsItemLocation);
				fsCard.appendChild(fsItemCity);

			}


		})
	.catch(err => alert("Some attractions couldnt load correctly!"))


});
function removeAll() {
	let getAttractions = document.querySelectorAll(".attraction");
	for (let i = 0; i < getAttractions.length; i++){ /* Kollar hur många element som section har och tar bort elementerna. */
		getAttractions[i].remove();
	}
}