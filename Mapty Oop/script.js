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
    clicks = 0;

    constructor(coords, distance, duration) {
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }

    _setDescription() {
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]
            } ${this.date.getDate()}`;
    }

    click() {
        this.clicks++;
    }
}


class Running extends Workout {
    type = "running";

    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }

    calcPace() {
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}


class Cycling extends Workout {
    type = "cycling";

    constructor(coords, distance, duration, elevation) {
        super(coords, distance, duration);
        this.elevation = elevation;
        this.calcSpeed();
        this._setDescription();
    }

    calcSpeed() {
        this.speed = this.distance / (this.duration / 60);
        this.speed;
    }
}

// const running1 = new Running([22, 91], 120, 25, 125);
// const cycling1 = new Cycling([22, 91], 500, 15, 525);

// console.log(running1, cycling1);

class App {
    #map;
    #mapEvent;
    #workouts = [];
    #mapZoomLevel = 13;

    constructor() {
        // Get the position
        this._getPosition();

        // Get workouts data from localstorage
        this._getLocaleStorage();

        form.addEventListener("submit", this._newWorkout.bind(this));
        inputType.addEventListener("change", this._toggoleElevationField);
        containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
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

        this.#workouts.forEach(work => {
            this._renderWorkoutMarker(work);
        })
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
    }

    _hideForm() {
        // make input filed empty
        inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = "";

        form.style.display = "none";
        form.classList.add("hidden");

        setTimeout(() => form.style.display = 'grid', 1000)
    }

    _toggoleElevationField() {
        inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
        inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    }

    _newWorkout(e) {

        const validInputs = (...inputs) => inputs.every(input => Number.isFinite(input))

        const allPositive = (...inputs) => inputs.every(input => input > 0)

        e.preventDefault();

        // Get data from form
        let type = inputType.value;
        let distance = +inputDistance.value;
        let duration = +inputDuration.value;
        const { lat, lng } = this.#mapEvent.latlng;
        let workout;

        // if workout cycling , create cycling object
        if (type === "cycling") {
            let elevation = +inputElevation.value;

            // Check if data is valid
            if (!validInputs(distance, duration, elevation) || !allPositive(distance, duration, elevation)) {
                console.log(distance);
                console.log(duration);
                console.log(elevation);
                return alert('Inputs have to be positive numbers!')
            }

            workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        // if workout running , create running object
        if (type === "running") {
            let cadence = +inputCadence.value;

            // Check if data is valid
            if (!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence)) {
                console.log(distance);
                console.log(duration);
                console.log(cadence);
                return alert('Inputs have to be positive numbers!')
            }

            workout = new Running([lat, lng], distance, duration, cadence);
        }

        // add a new object to workout arrays
        this.#workouts.push(workout);
        console.log(workout);
        console.log(this.#workouts)

        // Render workout on map as marker
        this._renderWorkoutMarker(workout);

        // Render Workout list
        this._renderWorkout(workout);

        // clear all input filed
        this._hideForm();

        // set workout to local storage
        this._setLocaleStorage();
    }

    _renderWorkoutMarker(workout) {
        L.marker(workout.coords).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 300,
                minWidth: 200,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`
            }))
            .setPopupContent("workout")
            .openPopup();
    }

    _renderWorkout(workout) {
        let html = `
            <li class="workout workout--${workout.type}" data-id="${workout.id}">
            <h2 class="workout__title">Running on ${workout.description}</h2>
            <div class="workout__details">
                <span class="workout__icon">${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"}</span>
                <span class="workout__value">${workout.distance}</span>
                <span class="workout__unit">km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${workout.duration}</span>
                <span class="workout__unit">min</span>
            </div>
        `

        if (workout.type === "running") {
            html += `
                <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace.toFixed(1)}</span>
                <span class="workout__unit">min/km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">🦶🏼</span>
                    <span class="workout__value">${workout.cadence}</span>
                    <span class="workout__unit">spm</span>
                </div>
                </li>
            `
        }

        if (workout.type === "cycling") {
            html += `
                <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⛰</span>
                    <span class="workout__value">${workout.elevation}</span>
                    <span class="workout__unit">m</span>
                </div>
                </li>
            `
        }

        form.insertAdjacentHTML("afterend", html);
    }

    _moveToPopup(e) {
        let workoutEl = e.target.closest(".workout");

        if (!workoutEl) return;


        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);

        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1,
            },
        })
    }

    _setLocaleStorage() {
        localStorage.setItem("workouts", JSON.stringify(this.#workouts));
    }

    _getLocaleStorage() {
        let data = JSON.parse(localStorage.getItem("workouts"));

        if (!data) return

        this.#workouts = data

        this.#workouts.forEach(work => {
            this._renderWorkout(work);
        })
    }

    _reset() {
        localStorage.removeItem("workouts");
    }
}


const app = new App();