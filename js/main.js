d = document;

function drawbox(x, y) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.fillRect(10 * x, 10 * y, 10, 10);
}

function checkdirections(x, y) {


    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var directions = "";
    var NpixelData = ctx.getImageData(10 * x, 10 * (y - 2), 1, 1).data;
    var SpixelData = ctx.getImageData(10 * x, 10 * (y + 2), 1, 1).data;
    var EpixelData = ctx.getImageData(10 * (x + 2), 10 * y, 1, 1).data;
    var WpixelData = ctx.getImageData(10 * (x - 2), 10 * y, 1, 1).data;

    if (NpixelData[0] == 0 && y > 0) {
        directions = directions + "N";
    }
    if (SpixelData[0] == 0 && y < 50) {
        directions = directions + "S";
    }
    if (EpixelData[0] == 0 && x < 50) {
        directions = directions + "E";
    }
    if (WpixelData[0] == 0 && x > 0) {
        directions = directions + "W";
    }
    return directions;
}

d.addEventListener("DOMContentLoaded", function () {
    d.removeEventListener("DOMContentLoaded", arguments.callee, false);


    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 510, 510);
    var pixelData = c.getContext('2d').getImageData(10, 10, 1, 1).data;
    ctx.fillStyle = "#ffffff";
    var xPos = 1;
    var yPos = 1;
    var history = "Z";
    document.DoneDoneDone = 0;

    var xPos = 2 * (Math.floor(Math.random() * 24) + 1);
    var yPos = 2 * (Math.floor(Math.random() * 24) + 1);

    function step() {
        ourDirections = checkdirections(xPos, yPos);
        oldx = xPos;
        oldy = yPos;
        go = ourDirections[Math.floor(Math.random() * ourDirections.length)];
        drawbox(xPos, yPos);
        xPos = xPos + (2 * (go == "E")) - (2 * (go == "W"));
        yPos = yPos + (2 * (go == "S")) - (2 * (go == "N"));
        drawbox(xPos, yPos);
        oldx = (oldx + xPos) / 2;
        oldy = (oldy + yPos) / 2;
        drawbox(oldx, oldy);
        history = history + go;
        ourDirections = checkdirections(xPos, yPos);

        while (ourDirections.length == 0 && document.DoneDoneDone == 0) {
            if (history.length == 1) {
                document.DoneDoneDone = 1;
            };
            go = history.slice(-1);
            history = history.slice(0, history.length - 1);
            xPos = xPos - (2 * (go == "E")) + (2 * (go == "W"));
            yPos = yPos - (2 * (go == "S")) + (2 * (go == "N"));
            ourDirections = checkdirections(xPos, yPos);
        }
        if (document.DoneDoneDone == 0) {
            var t = setTimeout(function () {
                step()
            }, 1)


        }
    }
    if (document.DoneDoneDone == 0) {
        step();
    }




});
