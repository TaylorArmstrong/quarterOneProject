document.addEventListener('DOMContentLoaded', (event) => {
  //**      Navbar      **// When the user scrolls the page, execute myFunction
  window.onscroll = function() {
    myFunction()
  }
  const heading = document.getElementById('heading')
  // Select offset position of navbar
  const sticky = heading.offsetTop
  // Add sticky class to navbar when you reach its' scroll position & remove 'sticky' when you leave the scroll position.
  function myFunction() {
    if (window.pageYOffset >= sticky) {
      heading.classList.add('sticky')
    } else {
      heading.classList.remove('sticky');
    }
  }
  //**      Navbar      **//
  const form = document.getElementById('myForm')
  form.addEventListener('focus', function(event) {
    event.target.style.background = '#545454'
  }, true)
  form.addEventListener('blur', function(event) {
    event.target.style.background = ''
    //**      input convert city to lat & lon (latitude & longitude search parameters)      **//
    let loc = document.getElementById('loc').value
    let url1 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${loc}.json?access_token=pk.eyJ1IjoidGF5bG9yYXJtc3Ryb25nIiwiYSI6ImNqbTNvdTdsOTBnOHYzcXA3MjA4ODBsNmsifQ.uKQmcHeCDbKsbJRYGMxMug`
    axios.get(url1)
      .then((response) => {
        document.getElementById('lat').value = response.data.features['0'].bbox['1']
        document.getElementById('lon').value = response.data.features['0'].bbox['0']
      })
    //**      input convert city to lat & lon (latitude & longitude search parameters)      **//
  }, true)
  form.addEventListener('submit', function(event) {
    event.preventDefault()
    //**      input data to local storage on Submit     **//
    let inputLat = document.getElementById('lat')
    setLat(inputLat.value)
    renderLat()

    let inputLon = document.getElementById('lon')
    setLon(inputLon.value)
    renderLon()

    let inputMin = document.getElementById('min')
    setMin(inputMin.value)
    renderMin()

    let inputDist = document.getElementById('dist')
    setDist(inputDist.value)
    renderDist()
    //**      input data to local storage on Submit     **//

    let lat = localStorage.getItem('lat')
    let lon = localStorage.getItem('lon')
    let min = localStorage.getItem('min')
    let dist = localStorage.getItem('dist')

    //**      API - fetch location data from weatherUnlocked.     **//
    let url = `http://api.weatherunlocked.com/api/current/${lat},${lon}?app_id=8e567820&app_key=e231783424f10444f19408b224fbbbb9`
    axios.get(url)
      .then((response) => {
        // console.log(response.data)
        // console.log(response.data.wx_icon)
        let latitude = response.data.lat
        let longitude = response.data.lon
        // let flTempC = response.data.feelslike_c // feels like temperature in Celsius
        let flTempF = response.data.feelslike_f // feels like temperature in Fahrenheit
        // let tempC = response.data.temp_c // temperature in Celsius
        let tempF = response.data.temp_f // temperature in Fahrenheit
        let visibilityMiles = response.data.vis_mi // visibility in miles
        // let visibilityKm = response.data.vis_mi // visibility in miles
        let windDir = response.data.winddir_compass // wind direction in degrees
        let windSpdKmh = response.data.windspd_kmh // wind speed kmh
        let windSpdMph = response.data.windspd_mph // wind speed mph
        let weatherDesc = response.data.wx_desc // weather description
        // Insert data into DOM, with some DOM creation/manipulation
        document.getElementById('currentWeather').setAttribute('src', `set/${response.data.wx_icon}`)
        document.querySelector('p.currentWeather').innerText = `${weatherDesc}
        ${windSpdMph}Mph ${windDir}
        ${latitude}/${longitude}`
        document.querySelector('p.currentTemp').innerText = `${tempF}°F`
        document.querySelector('p.currentFLTemp').innerText = `Feels Like: ${flTempF}°F`
        if (response.data.wx_desc !== 'Blizzard') {
          //**      Input Difficulty & Distance of Hike     **//
          let url2 = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=${dist}&minLength=${min}&key=112496723-8c25d2a96a12588709652b75e8813b84`
          axios.get(url2)
            .then((response) => {
              let tD = response.data.trails
              if (tD.length === 0) {
                let hikeList = document.getElementById('hikeList')
                hikeList.innerText = `No Hikes In This Area! Please Modify Your Search Parameters Or Find An Event!!!`
                clearMovieSearch()
                let movies = document.getElementById('movieList')
                let input = document.createElement('INPUT')
                let submitMovie = document.createElement('button')
                input.setAttribute('type', 'text')
                input.setAttribute('class', 'form-control')
                input.setAttribute('id', 'movieSearch')
                input.setAttribute('placeholder', 'City Name')
                input.setAttribute('required', true)
                input.setAttribute('autofocus', true)
                submitMovie.setAttribute('type', 'submit')
                submitMovie.innerText = 'Find an Event Near You'
                movies.appendChild(input)
                movies.appendChild(submitMovie)
                let form1 = document.getElementById('myForm1')
                form1.addEventListener('submit', function(event) {
                  event.preventDefault()
                  //**      input data to local storage on Submit     **//
                  let inputMovie = document.getElementById('movieSearch')
                  setMovie(inputMovie.value)
                  renderMovie()
                  let movie = localStorage.getItem('movie')
                  //**      Input Difficulty & Distance of Hike     **//
                  let url3 = `https://app.ticketmaster.com/discovery/v2/events.json?city=${movie}&apikey=XW7jDcSV45kxGpDV6GQRxxGvrmGssyz4`
                  axios.get(url3)
                    .then((response) => {
                      // console.log(response.status)
                      // console.log(response.data._embedded.events[0])
                      let movies = document.getElementById('movieList')
                      //** Input Data into list
                      // loop over data, creating <li>'s inside an <ul>
                      let ul = document.createElement('ul')
                      for (let i = 0; i < 10; i++) {
                        clearContentMovie()
                        let eList = response.data._embedded.events
                        let li = document.createElement('li')
                        let a = document.createElement('a')
                        let img = document.createElement('img')
                        img.setAttribute('width', '20%')
                        li.innerText += `Event: ${eList[i].name}
                      Date: ${eList[i].dates.start.dateTime}
                      `
                        a.innerText += `More Information

                      `
                        a.href += `${eList[i].url}`
                        img.src += `${eList[i].images[1].url}`
                        ul.appendChild(li)
                        ul.appendChild(a)
                        ul.appendChild(img)
                      }
                      movies.appendChild(ul)
                      //** Input Data into list
                    })
                })
              }
              //** Input Data into list
              // loop over data, creating <li>'s inside an <ul>
              // create ul
              let ul = document.createElement('ul')
              // console.log(tD)
              for (let i = 0; i < tD.length; i++) {
                clearContent()
                clearMovieSearch()
                let li = document.createElement('li')
                let hikeRow = document.createElement('div')
                hikeRow.setAttribute('class', 'row')
                let hikeCol1 = document.createElement('div')
                hikeCol1.setAttribute('class', 'col')
                let img = document.createElement('img')
                let hikeCol2 = document.createElement('div')
                hikeCol2.setAttribute('class', 'col')
                let hikeP = document.createElement('p')
                hikeP.setAttribute('class', 'hikeInformation')
                let hikeA = document.createElement('a')
                let hikeCol3 = document.createElement('div')
                hikeCol3.setAttribute('class', 'col')
                let hikeWeather = document.createElement('div')
                hikeWeather.setAttribute('class', 'col currentHikeWeatherWidget hikeCard-Content')
                let hikeWeatherRow = document.createElement('div')
                hikeWeatherRow.setAttribute('class', 'row')
                let hikeWeatherCol1 = document.createElement('div')
                hikeWeatherCol1.setAttribute('class', 'col s6')
                let hikeCurrentTemp = document.createElement('p')
                hikeCurrentTemp.setAttribute('class', 'currentHikeTemp')
                let hikeFLTemp = document.createElement('p')
                hikeFLTemp.setAttribute('class', 'hikeFLTemp')
                let hikeWeatherCol2 = document.createElement('div')
                hikeWeatherCol2.setAttribute('class', 'col s6')
                let hikeCurrentWeather = document.createElement('p')
                hikeCurrentWeather.setAttribute('class', 'hikeCurrentWeather')
                let hikeCurrentWeatherImg = document.createElement('IMG')
                hikeCurrentWeatherImg.setAttribute('ID', 'hikeCurrentWeatherImg')
                let hikeLat = `${tD[i].latitude}`
                let hikeLon = `${tD[i].longitude}`
                hikeP.innerText += `Hike name: ${tD[i].name}, Location: ${tD[i].location}
                Summary: ${tD[i].summary}
                Length: ${tD[i].length} miles, Difficulty: ${tD[i].difficulty}
                Highest Elevation: ${tD[i].high}ft, Lowest Elevation: ${tD[i].low}ft
                Ascent: ${tD[i].ascent}ft, Descent: ${tD[i].descent}ft
                Condition Status: ${tD[i].conditionStatus} from ${tD[i].conditionDate}.
                Voted ${tD[i].stars} stars from ${tD[i].starVotes} reviews.
                `
                hikeA.innerText += `More Information

                `
                let url = `http://api.weatherunlocked.com/api/current/${hikeLat},${hikeLon}?app_id=8e567820&app_key=e231783424f10444f19408b224fbbbb9`
                axios.get(url)
                  .then((response) => {
                    // console.log(response.data)
                    hikeCurrentTemp.innerText += `${response.data.temp_f}°F`
                    hikeFLTemp.innerText += `Feels Like: ${response.data.feelslike_f}°F`
                    hikeCurrentWeather.innerText += response.data.wx_desc
                    document.querySelectorAll('img#hikeCurrentWeatherImg').forEach(x => x.setAttribute('src', `set/${response.data.wx_icon}`))
                  })
                hikeA.href += `${tD[i].url}`
                img.src += `${tD[i].imgSqSmall}`

                hikeCol1.appendChild(img)
                hikeRow.appendChild(hikeCol1)
                hikeCol2.appendChild(hikeP)
                hikeCol2.appendChild(hikeA)
                hikeRow.appendChild(hikeCol2)
                hikeWeatherCol1.appendChild(hikeCurrentTemp)
                hikeWeatherCol1.appendChild(hikeFLTemp)
                hikeWeatherRow.appendChild(hikeWeatherCol1)
                hikeWeatherCol2.appendChild(hikeCurrentWeather)
                hikeWeatherCol2.appendChild(hikeCurrentWeatherImg)
                hikeWeatherRow.appendChild(hikeWeatherCol2)
                hikeWeather.appendChild(hikeWeatherRow)
                hikeCol3.appendChild(hikeWeather)
                hikeRow.appendChild(hikeCol3)
                li.appendChild(hikeRow)
                ul.appendChild(li)
              }
              hikeList.appendChild(ul)
              //** Input Data into list
            })
        } else {
          document.getElementById('hikeList').innerText = 'Stay Inside and Watch A Movie!'
        }
      })
    //**      API - fetch location data from weatherUnlocked.     **//
  })
})

function clearContent() {
  while (hikeList.hasChildNodes()) {
    hikeList.removeChild(hikeList.childNodes[0])
  }
}

function clearMovieSearch() {
  while (movieList.hasChildNodes()) {
    movieList.removeChild(movieList.childNodes[0])
  }
}

function clearContentMovie() {
  while (movieList.childNodes.length > 2) {
    movieList.removeChild(movieList.childNodes[2])
  }
}

/*     Set latitude in Local Storage function     */
function setLat(lat) {
  const inputLat = document.getElementById('lat')
  localStorage.setItem('lat', inputLat.value)
}
/*     Set latitude in Local Storage function     */

/*     Set longitude in Local Storage function     */
function setLon(lon) {
  let inputLon = document.getElementById('lon')
  localStorage.setItem('lon', lon)
}
/*     Set longitude in Local Storage function     */

/*     Set Min Trail Length in Local Storage function     */
function setMin(min) {
  let inputMin = document.getElementById('min')
  localStorage.setItem('min', min)
}
/*     Set Min Trail Length in Local Storage function     */

/*     Set Distance in Local Storage function     */
function setDist(dist) {
  let inputDist = document.getElementById('dist')
  localStorage.setItem('dist', dist)
}
/*     Set Distance in Local Storage function     */

/*     Set Event/Movie Search City in Local Storage function     */
function setMovie(movie) {
  let inputMovie = document.getElementById('movieSearch').value
  localStorage.setItem('movie', movie)
}
/*     Set Event/Movie Search City in Local Storage function     */

/*      Render latitude if it is stored in Local Storage      */
function renderLat() {
  let lat = 0
  const localLat = localStorage.getItem('lat')
  lat = localLat
  return lat
}
/*      Render latitude if it is stored in Local Storage      */

/*      Render longitude if it is stored in Local Storage      */
function renderLon() {
  let lon = 0
  const localLon = localStorage.getItem('lon')
  lon = localLon
  return lon
}
/*      Render longitude if it is stored in Local Storage      */

/*      Render Min Trail Length if it is stored in Local Storage      */
function renderMin() {
  let min = 0
  const localMin = localStorage.getItem('min')
  min = localMin
  return min
}
/*      Render Min Trail Length if it is stored in Local Storage      */

/*      Render Distance if it is stored in Local Storage      */
function renderDist() {
  let dist = 0
  const localDist = localStorage.getItem('dist')
  dist = localDist
  return dist
}
/*      Render Distance if it is stored in Local Storage      */

/*      Render Event/Movie Search City if it is stored in Local Storage      */
function renderMovie() {
  let movie = 0
  const localMovie = localStorage.getItem('movie')
  movie = localMovie
  return movie
}
/*      Render Event/Movie Search City if it is stored in Local Storage      */





// //**      Fade out Any Element you Click On     **//
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
// document.addEventListener('click', function(event) {
//   let item = event.target;
//   fadeMeOut(item);
// })
// //**      Fade out Any Element you Click On     **//
