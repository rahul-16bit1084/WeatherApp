//****************** Method 1 ****************** 


//let city = "Zamania" ;   // for difft. cities

//$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&metric=Celsius&APPID=9a4aa68d14820cd280ed306f0318743b", function(data){
//	console.log(data);

     
//	var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";  //since icon follows an array in JSON
  //  var temp = Math.floor(data.main.temp);  //to remove decimal value of temp
 //   var weather = data.weather[0].main;
 //   var coordlon = data.coord.lon;
 //   var coordlat = data.coord.lat;


   // $(".city").append(city);
	//$(".icon").attr("src", icon);   //to get icon from jquery
    //$("#temp-value").append(temp);   // append to add temp variable
    //$(".weather").append(weather);
    //$(".coord").append(coordlon,  ", " , coordlat);
    
 // });



//************* Method 2 ****************
//freepic.com :- for icons
let loc = document.getElementById("location");
let icon = document.getElementById("temp-icon");
let tempValue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
let searchInputBox =  document.getElementById("input-box");







window.addEventListener("load", () => {
	let long;
	let lat;

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition((position) =>{
			long = position.coords.longitude;
			lat = position.coords.latitude;

          // const proxy = "https://cors-anywhere.herokuapp.com/"
			let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=9a4aa68d14820cd280ed306f0318743b` ;
			fetch(api)
			.then((response) => {
				return response.json();
			})
			.then(data =>{
				// Object Destructuring :- we fetch data from api
				const { name } = data ;
				const { feels_like } = data.main;
				const { id, main } = data.weather[0];
				//showing loc,climate,.. in DOM(loading data to HTML pages) using textContent :- 
				loc.textContent = name;
				climate.textContent = main;
				tempValue.textContent = Math.round(feels_like - 273);

				if(id < 250){
					icon.src = './icons/Thunderstorm.gif'
				}
				else if(id < 350){
					icon.src = './icons/Drizzle.gif'
				}
				else if(id < 550){
					icon.src = './icons/Rain.gif'
				}
				
				else if(id < 650){
					icon.src = './icons/Snow.gif'
				}
				else if(id < 750){
					icon.src = './icons/Atmosphere.gif'
				}
				else{
					icon.src = './icons/Clear.gif'
				}

				console.log(data);
			})
		})
	}

	
       
       searchInputBox.addEventListener("keypress", (event) => {

	// searchInputBox
     
     if (event.keyCode == 13) {
     	console.log(searchInputBox.value);

     	let api = `https://api.openweathermap.org/data/2.5/weather?q=${searchInputBox.value}&units=metric&appid=9a4aa68d14820cd280ed306f0318743b`;
        fetch(api)
        .then((response) => {
        	return response.json();
        })
        .then(data =>{
        	loc.textContent = `${data.name}, ${data.sys.country}`;
        	tempValue.textContent = `${Math.round(data.main.feels_like)}`;
        	climate.textContent = `${data.weather[0].main} :- ${data.weather[0].description}`;
            const { id, main } = data.weather[0];

        	if(id < 250){
        		icon.src = './icons/Thunderstorm.gif'
 				}
 				else if(id < 350){
 					icon.src = './icons/Drizzle.gif'
 				}
 				else if(id < 550){
 					icon.src = './icons/Rain.gif'
 				}
				
 				else if(id < 650){
 					icon.src = './icons/Snow.gif'
 				}
 				else if(id < 750){
 					icon.src = './icons/Atmosphere.gif'
 				}
 				else{
 					icon.src = './icons/Clear.gif'
 				}

        	console.log(data);
        })
        .catch((error) => {
        	window.alert(error.message);
        })

     }    	
     })
 
 	
})
