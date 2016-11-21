//OUTPUT MESSAGE TO DOCUMENT HTML
var console = new function () {
    "use strict";
    this.log = function (message) {
    document.write(message+"<br>");
  };
  this.clear = function(){
    //not implemented
  }
};

//START EDITING AREA

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var getOrdinal = function (num){
    if (num === 1 || num === 21 || num === 31){
        return num + "st";
    }
    else if (num === 2 || num === 22){
        return num + "nd";
    }
    else if (num === 3 || num === 23){
        return num + "rd";
    }
    else{
        return num + "th";
    }
};

function makeFriendlyDates(arr) {
    var startDate = new Date(),
        startStr = arr[0].split('-');
    startDate.setFullYear(parseInt(startStr[0]));
    startDate.setMonth(parseInt(startStr[1])-1);
    startDate.setDate(parseInt(startStr[2]));
    var startYear = startDate.getFullYear(),
        startMonth = startDate.getMonth(),
        startDay = startDate.getDate();
    var endDate = new Date(),
        endStr = arr[1].split('-');
    endDate.setFullYear(parseInt(endStr[0]));
    endDate.setMonth(parseInt(endStr[1])-1);
    endDate.setDate(parseInt(endStr[2]));
    var endYear = endDate.getFullYear(),
        endMonth = endDate.getMonth(),
        endDay = endDate.getDate();
    
    if (startDate.getTime() === endDate.getTime()){
        return [monthNames[startMonth] + " " + getOrdinal(startDay) + ", " + startYear];
    }
    else if(startYear === endYear && startMonth === endMonth){ 
        return [monthNames[startMonth] + " " + getOrdinal(startDay), getOrdinal(endDay)];
    }
    else{
        if (startYear !== new Date().getFullYear()){
            if (startMonth !== endMonth){
                return [monthNames[startMonth] + " " + getOrdinal(startDay) + ", " + startYear, monthNames[endMonth] + " " + getOrdinal(endDay)];
            }
            else{
                if (startDay > endDay){
                    return [monthNames[startMonth] + " " + getOrdinal(startDay) + ", " + startYear, monthNames[endMonth] + " " + getOrdinal(endDay)];
                }
            }
        }
        else{
            if (startYear === endYear-1 && (((startMonth >= endMonth && startDay > endDay)) || startMonth > endMonth)){
                return [monthNames[startMonth] + " " + getOrdinal(startDay), monthNames[endMonth] + " " + getOrdinal(endDay)];
            }
        }
        return [monthNames[startMonth] + " " + getOrdinal(startDay) + ", " + startYear, monthNames[endMonth] + " " + getOrdinal(endDay) + ", " + endYear];
    }
    return arr;
}

//PUT CODE IN THIS FUNCTION
var script = function(){
    console.log(makeFriendlyDates(["2016-12-01", "2017-02-03"]));
};

//END EDITING AREA

//THIS RUNS THE SCRIPT AND OUTPUTS EXCEPTIONS (DOESN'T TRACE)
var runner = new function(){
  try{
      script();
  }
  catch(e){
    console.log(e);
  }
};
