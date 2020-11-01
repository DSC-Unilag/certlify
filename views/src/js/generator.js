
let data = {};
let boundary = {};
let img = new Image();

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
var person
// On start, the canvas is drawn, and the various event listeners for the boundary selectors are initializes
function start() {
    rat = img.width / img.height;
    let done = document.getElementById("done");
    done.addEventListener('click', function () {
        if (document.getElementById("holdername").value) {
            done.style.display="none";
            setTimeout(() => {
                done.style.display="block";
            }, 5000);
            let name = { name: document.getElementById("holdername").value }
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "/api/certgenerate", false);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    person = document.getElementById("holdername").value
                    check();
                    document.getElementById("holdername").readOnly=true;
                }else if(this.readyState == 4 && this.status == 409) {
                    person = document.getElementById("holdername").value
                    check();
                    document.getElementById("holdername").readOnly=true;
                }
            };
            xhttp.send(JSON.stringify(name));

        }
    })
}
img.onload = start;

function check() {
    if (boundary.right && boundary.left && boundary.bottom) {
        let width = 1200;
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

        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
        pdf.save("download.pdf");
        window.location.href = "/";
    }
}
