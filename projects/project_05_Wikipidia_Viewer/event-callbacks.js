
var searchStartedCallback = function (eType, sender, args){
    $("#status-text").html("Searching...");
}
var searchCompleteCallback = function (eType, sender, args) {
    "use strict";
    //sender should be WikiGetter args should be WikiGetter.jsonResult
    console.log("search completed successfully!");
    //$("#results").html(JSON.stringify(args));
    $("#results").html("");
    $("#link-warning").html("");
    $("#external-link").html("");
    $("#results").html("");
    ResultHandler.processResults(args);
};
var searchPageChangedCallback = function (eType, sender, args){
    $(args).text("loading...");
};
var searchFailedCallback = function (eType, sender, args){
    "use strict";
    $("#status-text").html("Found 0 articles :(");
    $("#results").html(args);
};
var randomArticleReadyCallback = function(eType, sender, args){
    "use strict";
    console.log("random article ready!");
};
var errorNoSearchTermsCallback = function(eType, sender, args){
    "use strict";
    $("#status-text").html("Nothing to search...");
};

var resultHandlerHtmlReady = function(eType, sender, args){
    //sender should be ResultHandler, args should be the HTML to add to the page
    //this callback should only be registered to RESULT_HTML_READY events
    //get element with id 'results' in index.html and add the args to it
    console.log("adding html to results element");
    $("#results").append(args)
};

EventManager.registerCallback(EventManager.eType.SEARCH_STARTED, searchStartedCallback);
EventManager.registerCallback(EventManager.eType.SEARCH_COMPLETED, searchCompleteCallback);
EventManager.registerCallback(EventManager.eType.SEARCH_FAILED, searchFailedCallback);
EventManager.registerCallback(EventManager.eType.SEARCH_PAGE_CHANGED, searchPageChangedCallback);
EventManager.registerCallback(EventManager.eType.RANDOM_ARTICLE_READY, randomArticleReadyCallback);
EventManager.registerCallback(EventManager.eType.ERROR_NO_TERMS, errorNoSearchTermsCallback);
EventManager.registerCallback(EventManager.eType.RESULT_HTML_READY, resultHandlerHtmlReady);