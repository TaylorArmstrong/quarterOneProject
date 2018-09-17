document.addEventListener('DOMContentLoaded', (event) => {

//**      Navbar      **//
// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()}
// Select the navbar
var navbar = document.getElementById('navbar')
// Select offset position of navbar
var sticky = navbar.offsetTop
// Add sticky class to navbar when you reach its' scroll position & remove 'sticky' when you leave the scroll position.
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add('sticky')
  } else {
    navbar.classList.remove('sticky');
  }
}
//**      Navbar      **//


  renderLat()
  renderLon()

	document.getElementById('myForm').addEventListener('submit', function (event) {
  	event.preventDefault()

//**      input convert city to lat & lon     **//
    let inputLat = document.getElementById('lat')
    setLat(inputLat.value)
    renderLat()
    let inputLon = document.getElementById('lon')
    setLon(inputLon.value)
    renderLon()
//**      input convert city to lat & lon     **//

    let inputMin = document.getElementById('min')
    setMin(inputMin.value)
    renderMin()

//**      input (latitude & longitude search parameters)      **//
//**      input convert city to lat & lon     **//
    let loc = document.getElementById('loc').value
    let url1 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${loc}.json?access_token=pk.eyJ1IjoidGF5bG9yYXJtc3Ryb25nIiwiYSI6ImNqbTNvdTdsOTBnOHYzcXA3MjA4ODBsNmsifQ.uKQmcHeCDbKsbJRYGMxMug`
    axios.get(url1)
    .then((response) => {
      console.log(response.status)
      // console.log(response.data)
      // console.log(response.data.features["0"].bbox["0"])
      // console.log(response.data.features["0"].bbox["1"])
    document.getElementById('lat').value = response.data.features["0"].bbox["1"]
    document.getElementById('lon').value = response.data.features["0"].bbox["0"]
    //**      input convert city to lat & lon     **//
    })
//**      input (latitude & longitude search parameters)      **//

    //**API
    //API working, just need to make object to store appropriate Data, maybe make buttton to switch between Celsius and Fahrenheit as well as change location of data?

    //Step 1: fetch some data from a server.
    let lat = localStorage.getItem('lat')
    let lon = localStorage.getItem('lon')
    let url = `http://api.weatherunlocked.com/api/current/${lat},${lon}?app_id=8e567820&app_key=e231783424f10444f19408b224fbbbb9`
    axios.get(url)
    .then((response) => {
      //Step 2: Log Data and see what you are getting back as a response
      // console.log(response.data)
      // console.log(response.data.feelslike_c) // feels like temperature in Celsius
      // console.log(response.data.feelslike_f) // feels like temperature in Fahrenheit
      // console.log(response.data.temp_c) // temperature in Celsius
      // console.log(response.data.temp_f) // temperature in Fahrenheit
      // console.log(response.data.vis_mi) // visibility in miles
      // console.log(response.data.vis_km) // visibility in km
      // console.log(response.data.winddir_deg)  // wind direction in degrees
      // console.log(response.data.windspd_kmh)  // wind speed kmh
      // console.log(response.data.windspd_mph)  // wind speed mph
      // console.log(response.data.wx_desc)  // weather? description (i.e. 'Clear skies', )
      console.log(response.status)
      // let weatherData = response.data
      let latitude = response.data.lat
      let longitude = response.data.lon
      // let flTempC = response.data.feelslike_c // feels like temperature in Celsius
      let flTempF = response.data.feelslike_f // feels like temperature in Fahrenheit
      // let tempC = response.data.temp_c // temperature in Celsius
      let tempF = response.data.temp_f // temperature in Fahrenheit
      let visibilityMiles = response.data.vis_mi // visibility in miles
      // let visibilityKm = response.data.vis_mi // visibility in miles
      let windDir = response.data.winddir_deg  // wind direction in degrees
      let windSpdKmh = response.data.windspd_kmh  // wind speed kmh
      let windSpdMph = response.data.windspd_mph  // wind speed mph
      let weatherDesc = response.data.wx_desc  // weather description

      //Step 3: Insert that data into your DOM, with some DOM creation/manipulation
      let weatherList = document.querySelector('#weatherIcon p.weather-text')
      console.log('weatherList', weatherList);
      document.getElementById('weatherDescription').innerText = `Your location is latitude: ${latitude}, longitude: ${longitude}. It is ${tempF}° Fahrenheit, but it feels like ${flTempF}° Fahrenheit. You currently have ${visibilityMiles} miles of visibility. The wind is blowing ${windSpdMph} Mph at ${windDir}°. The current weather is ${weatherDesc}.`

    })
    //**API

    //**      Input Difficulty & Distance of Hike     **//
    let url2 = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=10&minLength=${min}&key=112496723-8c25d2a96a12588709652b75e8813b84`
    axios.get(url2)
    .then((response) => {
    console.log(response.status)
    console.log(response.data)
    console.log(response.data.trails['0'].name)


    //** Input Data into list
    // loop over data, creating <li>'s inside an <ol>
    let hikeList = document.getElementById('hikeList')
    // create ol
    let ul = document.createElement('ul')
    // for (var i = 0; i < weatherData.length; i++) {
      // create li
      let tD = response.data.trails

      //li.innerText = `${movies[i].Title} (${movies[i].Year})`
      for (let i = 0; i < tD.length; i++) {
        let li = document.createElement('li')
        let a = document.createElement('a')
      li.innerText += `Hike name: ${tD[i].name}, Location: ${tD[i].location}
      Summary: ${tD[i].summary}
      Length: ${tD[i].length} miles, Difficulty: ${tD[i].difficulty}
      Highest Elevation: ${tD[i].high}ft, Lowest Elevation: ${tD[i].low}ft
      Ascent: ${tD[i].ascent}ft, Descent: ${tD[i].descent}ft
      Condition Status: ${tD[i].conditionStatus} from ${tD[i].conditionDate}.
      Voted ${tD[i].stars} stars from ${tD[i].starVotes} reviews.
      `
      a.innerText += `More Information

      `
      a.href += `${tD[i].url}`

      // li.innerText = More Information
      // li.href += `${tD[i].url}`

      ul.appendChild(li)
      ul.appendChild(a)
      }
    hikeList.appendChild(ul)
    //** Input Data into list
    })
    //**      Input Difficulty & Distance of Hike     **//
  })

	/*     Set latitude in Local Storage function     */
function setLat (lat) {
  var inputLat = document.getElementById('lat')
   localStorage.setItem('lat', inputLat.value)
}
	/*     Set latitude in Local Storage function     */

	/*     Set longitude in Local Storage function     */
function setLon (lon) {
  let inputLon = document.getElementById('lon')
   localStorage.setItem('lon', lon)
}
	/*     Set longitude in Local Storage function     */

  /*     Set Difficulty in Local Storage function     */
function setMin (min) {
  let inputMin = document.getElementById('min')
   localStorage.setItem('min', min)
}
	/*     Set Difficulty in Local Storage function     */

/*      Render latitude if it is stored in Local Storage      */
function renderLat () {
  let lat = 0
  const localLat = localStorage.getItem('lat')
  lat = localLat
  return lat
}
/*      Render latitude if it is stored in Local Storage      */

/*      Render longitude if it is stored in Local Storage      */
function renderLon () {
  let lon = 0
  const localLon = localStorage.getItem('lon')
  lon = localLon
  return lon
}
/*      Render longitude if it is stored in Local Storage      */

/*      Render longitude if it is stored in Local Storage      */
function renderMin () {
  let min = 0
  const localMin = localStorage.getItem('min')
  min = localMin
  return min
}
/*      Render longitude if it is stored in Local Storage      */
})



// let url2 = 'https://unsplash.com/search/photos/rain'
// axios.get(url2)
// .then((response) => {
// console.log(response.status)
// console.log(response.data)
// })



//**      Fade out Any Element you Click On     **//

// function fadeMeOut(item) {
//   let op = 1;
//   item.style.opacity = 1;
//   let fadeOut = setInterval(function() {
//     item.style.opacity = op;
//     op -= 0.02;
//   }, 50);
//   if (item.style.opacity === 0.1) {
//     item.style.opacity = 0;
//     clearInterval(fadeOut)
//   }
// }
//
// document.addEventListener('click', function(event) {
//   let item = event.target;
//   fadeMeOut(item);
// })
//**      Fade out Any Element you Click On     **//



//** Input Data into list
// // loop over data, creating <li>'s inside an <ol>
//
// // create ol
// let ol = document.createElement('ol')
// // for (var i = 0; i < weatherData.length; i++) {
//   // create li
//   let li = document.createElement('li')
//   //li.innerText = `${movies[i].Title} (${movies[i].Year})`
//   li.innerText = `latitude: ${latitude}, longitude: ${longitude}. ${tempF}°F, feels like: ${flTempF}°F. ${visibilityMiles} miles of visibility. wind: ${windSpdMph} Mph at ${windDir}°. The current weather is ${weatherDesc}.`
//   ol.appendChild(li)
// weatherList.appendChild(ol)
//** Input Data into list