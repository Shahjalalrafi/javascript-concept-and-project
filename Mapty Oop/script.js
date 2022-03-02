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

class Workout {
    date = new Date();
    id = (Date.now() + "").slice(-10);

    constructor(coords, distance, duration) {
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }
}


class Running extends Workout {
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
    }

    calcPace() {
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}


class Cycling extends Workout {
    constructor(coords, distance, duration, elevation) {
        super(coords, distance, duration);
        this.elevation = elevation;
    }

    calcSpeed() {
        this.speed = this.distance / (this.duration / 60);
        this.speed;
    }
}

const running1 = new Running([22, 91], 120, 25, 125);
const cycling1 = new Cycling([22, 91], 500, 15, 525);

console.log(running1, cycling1);

class App {
    #map;
    #mapEvent;

    constructor() {
        this._getPosition();
        form.addEventListener("submit", this._newWorkout.bind(this));
        inputType.addEventListener("change", this._toggoleElevationField);
    }

    _getPosition() {
        navigator.geolocation.getCurrentPosition(this._loadMapPosition.bind(this), function () {
            alert("your position Blocked!!")
        })
    }

    _loadMapPosition(position) {
        const { latitude, longitude } = position.coords;
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

        let coords = [latitude, longitude];

        this.#map = L.map('map').setView(coords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        this.#map.on("click", this._showForm.bind(this));
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
    }

    _toggoleElevationField() {
        inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
            inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    }

    _newWorkout(e) {
        e.preventDefault();

        // clear all input filed
        inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = "";

        const { lat, lng } = this.#mapEvent.latlng;

        L.marker([lat, lng]).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 300,
                minWidth: 200,
                autoClose: false,
                closeOnClick: false,
                className: "running-popup"
            }))
            .setPopupContent("workout")
            .openPopup();
    }
}


const app = new App();