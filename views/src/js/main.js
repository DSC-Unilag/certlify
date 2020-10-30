const containerLoad = document.querySelector(".loader");
const modal = document.querySelector(".collectors-modal");

function HideLoader() {
    containerLoad.classList.toggle("zero-opacity");
    setTimeout(() => {
        containerLoad.classList.toggle("hide");
    }, 350);
}

function ShowLoader() {
    containerLoad.classList.toggle("zero-opacity");
    containerLoad.classList.toggle("hide");
}

window.onload = function(){
    HideLoader();
}

function ToggleModal(){
    modal.classList.toggle("hide");
}