
//this object is strictly used to generate html and should not handle anything else
//WikiGetter should manage moving forward and backward through search queries
var ResultHandler = new function () {
    "use strict";
    
    this.processResults = function (jsonWikiResult) {
        console.log("handling results");
        if (jsonWikiResult.query.hasOwnProperty("searchinfo") || jsonWikiResult.query.hasOwnProperty("pages")){
            ResultHandler.processSearchResult(jsonWikiResult);
        }
        else{
            console.log("unknown JSON object");
        }
        
    };
    
    this.getNavInfoHTML = function (numHits){
        var html = "";
        var resultPageOn = Math.floor((WikiGetter.currentSearchOffset/WikiGetter.currentSearchLimit)+1);
        var resultPageMax = Math.floor(numHits/WikiGetter.currentSearchLimit)+1;
        WikiGetter.currentPage = resultPageOn;
        $("#status-text").html("Found "+numHits+ " articles!");
        html += "<div class='row row-centered' style='margin-bottom: 5px'>";
            html += "<div class='col-md-12' style='inline-block'>";
                html += "<button id='btn-nav-back' class='btn bg-color-primary-dark text-color-white' onclick='WikiGetter.getPreviousResultPage()'>\<</button>";
                html += "\t\t";
                html += "<button id='btn-nav-forward' class='btn bg-color-primary-dark text-color-white' onclick='WikiGetter.getNextResultPage()'>\></button>";
            html += "</div>";
            html += "<div class='result-page-text'>Page "+resultPageOn+" of "+resultPageMax+"</div>";
        html += "</div>";
        return html;
    };
    
    this.processSearchResult = function (jsonWikiResult){
        console.log("handling search result");
        console.log(JSON.stringify(jsonWikiResult));
        var isRandom = jsonWikiResult.query.hasOwnProperty("pages");
        var result = jsonWikiResult;
        var hits = isRandom ? 0 : result.query.searchinfo.totalhits;
        var pages = isRandom ? Object.getOwnPropertyNames(result.query.pages) : result.query.search;
        var html = "";
        var colSpan = 10;
        var colOffset = 1;
        if (!isRandom){ 
            html += ResultHandler.getNavInfoHTML(hits);
        }
        else{
            $("#status-text").html("Check those out!");
        }
        pages.forEach(function(entry){
            if (isRandom){
                entry = result.query.pages[entry];
            }
            html += "<div class='row' style='padding: 2px'>";
                html += "<div class='col-md-"+colSpan+" col-md-offset-"+colOffset+" searchresult bg-color-primary-light'>";
                    html += "<a target='_blank' href='https://" + WikiGetter.language + ".wikipedia.org/wiki/"+entry.title+"'>";
                        html += "<h3 style='display: inline-block'>" + entry.title + "</h3><span class='glyphicon glyphicon glyphicon-new-window' style='margin-left: 10px'></span>";
                    html += "</a>";
        if (!isRandom){
                    html += "<div>" + entry.snippet + "</div>";
        }
                html += "</div>";
            html += "</div>";
        });
        EventManager.post(EventManager.eType.RESULT_HTML_READY, ResultHandler, html);
    };
};