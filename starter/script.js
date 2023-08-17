'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages.por}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies.EUR.name
            }</p>
          </div>
        </article> 
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};
///////////////////////////////////////

// const getCountryAndNeighbourData = function (countries) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${countries}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     let concurenciesss = data.currencies;
//     console.log(concurenciesss);

//     //Render country
//     renderCountry(data);

//     //get neigbour country
//     const neigbour = data.borders?.[0];
//     if (!neigbour) return;

//     console.log(neigbour);
//     //ajax call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neigbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };
// getCountryAndNeighbourData('usa');

// const requestss = fetch('https://restcountries.com/v3.1/name/portugal')
//   .then(response => response.json())
//   .then(data =>
//     data[0].currencies.forEach(element => {
//       element;
//     })
//   );
// console.log(requestss);

// fetch('https://restcountries.com/v3.1/name/portugal')
//   .then(response => response.json())
//   .then(data => {
//     const currencies = data[0].currencies;

//     // Iterate over currencies and make requests for each currency code
//     const currencyPromises = currencies.map(currency => {
//       const currencyCode = currency.code;

//       // Make a request for each currency code
//       return fetch(`https://restcountries.com/v3.1/currency/${currencyCode}`)
//         .then(response => response.json())
//         .then(data => {
//           const countryName = data[0].name.common;
//           console.log(`Currency ${currencyCode} is used in ${countryName}`);
//         })
//         .catch(error => console.log(error));
//     });

//     // Wait for all currency requests to finish
//     Promise.all(currencyPromises)
//       .then(() => console.log('All currency requests completed'))
//       .catch(error => console.log(error));
//   })
//   .catch(error => console.log(error));

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ( ${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, `Country not found`)
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found!');
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} bumf bumf bumf`);
      renderError(`something went wrong ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(getJSON())
//     .then(data => {
//       renderCountry(data[0]);
//       console.log(data);
//       const neighbour = data[0].borders?.[0];
//       console.log(neighbour);
//       if (!neighbour) return;
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);
//       response.json();
//     })
//     .then(data => {
//       console.log(data);
//       return renderCountry(data, 'neighbour');
//     })
//     .catch(err => {
//       console.error(`${err} bumf bumf bumf`);
//       renderError(`something went wrong ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
btn.addEventListener('click', function () {
  getCountryData('germany');
});
getCountryData('australia');
//
// let xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://restcountries.com/v3.1/all');
// xhr.send();
// xhr.onload = () => {
//   let data = JSON.parse(xhr.response);
//   /* console.log(data) */
//   let answer = data.filter(dummy => dummy.currencies !== undefined);
//   console.log(answer.length);
//   let realanswer = answer.filter(data => {
//     for (let key in data.currencies) {
//       if (data.currencies[key].name === 'United States dollar') {
//         return data;
//       }
//     }
//   });
//   console.log(realanswer.length, realanswer[0].currencies);
// };
