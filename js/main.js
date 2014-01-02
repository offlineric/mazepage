d = document;

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function drawbox(x, y) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.fillRect(10 * x, 10 * y, 10, 10);
}

function matrix(rows, cols, defaultValue) { //usage: varName = matrix (16, 10, 0); 
    //will create a 2 dimensional array of rows and columns
    var arr = []; //filled with default value

    // Creates all lines:
    for (var i = 0; i < rows; i++) {

        // Creates an empty line
        arr.push([]);

        // Adds cols to the empty line:
        arr[i].push(new Array(cols));

        for (var j = 0; j < cols; j++) {
            // Initializes:
            arr[i][j] = defaultValue;
        }
    }

    return arr;
}

function checkdirections(x, y) {



    var directions = "";
try {
 var NpixelData = board[x][y-2];
 var SpixelData = board[x][y+2];
 var EpixelData = board[x+2][y];
 var WpixelData = board[x-2][y];
    }
    catch (err) {
     //for when we check -2s
    } 
    if (NpixelData == 0 && y > 0) {
        directions = directions + "N";
    }
    if (SpixelData == 0 && y < 50) {
        directions = directions + "S";
    }
    if (EpixelData == 0 && x < 50) {
        directions = directions + "E";
    }
    if (WpixelData == 0 && x > 0) {
        directions = directions + "W";
    } 

    return directions;

}

function checksolve(x, y) {


    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var directions = "";
    var NpixelData = ctx.getImageData(10 * x, 10 * (y - 1), 1, 1).data;
    var SpixelData = ctx.getImageData(10 * x, 10 * (y + 1), 1, 1).data;
    var EpixelData = ctx.getImageData(10 * (x + 1), 10 * y, 1, 1).data;
    var WpixelData = ctx.getImageData(10 * (x - 1), 10 * y, 1, 1).data;

    if (NpixelData[1] == 255 && y > 0) {
        directions = directions + "N";
    }
    if (SpixelData[1] == 255 && y < 50) {
        directions = directions + "S";
    }
    if (EpixelData[1] == 255 && x < 50) {
        directions = directions + "E";
    }
    if (WpixelData[1] == 255 && x > 0) {
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
    board = matrix (55, 55, 0);
    var history = "Z";
    document.DoneDoneDone = 0;

    var xPos = 2 * (Math.floor(Math.random() * 24) + 1);
    var yPos = 2 * (Math.floor(Math.random() * 24) + 1);

    function step() {
        ourDirections = checkdirections(xPos, yPos);
        oldx = xPos;
        oldy = yPos;
        go = ourDirections[Math.floor(Math.random() * ourDirections.length)];
        
        xPos = xPos + (2 * (go == "E")) - (2 * (go == "W"));
        yPos = yPos + (2 * (go == "S")) - (2 * (go == "N"));
        
        oldx = (oldx + xPos) / 2;
        oldy = (oldy + yPos) / 2;
        
        board [xPos][yPos] = 1;
        board [oldx][oldy] = 1;
        history = history + go;
        ourDirections = checkdirections(xPos, yPos);

        while (ourDirections.length == 0 && document.DoneDoneDone == 0) {
            if (history.length == 1) {
                document.DoneDoneDone = 1;
                                for (var x=0; x < 51; x++) {
                  for (var y=0; y < 51; y++) {
                    if (board[x][y] == 1){
                    drawbox(x,y); }; };}
            };
            go = history.slice(-1);
            history = history.slice(0, history.length - 1);
            xPos = xPos - (2 * (go == "E")) + (2 * (go == "W"));
            yPos = yPos - (2 * (go == "S")) + (2 * (go == "N"));
            ourDirections = checkdirections(xPos, yPos);
        }
        if (document.DoneDoneDone == 0) {
            step();
 //   requestAnimFrame(step)


        }
    }
    if (document.DoneDoneDone == 0) {
        step();
    }
});

/*start pushing buttons here */
        // Wait for the page to load first
        window.onload = function() {

          //Get a reference to the link on the page
          // with an id of "mylink"
          document.RunRunRun = 0;
          var right = document.getElementById("turnRight");
          var left = document.getElementById("turnLeft");
          var up = document.getElementById("turnUp");
          var down = document.getElementById("turnDown");
          var solve = document.getElementById("solve");
          var c = document.getElementById("myCanvas");
          var ctx = c.getContext("2d");
          right.onclick = function() {
          var e = document.getElementById("myCanvas");
          e.className='east';
        //  alert('lol turning right');
            return false;
          }
          left.onclick = function() {
          var e = document.getElementById("myCanvas");
          e.className='west';
         // alert('lol turning right');
            return false;
          }
          up.onclick = function() {
          var e = document.getElementById("myCanvas");
          e.className='north';
         // alert('lol turning right');
            return false;
          }
          down.onclick = function() {
          var e = document.getElementById("myCanvas");
          e.className='south';
         // alert('lol turning right');
            return false;
          }


          solvestep = function() {
          if (document.DoneDoneDone == 0) {return false;}
          if (document.RunRunRun == 0) {
          X = 0;
          Y = 0;
          shistory = "Z";
          document.RunRunRun = 1;
          document.body.className = " start";
          console.log('init');
          }

          ctx.fillStyle = "#ff0000";
          drawbox(X,Y);
          var ourDirections = checksolve(X,Y);

          var go = ourDirections[0];

          X = X + (go=="E") - (go=="W");
          Y = Y + (go=="S") - (go=="N");
          drawbox(X,Y);
          
        shistory = shistory + go;
        ourDirections = checksolve(X,Y);

        while (ourDirections.length == 0 && (X+Y  != 100)) {
            go = shistory.slice(-1);
            shistory = shistory.slice(0, shistory.length - 1);
          ctx.fillStyle = "#fefefe";
          drawbox(X,Y);
          X = X - (go=="E") + (go=="W");
          Y = Y - (go=="S") + (go=="N");
            ourDirections = checksolve(X,Y);
          //  alert("d= "+ourDirections + " go="+go+ " history=" + history);
        }
        if (X+Y == 100) { document.body.className = "start done"; }
        if (X+Y != 100) {
                          //console.log('now x='+X+" now  y="+Y);
                //requestAnimFrame(solvestep)
            var t = setTimeout(function () {
                solvestep()
            }, 0)


          }
        }
}
