const containerLoad = document.querySelector(".loader");

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