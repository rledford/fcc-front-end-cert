
var EventManager = new function () {
    "use strict";
    this.delegates = {};
    this.eType = {
        SEARCH_STARTED: "search-started",
        SEARCH_COMPLETED: "search-completed",
        SEARCH_FAILED: "search-failed",
        SEARCH_PAGE_CHANGED: "search-page-changed",
        RANDOM_HTML_READY: "random-html-ready",
        ERROR_NO_TERMS: "error-no-search-terms",
        RESULT_HTML_READY: "result-html-ready"
    };
    this.registerCallback = function (eType, callback) {
        if (!this.delegates.hasOwnProperty(eType)) {
            this.delegates[eType] = [];
        }
        this.delegates[eType].push(callback);
    };
    this.unregisterCallback = function (eType, callback) {
        if (!this.delegates.hasOwnProperty(eType)) {
            return;
        }
        for (var i = this.delegates[eType].length; i >= 0; i--){
           if (this.delegates[eType][i] === callback){
               this.delegates[eType].splice(i, 1);
           }
        }
    };
    this.post = function(eType, sender, args){
        if (!this.delegates.hasOwnProperty(eType)) return;
        this.delegates[eType].forEach(function(callback){
            callback(eType, sender, args);
        });
    };
};