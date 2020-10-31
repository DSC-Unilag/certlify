/**
 * 
 */
const fontPicker = new FontPicker(
    "AIzaSyC1c-jtOCKTiFeVfSU6SVT4J3iWIkQ4RYo", // Google API key
    "Open Sans", // Default font
    {
        limit: 40
    }, // Additional options
);
/**
 * 
 */
const containerLoad = document.querySelector(".loader");
/**
 * 
 */
const modal = document.querySelector(".collectors-modal");

/**
 * 
 */
function HideLoader() {
    containerLoad.classList.toggle("zero-opacity");
    setTimeout(() => {
        containerLoad.classList.toggle("hide");
    }, 350);
}

/**
 * 
 */
function ShowLoader() {
    containerLoad.classList.toggle("zero-opacity");
    containerLoad.classList.toggle("hide");
}

/**
 * 
 */
function CopyToClipBoard() {
    let copyText = document.querySelector("#link");

    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    document.execCommand("copy");

    alert("Copied Successfully!");
}

/**
 * 
 */
window.onload = function(){
    HideLoader();
}

/**
 * 
 */
function ToggleModal(){
    modal.classList.toggle("hide");
}