var pomodoro = {
    state: {
        work: 0,
        rest: 1
    },
    currentState: null,
    workTime: 25,
    workTimeColor: "#1e90ff",
    workTimeHtml: null,
    restTime: 5,
    restTimeColor: "#dc143c",
    restTimeHtml: null,
    remainingTime: 25 * 60,
    remainingTimeHtml: null,
    stateLabelHtml: null,
    toggleButton: null,
    timer: -1,
    running: false,
    init: function (restHtml, workHtml, remainingHtml, stateHtml, toggleBtn) {
        console.log("init");
        pomodoro.workTimeHtml = workHtml;
        pomodoro.restTimeHtml = restHtml;
        pomodoro.remainingTimeHtml = remainingHtml;
        pomodoro.stateLabelHtml = stateHtml;
        pomodoro.toggleButton = toggleBtn;
        pomodoro.workTime = 25;
        pomodoro.restTime = 5;
        pomodoro.reset();
    },
    reset: function () {
        if (pomodoro.running){
            pomodoro._stopSession();
        }
        pomodoro.currentState = pomodoro.state.work;
        pomodoro.remainingTime = pomodoro.workTime * 60;
        pomodoro.restTimeHtml.text(pomodoro.restTime);
        pomodoro.workTimeHtml.text(pomodoro.workTime);
        pomodoro.remainingTimeHtml.removeClass();
        pomodoro.remainingTimeHtml.addClass("work-time");
        pomodoro.stateLabelHtml.removeClass();
        pomodoro.stateLabelHtml.addClass("work-time-label");
        pomodoro.stateLabelHtml.text("Working");
        pomodoro.toggleButton.text("Start");
        pomodoro._updateRemainingTime();
    },
    addWorkMin: function () {
        if (pomodoro.running) return;
        pomodoro.workTime += 1;
        pomodoro.reset();
    },
    addRestMin: function () {
        if (pomodoro.running) return;
        pomodoro.restTime += 1;
        pomodoro.reset();
    },
    subWorkMin: function () {
        if (pomodoro.running) return;
        if (pomodoro.workTime - 1 > 1){
            pomodoro.workTime -= 1;
        }
        else{
            pomodoro.workTime = 1;
        }
        pomodoro.reset();
    },
    subRestMin: function () {
        if (pomodoro.running) return;
        if (pomodoro.restTime - 1 > 1){
            pomodoro.restTime -= 1;
        }
        else{
            pomodoro.restTime = 1;
        }
        pomodoro.reset();
    },
    _updateRemainingTime: function () {
        var min = parseInt(pomodoro.remainingTime/60);
        var sec = pomodoro.remainingTime%60;
        if (sec < 10){
            sec = "0"+sec;
        }
        pomodoro.remainingTimeHtml.text(min+":"+sec);
    },
    _startSession: function () {
        console.log("start session");
        pomodoro.running = true;
        pomodoro.timer = setInterval(pomodoro._update, 1000);
    },
    _stopSession: function () {
        console.log("pause session");
        pomodoro.running = false;
        clearInterval(pomodoro.timer);
    },
    _update: function () {
        console.log("update");
        switch (pomodoro.currentState){
            case pomodoro.state.work:
                pomodoro.remainingTime -= 1;
                if (pomodoro.remainingTime === 0){
                    pomodoro.currentState = pomodoro.state.rest;
                    pomodoro.remainingTime = pomodoro.restTime * 60;
                    pomodoro.remainingTimeHtml.removeClass();
                    pomodoro.remainingTimeHtml.addClass("rest-time");
                    pomodoro.stateLabelHtml.removeClass();
                    pomodoro.stateLabelHtml.addClass("rest-time-label");
                    pomodoro.stateLabelHtml.text("Resting");
                    console.log("changed to rest state");
                }
                break;
            case pomodoro.state.rest:
                pomodoro.remainingTime -= 1;
                if (pomodoro.remainingTime === 0){
                    pomodoro.currentState = pomodoro.state.work;
                    pomodoro.remainingTime = pomodoro.workTime * 60;
                    pomodoro.remainingTimeHtml.removeClass();
                    pomodoro.remainingTimeHtml.addClass("work-time");
                    pomodoro.stateLabelHtml.removeClass();
                    pomodoro.stateLabelHtml.addClass("rest-time-label");
                    pomodoro.stateLabelHtml.text("Working");
                    console.log("changed to work state");
                }
                break;
        }
        pomodoro._updateRemainingTime();
    },
    toggle: function () {
        if (pomodoro.running){
            pomodoro._stopSession();
            pomodoro.toggleButton.text("Start");
        }
        else{
            pomodoro._startSession();
            pomodoro.toggleButton.text("Stop");
        }
    }
};