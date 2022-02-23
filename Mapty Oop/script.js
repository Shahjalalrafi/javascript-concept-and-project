'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;


navigator.geolocation.getCurrentPosition(function (position) {
    const { latitude, longitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    let coords = [latitude, longitude];

    map = L.map('map').setView(coords, 13);
    console.log(map)

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);



    map.on("click", function (mapE) {
        mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
    })
}, function () {
    alert("your position Blocked!!")
})


form.addEventListener("submit", function (e) {
    e.preventDefault();

    // clear all input filed
    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = "";

    const { lat, lng } = mapEvent.latlng;

    L.marker([lat, lng]).addTo(map)
        .bindPopup(L.popup({
            maxWidth: 300,
            minWidth: 200,
            autoClose: false,
            closeOnClick: false,
            className: "running-popup"
        }))
        .setPopupContent("workout")
        .openPopup();
})

inputType.addEventListener("change", function() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
})