var SimonGame = function () {
    "use strict";
    this.status = document.getElementById("status");
    this.title = document.getElementById("title");
    this.strict = false;
    this.speed = 1000;
    this.sequence = [];
    this.sequenceItems = ["red", "green", "yellow", "blue"];
    this.expectedPlayerInput = [];
    this.sequenceItemsPlayed = 0;
    this.lastPressed = null;
    this.allowPlayerInput = true;
    this.numTries = 3;
    this.inputTimout = 5000;//five seconds
    this.winCount = 20;
    this.win = false;
};

SimonGame.prototype.init = function () {
    "use strict";
    this.title.innerHTML = "SIMON";
    this.speed = 1000;
    this.sequence = [];
    this.expectedPlayerInput = [];
    this.sequenceItemsPlayed = 0;
    this.lastPressed = null;
    this.allowPlayerInput = true;
    this.numTries = 3;
    this.win = false;
};

SimonGame.prototype.onToggleStrict = function () {
    "use strict";
    this.strict = !this.strict;
    console.log("toggle strict");
};

SimonGame.prototype.reset = function () {
    "use strict";
};

SimonGame.prototype.getRandomSequenceItem = function () {
    "use strict";
    var index = Math.floor(Math.random() * this.sequenceItems.length);
    return this.sequenceItems[index];
};

SimonGame.prototype.addToSequence = function () {
    "use strict";
    var newColor = this.getRandomSequenceItem();
    this.sequence.push(newColor);
};

SimonGame.prototype.playSequence = function () {
    "use strict";
    this.allowPlayerInput = false;
    this.sequenceItemsPlayed = 0;
    this.expectedPlayerInput = this.sequence.slice(0);
    for (var i = 0; i < this.sequence.length; i++){
        var col = this.sequence[i];
        var spd = this.speed;
        var ref = this;//reference to this SimonGame instance
        //use closure to hold references to the above variables
        (function(color, speed, self){
            setTimeout(function () {
                self.playColor(color);
            },i*speed);
            setTimeout(function () {
                self.stopColor(color);
                self.sequenceItemsPlayed++;
                if (self.sequenceItemsPlayed == self.sequence.length){
                    console.log("finished playing sequence");
                    if (self.numTries > 0){
                        self.allowPlayerInput = true;
                    }
                }
            }, (i+(speed*0.00075))*speed);
        })(col, spd, ref)
    }
};

SimonGame.prototype.playColor = function (color) {
    //highlight
    document.getElementById(color).classList.add(color + "-btn-lit");
    //play sound
};

SimonGame.prototype.stopColor = function (color) {
    //dim
    document.getElementById(color).classList.remove(color + "-btn-lit");
    //stop sound
};

SimonGame.prototype.onTouchColor = function (color) {
    "use strict";
    if (this.lastPressed == null && this.allowPlayerInput && this.numTries > 0 && !this.win){
        this.playColor(color);
        this.lastPressed = color;
    }
};

SimonGame.prototype.onTouchUp = function () {
    "use strict";
    if (this.lastPressed != null && this.numTries > 0 && !this.win){
        this.stopColor(this.lastPressed);
        if (this.lastPressed == this.expectedPlayerInput[0]){
            this.expectedPlayerInput.shift();
            if(this.expectedPlayerInput.length == 0){
                this.status.innerHTML = ":)";
                if (this.sequence.length == this.winCount){
                    this.title.innerHTML = "You Win!"
                    this.win = true;
                    return;
                }
                this.allowPlayerInput = false;
                //play success sound or something
                var ref = this;
                (function (self){
                    setTimeout(function () {
                        self.addToSequence();
                        self.status.innerHTML = self.sequence.length;
                        self.playSequence();
                    }, self.speed * 2);
                })(ref);
            }
        }
        else{
            this.status.innerHTML = "!!";
            this.allowPlayerInput = false;
            this.numTries--;
            //play success sound or something
            var ref = this;
            if (this.numTries > 0 && !this.strict){
                (function (self){
                    setTimeout(function () {
                        self.status.innerHTML = self.sequence.length;
                        self.playSequence();
                    }, 1000);
                })(ref);
            }
            else{
                if (this.strict){
                    this.allowPlayerInput = true;
                    this.onClickNewGame();
                    this.status.innerHTML = "!!";
                }
                else{
                    this.title.innerHTML = "Game Over";
                    (function (self){
                        setTimeout(function () {
                            self.playSequence();
                            self.status.innerHTML = self.sequence.length;
                            self.allowPlayerInput = true;
                        }, 1000);
                    })(ref);
                }
            }
            /*
            (function (self){
                setTimeout(function () {
                    self.status.innerHTML = self.sequence.length;
                    self.playSequence();
                }, 1000);
            })(ref);*/
        }
        this.lastPressed = null;
    }
};

SimonGame.prototype.onClickNewGame = function () {
    "use strict";
    if (!this.allowPlayerInput){ return; }
    var ref = this;
    this.allowPlayerInput = false;
    this.status.innerHTML = "--";
    this.title.innerHTML = "New Game";
    (function(self){
        setTimeout(function(){
        self.init();
        self.addToSequence();
        self.status.innerHTML = self.sequence.length;
        self.playSequence();
        }, 2000);
    })(ref);
};

var game = new SimonGame();