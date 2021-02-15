// Globala variablar.
let button = document.querySelector('.button');
let inputValue = document.querySelector('.input-value');
let city = document.querySelector('.city');
let daytime = document.querySelector('.day');
let temp = document.querySelector('.temp');
let cond = document.querySelector('.cond');

// Condition variablar.
let sun = document.querySelector('.sunny');
let fewClouds = document.querySelector('.partly_cloudy');
let cloudy = document.querySelector('.cloudy');
let rainy = document.querySelector('.rainy');

let API_KEY = "9be6078ffe0c3e65abbf2642f7429c1a"; // Open weather map API nyckel.

let FS_CLIENT_ID = "NJBPOFWW5BIH00SCYOGEF5QTWYZVXH1WXMNJKBWPT1TN2ULM"; //Foursquare client id
let FS_CLIENT_SECRET = "NJSRW14LAU43JJLNTK55SVTDEZKQGENT2MANMHOMSNNG4XCS"; //foursquare client secret

//Denna fetch skickar en förfrågan när sidan laddas in så det finns värden från start
fetch(`http://api.openweathermap.org/data/2.5/weather?q=Västerås&units=metric&appid=${API_KEY}`)
  .then(response => response.json()) // Gör om resposnen till json format.
  .then(data => {
    let nameValue = data['name'];
    let tempValue = data['main']['temp'];
    let condValue = data['weather'][0]['description'];
    let dayValue = new Date();
    daytime.innerText = dayValue;
    city.innerText = nameValue;
    temp.innerText = tempValue+'°';
    cond.innerText = condValue;

		// If-satser som kollar "Condition value" från OWM apiet.
		// Om t.ex. värdet "clear sky" finns i descriptionen hos apiet så ska den visa en sol ikon osv.
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
		if (condValue == "scattered clouds" || condValue == "broken clouds") {
			cloudy.classList.add('show');
		} else {
			cloudy.classList.remove('show');
		}
		if (condValue == "shower rain" || condValue == "rain") {
			rainy.classList.add('show');
		} else {
			rainy.classList.remove('show');
		}
})

// Klick funktion som kollar på en knapp i html som sedan gör en fetch för att hämta foursquare apiet.
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


			// Lägger till innehållet från apiet på sidan.
			daytime.innerText = dayValue;
			city.innerText = nameValue;
			temp.innerText = tempValue+'°';
			cond.innerText = condValue;

			// If-satser som kollar värdet i "condition value" från OWM apiet.
			// Om t.ex. värdet "clear sky" finns i descriptionen hos apiet så ska den visa en sol ikon osv.
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
			if (condValue == "scattered clouds" || condValue == "broken clouds") {
				cloudy.classList.add('show');
			} else {
				cloudy.classList.remove('show');
			}
			if (condValue == "shower rain" || condValue == "rain") {
				rainy.classList.add('show');
			} else {
				rainy.classList.remove('show');
			}
		})
	.catch(err => alert("Wrong city name!"))
	
	// Foursquare APIURL.
	let FS_API_URL = `https://api.foursquare.com/v2/venues/explore?&limit=10&near=${inputValue.value}&client_id=${FS_CLIENT_ID}&client_secret=${FS_CLIENT_SECRET}&v=20210209`;

	let foursquareEl = document.querySelector('.foursquare');
	let weatherEl = document.getElementById('weather')
	let WeatherCB = document.getElementById('weather-CB');
	let fsAttractionCB = document.getElementById('attraction-CB');

	// If-satser som hanterar filtreringen
	// T.ex. Om "Hide attractions" är i kryssad så döljs attraktionerna.
	if(WeatherCB.checked) {
		foursquareEl.classList.add('hide');
	} else {
		foursquareEl.classList.remove('hide');
	}
	
	if (fsAttractionCB.checked) {
		weatherEl.classList.add('hide');
	} else {
		weatherEl.classList.remove('hide');
	}
	console.log(FS_API_URL);
	removeAll();
	fetch(FS_API_URL)
		.then(response => response.json())
		.then(result => {

			let items = result['response']['groups']['0']['items']; // En variabel som tar in items/attraktioner

			for (let i = 0; i <= items.length; i++) { // En loop som loopar igenom hur många attraktioner det finns från apiet. Vilket gör det möjligt att
																								// skapa elements för varje ställe och trycka in informationen om attraktionen.
				let VENUE_ID = items[i]['venue']['id']; // Tar fram id:et på ställerna som sedan används för att ta fram bilden från attraktionen.
				let FS_IMG_URL = `https://api.foursquare.com/v2/venues/${VENUE_ID}/photos?client_id=${FS_CLIENT_ID}&client_secret=${FS_CLIENT_SECRET}&v=20200209`; // Photos APIET.
				
				let fsContainer = document.querySelector('.foursquare .row');

				//Skapar elementer.
				let fsColumn = document.createElement('div')
				let fsImg = document.createElement('img');
				let fsItemName = document.createElement('p');
				let fsItemLocation = document.createElement('p');
				let fsItemCity = document.createElement('p');
				let fsCard = document.createElement('div');
				let fsImgColumn = document.createElement('div');
				let fsInfoColumn = document.createElement('div');

				// Lägger till klasser på elementerna jag skapar så designen blir bra.
				fsColumn.className = "attraction col-12 col-sm-6 col-lg-4";
				fsCard.className = "card";
				fsImgColumn.className = "fs-img-col";
				fsInfoColumn.className = "fs-info-col";
				fsItemName.className = "fw-bold";

				fsItemName.innerText = items[i]['venue']['name'];

				// Vissa attraktionen får ej in en adress. Denna kollar om attraktionen innehåller en adress.
				// Om en adress finns så visar den adressen annars är det tomt.
				// Om jag ej gör denna koll så trycks det ut "Undefined" på adress-raden.
				if (items[i]['venue']['location']['address']) {
					fsItemLocation.innerText = items[i]['venue']['location']['address'];

				} else {
					fsItemLocation.innerText = "";
				}
				fsItemCity.innerText = items[i]['venue']['location']['city'];

				// Hämtar bilderna på attraktionerna.
				fetch(FS_IMG_URL)
					.then(response => response.json())
					.then(res => {
						console.log(res);
						let prefix = res['response']['photos']['items'][0]['prefix'];
						let suffix = res['response']['photos']['items'][0]['suffix'];
						let size = "200x200"
						// Lägger ihop prefix, storlek och suffix så att det blir en länk till bilden.
						let img = prefix + size + suffix;
						fsImg.src = img;
						fsImgColumn.appendChild(fsImg);
					})
				.catch(err => console.log("Error, probably rate limit exceeded or some items doesn't have an image."))
				
				// Lägger in alla element på sidan och lägger dom där dom ska ligga.
				fsContainer.appendChild(fsColumn);
				fsColumn.appendChild(fsCard);
				fsCard.prepend(fsImgColumn);
				fsCard.appendChild(fsInfoColumn);

				fsInfoColumn.appendChild(fsItemName);
				fsInfoColumn.appendChild(fsItemLocation);
				fsInfoColumn.appendChild(fsItemCity);
			}
		})
	.catch(err => {
		console.log("Some items couldn't load correctly")
	})
});

// En funktion som rensar all innehåll som man får från Foursquare så att det ej blir dubbletter.
function removeAll() {
	let getAttractions = document.querySelectorAll(".attraction");
	for (let i = 0; i < getAttractions.length; i++){
		getAttractions[i].remove();
	}
}