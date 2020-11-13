/**
 * THIS SCRIPT IS WHERE THE BOUNDARIES ARE SET FOR A PARTICULAR CERTIFICATE TEMPLATE AND SENT TO THE SERVER FOR STORAGE
 * */
// This array holds the various prompts text that would be diplayed on the screen depending on what boundary is selected
let prompts = ["Please select the left boundary of the space allocated for the name", "Please select the right boundary of the space allocated for the name", "Please select the bottom boundary of the space allocated for the name", ""];
/**
 * Variable to hold the string that would be printed on the certificate
 */
let person;
/**
 * variable to keep track of which prompt is active in the array.
 */
let pos = 0;
/**
 * This is the object that would be stringified and sent to the server.
 * @type {object}
 */
let data = {};
/**
 * This object would hold the boundary for the space selected to write the name on. It has a global scope, therefore the various properties are filled all over the application
 * @type {object}
 * @property {array} left - The normalized coordinates for the left boundary of the name space for the certificate
 * @property {array} right - The normalized coordinates for the left boundary of the name space for the certificate
 * @property {array} bottom - The normalized coordinates for the bottom boundary of the name space(only the y coordinate is actually needed)
 * @property {number} fontsize - The normalized fontsize of the text
 * @property {string} color - The color of the font that would be used to write on the canvas
 */
let boundary = {};
/**
 * Initializing a new image
 */
let img = new Image();

/**
 * @param {object} event 
 */
var cert_error=document.getElementById("cert-error")
let loadFile = function (event) {
    
    if(!event.target.files[0]){
        cert_error.style.display="block";
        cert_error.innerHTML="please upload a valid file"
        
    }else if(event.target.files[0].size>3145728){
        cert_error.style.display="block";
        cert_error.innerHTML="Please ensure yourfile is less than 3MB in size"
       
    }else{
        img.src = URL.createObjectURL(event.target.files[0]);
    }
};

// This variable would store the image width to height ratio to enable proper scaling of canvas dimensions irrespective of screen size 
var rat
// This function changes the content of the prompt heading that guides users on how to select boundaries 
function selector(p, prompts) {
    pos = p
    mark();
    document.getElementById("prompt").innerHTML = prompts[p];
}
// This function creates the canvas element and draws the image inside it. 

// This function returns the normalized coordinates of mouse clicks made on the canvas. These coordinates are used to mark the boundaries of the text
// The normalized coordinates is just the ratio of the actual coordinate component(x or y) and the total span of the plane on which that component lies(width or height). This normalized coordinates can then be converted to appear the same depending on the screen size(size of canvas) 
function getCursorPosition(canvas, event) {
    /**
     * google how to get the position clicked on a an html element.
     */
    const rect = canvas.getBoundingClientRect()
    let width = document.getElementById('container').offsetWidth;
    let height = width / rat;
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top
    /**
     * normalizing the coordinates;
     */
    x = x / width;
    y = y / height;
    // Pos is 0 when selecting the left boundart
    if (pos == 0) {
        if (boundary.right && x > boundary.right[0]) {
            alert("left boundary must be to the left of right boundary")
        } else {
            boundary.left = [x, y];
            mark();
        }
    // pos is 1 when selecting the right boundary.
    } if (pos == 1) {
        if (boundary.left && x < boundary.left[0]) {
            alert("right boundary must be to the right of left boundary")
        } else {
            boundary.right = [x, y]
            mark();
        }
    // pos is 2 when selecting the bottom boundary; 
    } if (pos == 2) {
        boundary.bottom = [x, y];
        mark();
    }

}

function mark() {
    let canvascontainer = document.getElementById("canvas");
    let width = document.getElementById('container').offsetWidth;
    let height = width / rat
    canvascontainer.innerHTML = `<canvas id="my_canvas"width="${width}" height="${height}" class="apply-font"></canvas>`
    let canvas = document.getElementById("my_canvas")
    height = canvas.height;
    canvas.addEventListener('click', function (event) {
        getCursorPosition(canvas, event)
    })
    let ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    if (boundary.left) {
        ctx.beginPath();
        ctx.moveTo(boundary.left[0] * width, 0);
        ctx.lineTo(boundary.left[0] * width, canvas.height);
        ctx.stroke()
    } if (boundary.right) {
        ctx.beginPath();
        ctx.moveTo(boundary.right[0] * width, 0);
        ctx.lineTo(boundary.right[0] * width, canvas.height);
        ctx.stroke()
    }
    if (boundary.bottom && boundary.left && boundary.right) {
        ctx.beginPath();
        ctx.moveTo(boundary.left[0] * width, boundary.bottom[1] * height);
        ctx.lineTo(boundary.right[0] * width, boundary.bottom[1] * height);
        ctx.stroke()
    } if (boundary.bottom && boundary.left && !boundary.right) {
        ctx.beginPath();
        ctx.moveTo(boundary.left[0] * width, boundary.bottom[1] * height);
        ctx.lineTo(canvas.width, boundary.bottom[1] * height);
        ctx.stroke()
    } if (boundary.bottom && boundary.right && !boundary.left) {
        ctx.beginPath();
        ctx.moveTo(boundary.right[0] * width, boundary.bottom[1] * height);
        ctx.lineTo(0, boundary.bottom[1] * height);
        ctx.stroke()
    } if (boundary.bottom && !boundary.left && !boundary.right) {
        ctx.beginPath();
        ctx.moveTo(0, boundary.bottom[1] * height);
        ctx.lineTo(canvas.width, boundary.bottom[1] * height);
        ctx.stroke()
    }
    if (boundary.right && boundary.left && boundary.bottom) {
        let person = document.getElementById("preview-test").value
        let width = canvas.width;
        let center = (boundary.left[0] * width + boundary.right[0] * width) / 2
        boundary.color = document.getElementById("color").value;
        ctx.font = `${boundary.fontsize * width}px ${boundary.fontfamily}`;
        ctx.fillStyle = boundary.color;
        ctx.textAlign = "center";
        ctx.fillText(person, center, boundary.bottom[1] * (width / rat));
    }
}

// On start, the canvas is drawn, and the various event listeners for the boundary selectors are initializes
function start() {
    getBase64Image(img);
    rat = img.width / img.height;
    document.getElementById("upload-div").classList.toggle("hide");
    document.getElementById("container").classList.toggle("show");
    document.getElementById("value-input").classList.toggle("hide");
    mark();
    let width = document.getElementById('container').offsetWidth;
    boundary.fontsize = Number(document.getElementById('number').value) / (width);
    let left_border = document.getElementById("left_border")
    let right_border = document.getElementById("right_border");
    let bottom = document.getElementById("bottom");
    let done = document.getElementById("done");
    done.addEventListener('click', function () {
        if (boundary.right && boundary.left && boundary.bottom) {
            ShowLoader();
            data.boundary = [boundary];
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST", "/api/createcert", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let link = JSON.parse(this.responseText).link
                    let url = JSON.parse(this.responseText).url
                    document.getElementById("email-form").setAttribute("action", `/api/addeligibleusers/${url}`);
                    document.getElementById("add-emails").classList.toggle("hide");
                    document.getElementById("prompt").innerHTML = "";
                    document.getElementById("link").value = link
                    document.getElementById("edit-cert").classList.toggle("hide");
                    document.getElementById("value-input").classList.toggle("hide");
                    HideLoader();
                }
            };
            xhttp.send(JSON.stringify(data));
        }

    })

    left_border.addEventListener('click', function () {
        selector(0, prompts)

    })
    right_border.addEventListener('click', function () {
        selector(1, prompts)

    })
    bottom.addEventListener('click', function () {
        selector(2, prompts)

    })
    preview.addEventListener('click', function () {
        selector(3, prompts)
        person = document.getElementById("preview-test").value
        check();
    });

    document.getElementById("prompt").innerHTML = prompts[0];

    const buttons = document.querySelectorAll('.font-button');

buttons.forEach(el => el.addEventListener('click', event => {
    boundary.fontfamily = el.innerHTML;
    mark();
}));


}
img.onload = start;


// function for storing the certificate template image and generating thumbnail
function getBase64Image(img) {
    // image width to height ratio
    rat = img.width / img.height;

    ShowLoader();
    let canvas = document.createElement("canvas");
    let thumb = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    // Copy the image contents to the canvas
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let dataURL = canvas.toDataURL("image/png");
    data.src = dataURL;
    // for the thumbnail

    thumb.width = 200;
    thumb.height = 200 / rat;
    let ctx2 = thumb.getContext("2d");
    ctx2.drawImage(img, 0, 0, thumb.width, thumb.height);
    HideLoader();
    data.thumb = thumb.toDataURL("image/png");
}

function check() {
    if (boundary.right && boundary.left && boundary.bottom) {
        let width = document.getElementById('container').offsetWidth;
        let center = (boundary.left[0] * width + boundary.right[0] * width) / 2
        document.getElementById("canvas").innerHTML = `<canvas id="my_canvas"width="${width}" height="${width / rat}"></canvas>`
        let canvas = document.getElementById("my_canvas");
        let ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.font = `${boundary.fontsize * width}px ${boundary.fontfamily}`;
        ctx.fillStyle = boundary.color;
        ctx.textAlign = "center";
        ctx.fillText(person, center, boundary.bottom[1] * (width / rat));

    }
}

window.addEventListener("resize", function () {
    mark();
});