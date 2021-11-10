'use strict';

const modalOpenBtn = document.querySelectorAll(".show-modal")
const modalCloseBtn = document.querySelector(".close-modal")

let modal = document.querySelector(".modal")
let closeModalBtn = document.querySelector(".close-modal")

let overlay = document.querySelector(".overlay")

const openModal = function () {
    modal.classList.remove("hidden")
    overlay.classList.remove("hidden")
}

const closeModal = function () {
    modal.classList.add("hidden")
    overlay.classList.add("hidden")
}


for (let i = 0; i < modalOpenBtn.length; i++) {
    modalOpenBtn[i].addEventListener("click", openModal)

    closeModalBtn.addEventListener("click", closeModal)

    overlay.addEventListener("click", closeModal)

    document.addEventListener("keydown", function(e) {
        console.log(e.key)
        if(e.key === "Escape") {
            closeModal()
        }
    })
}