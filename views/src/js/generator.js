window.addEventListener("resize", function () {    
    check();
});
let data={};

let boundary = {};

let img = new Image();


var loadFile = function(event) {
img.src = URL.createObjectURL(event.target.files[0]);
};



// This function enables the download of the certificate
function downloadfunc() {
    if (boundary.right && boundary.left && boundary.bottom) {
        const a = document.createElement("a");
        let canvas2 = document.getElementById("print");
        a.href = canvas2.toDataURL();
        a.download = "canvas-image.png";
        a.click();
        document.body.removeChild(a);
    } else {
        prompt("select all boundaries");
    }

}
// On start, the canvas is drawn, and the various event listeners for the boundary selectors are initializes
function start() {
    rat = img.width / img.height;
    
    let done = document.getElementById("done");
    done.addEventListener('click',function(){
        if(document.getElementById("preview-test")){
            check();
        }
    })
}
img.onload = start;

function check() {
    if (boundary.right && boundary.left && boundary.bottom) {
        let person=document.getElementById("preview-test").value;
        let width = document.getElementById('container').offsetWidth;
        let center = (boundary.left[0] * width + boundary.right[0] * width) / 2
        document.getElementById("canvas").innerHTML = `<canvas id="my_canvas"width="${width}" height="${width / rat}"></canvas>`
        let canvas = document.getElementById("my_canvas");
        let ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.font = `${boundary.fontsize * width/rat}px Verdana`;
        ctx.fillStyle = boundary.color;
        ctx.textAlign = "center";
        ctx.fillText(person, center, boundary.bottom[1] * (width / rat));

    }
}
