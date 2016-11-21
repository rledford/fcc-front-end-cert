var canvas = document.getElementById("game-window");
var ctx = canvas.getContext("2d");
var tBG = document.getElementById("bg");
var tX = document.getElementById("x");
var tO = document.getElementById("o");

var board = [];

var width = 300;
var height = 300;
var turn = "x";
var plays = 0;
var playing = true;
var winner = null;

var player = {
    val: "x",
    img: tX
};

var ai = {
    val: "o",
    img: tO
};

var init = function(){
    for(var i = 0; i < 3; i++){
        board.push([]);
        for (var j=0; j < 3; j++){
            board[i][j]=new Tile(j*(width/3), i*(height/3), width/3, height/3);
        }
    }
    canvas.onclick = handleClick;
};

var checkWin = function (val) {
    //check horizontal
    var win = false;
    for (var r = 0; r < 3; r++){
        for (var c = 0; c < 3; c++){
            if (board[r][c].val != val){
                break;
            }
            else{
                if (c == 2){
                    win = true;
                }
            }
        }
    }
    //check vertical
    for (var c = 0; c < 3; c++){
        for (var r = 0; r < 3; r++){
            if (board[r][c].val != val){
                break;
            }
            else{
                if (r == 2){
                    win = true;
                }
            }
        }
    }
    //check diagonals
    for (var r = 0; r < 3; r++){
        if (board[r][r].val != val){
            break;
        }
        else{
            if (r == 2){
                win = true;
            }
        }
    }
    for (var r = 0; r < 3; r++){
        if (board[r][2-r].val != val){
            break;
        }
        else{
            if (r == 2){
                win = true;
            }
        }
    }
    console.log(plays);
    if (win){
        winner = val;
    }
    if (plays == 9 && win == false){
        winner = "No one";
    }
    return win;
};

var aiPlay = function (){
    var tries = 10;
    while(tries > 0){
        var r = Math.floor(Math.random()*3);
        var c = Math.floor(Math.random()*3);
        console.log("r:c "+r+":"+c);
        if (board[r][c].val == null){
            console.log("random");
            board[r][c].occupy(ai.val, ai.img);
            plays++;
            return;
        }
        tries--;
    }
    board.forEach(function(row){
        row.forEach(function(tile){
            if (tile.val == null){
                console.log("next available");
                tile.occupy(ai.val, ai.img);
                plays++;
                return;
            }
        });
    });
};

var showWinner = function () {
    $("#winner-val").html(winner);
    $("#winner").dialog({
        autoOpen: false,
        modal: true,
        dialogClass: "no-close",
        resizable: false,
        height: "auto",
        width: 200,
        buttons: {
            "OK": function(){
                $(this).dialog("close");
                reset();
            }
        }
    });
    $("#winner").dialog("open");
}

var reset = function (){
    plays = 0;
    winner = null;
    turn = "x";
    board.forEach(function(row){
        row.forEach(function(tile){
            tile.reset();
        });
    });
    
    playing = true;
};

var update = function(){
    if (playing && turn == ai.val){
        aiPlay();
        if(!checkWin(ai.val)){
            turn = player.val;
        }
    }
    draw();
    if (playing && winner != null){
        playing = false;
        showWinner();
        winner = null;
    }
};

var draw = function(){
    ctx.clearRect(0,0,width,height);
    board.forEach(function(row){
        row.forEach(function(tile){
            ctx.drawImage(tBG, tile.left, tile.top, tile.width, tile.height);
            tile.draw(ctx);
        });
    });
}

var handleClick = function(evt){
    if (!playing) return;
    var point = unproject({x: evt.clientX, y: evt.clientY});
    board.forEach(function(row){
       row.forEach(function(tile){
          if (tile.contains(point) && tile.val === null){
              plays++;
              tile.occupy(player.val, player.img);
              if (!checkWin(player.val)){
                  turn = ai.val;
              }
              return;
          }
       });
    });
};

var unproject = function(pos){
    var rect = canvas.getBoundingClientRect();
    return {
        x: pos.x - rect.left,
        y: pos.y - rect.top
    };
};

init();
$("#dialog").dialog({
    autoOpen: false,
    modal: true,
    dialogClass: "no-close",
    resizable: false,
    height: "auto",
    width: 200,
    buttons: {
        "X": function(){
            player.img = tX;
            player.val = "x";
            ai.img = tO;
            ai.val = "o";
            $(this).dialog("close");
        },
        "O": function(){
            player.img = tO;
            player.val = "o";
            ai.img = tX;
            ai.val = "x";
            $(this).dialog("close");
        }
    },
});
$("#dialog").dialog("open");
setInterval(update, 25/1000);