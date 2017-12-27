var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


var curColor = "black";
var clickColor = new Array();

// Si on utilise un pinceau, ou alors rectangle/cercle
var rect;
var circle;
var pencil;
app.initialize();

function changeColor(newColor){
    curColor=newColor;
}

function useRect() {
    rect = true;
    circle = false;
    pencil = false;
    $("#inputRect").html(
        "<input type=\"text\" id=\"hight\" placeholder=\"Higth\">"+
        "<input type=\"text\" id=\"width\" placeholder=\"Width\">");
}

window.onload = function() {

    // Array qui stockent les positions
    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();

    // Variable qui permet de savoir si le trait doit être fait ou non
    var paint;

    context =  document.getElementById('zoneDessin').getContext("2d");
    canvas= document.getElementById('zoneDessin');

    // Si on souhaite dessiner un rectangle
    if (rect) {
        $('#zoneDessin').mousedown(function(e){
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;
            
            paint = true;
            addRectClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            redraw();
        })
    }


    // Si on utilise le pinceau
    else {
        $('#zoneDessin').mousedown(function(e){
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;
                
            paint = true;
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            redraw();
        });

        $('#zoneDessin').mousemove(function(e){
            if(paint){
                addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                redraw();
            }
        });

        $('#zoneDessin').mouseup(function(e){
            paint = false;
        });

        $('#zoneDessin').mouseleave(function(e){
            paint = false;
        });
    }


    function addClick(x, y, dragging)
    {
      clickX.push(x);
      clickY.push(y);
      clickDrag.push(dragging);
      clickColor.push(curColor);
    }

    function redraw(){
      context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
      
      context.lineJoin = "round";
      context.lineWidth = 5;
                
      for(var i=0; i < clickX.length; i++) {        
        context.beginPath();
        if(clickDrag[i] && i){
          context.moveTo(clickX[i-1], clickY[i-1]);
         }else{
           context.moveTo(clickX[i]-1, clickY[i]);
         }
         context.lineTo(clickX[i], clickY[i]);
         context.closePath();
         context.strokeStyle = clickColor[i];
         context.stroke();
        }
    }

    
}

