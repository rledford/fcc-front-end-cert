
/*
QUERY

SEARCH
/w/api.php?action=query&format=json&prop=links&list=search&titles=&srsearch=audio

SEARCH WITH OFFSET
/w/api.php?action=query&format=json&prop=links&list=search&titles=&srsearch=audio&sroffset=10

SEARCH WITH LIMIT RESULTS
/w/api.php?action=query&format=json&prop=links&list=search&titles=&srsearch=audio&srlimit=20
*/

//singleton WikiGetter
var WikiGetter = new function () {
    "use strict";
    
    this.language = "en";
    this.jsonResult = null;//contains stats and links
    this.lastQueryTerms = "";
    this.currentSearchLimit = 10;
    this.currentSearchOffset = 0;
    this.currentPage = 0;
    this.maxPage = 0;
    this.minResultLimit = 10;
    this.maxResultLimit = 500;
    this.busy = false;
    
    //set language from string (avoiding jQuery calls inside this file)
    this.setLanguage = function (lang) {
        //formate should be 'xx-Xx'
        this.language = lang.split('-')[0];
    };
    
    this.debugJsonResult = function () {
        for (var k in this.jsonResult){
            console.log(k);
        }
    };
    
    this.getVerifiedLimit = function(limit){
        var verified = parseInt(limit, 10);
        if (!verified || verified < this.minResultLimit || verified > this.maxResultLimit) {
            verified = this.minResultLimit;
            EventManager.post(EventManager.eType.ERROR_RESULT_LIMIT, this, limit);
        }
        return verified;
    };
    
    this.buildQueryURL = function (terms, limit, offset) {
        //https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json
        WikiGetter.lastQueryTerms = terms;
        var ret = "";
        //base
        ret += "https://" + WikiGetter.language;
        ret += ".wikipedia.org/w/api.php?";
        //action
        ret += "action=query";
        //search parameters
        ret += "&list=search";
        ret += "&titles=";
        ret += "&srsearch=" + terms.replace(/\s/g, '+');
        ret += "&srlimit=" + limit;
        ret += "&format=json";
        ret += "&sroffset=" + offset;
        ret += "&callback=?";
        console.log(ret);
        return ret;
    };
    
    this.buildQueryURLRandom = function (limit) {
        var ret = "";
        ret += "https://"+ WikiGetter.language;
        ret += ".wikipedia.org/"
        ret += "/w/api.php?action=query&format=json&prop=info&list=&generator=random&inprop=url&grnlimit="+limit;
        ret += "&callback=?";
        return ret;
    };
    
    this.getNextResultPage = function () {
        if (WikiGetter.busy) return;
        var json = WikiGetter.jsonResult;
        if (json && json.hasOwnProperty("query") && json.hasOwnProperty("continue")){
            var str = json.continue.continue;
            var allow = (str.substring(str.lastIndexOf('|')) != '-');
            var limit = WikiGetter.currentSearchLimit;
            var offset = WikiGetter.currentSearchOffset + WikiGetter.currentSearchLimit;
            var url = "";
            if (allow){
                WikiGetter.currentSearchOffset = offset;
                url = WikiGetter.buildQueryURL(WikiGetter.lastQueryTerms, limit, offset);
                WikiGetter.getWebResult(url);
                EventManager.post(EventManager.eType.SEARCH_PAGE_CHANGED, WikiGetter, "#btn-nav-forward");
            }
        }
        else{
            console.log("no next page");
            return;
        }
    };
    
    this.getPreviousResultPage = function () {
        if (WikiGetter.busy) return;
        console.log("get previous result page");
        if (WikiGetter.currentSearchOffset <= 1){
            console.log("can't go back");
            return;
        }
        var json = WikiGetter.jsonResult;
        if (json && json.hasOwnProperty("query") && WikiGetter.currentSearchOffset != 0){
            var url = "";
            WikiGetter.currentSearchOffset -= WikiGetter.currentSearchLimit;
            url = WikiGetter.buildQueryURL(WikiGetter.lastQueryTerms, WikiGetter.currentSearchLimit, WikiGetter.currentSearchOffset);
            WikiGetter.getWebResult(url);
            EventManager.post(EventManager.eType.SEARCH_PAGE_CHANGED, WikiGetter, "#btn-nav-back");
        }
        else{
            console.log("no previous page");
        }
    };
    
    this.beginSearch = function (terms, limit) {
        //offset will always be 0 for beginSearch since it is only called on new search
        if (terms === "") {
            EventManager.post(EventManager.eType.ERROR_NO_TERMS, this, null);
            return;
        }
        var url = "";
        WikiGetter.currentSearchOffset = 0;
        EventManager.post(EventManager.eType.SEARCH_STARTED, this, terms.toLowerCase());
        var vLimit = WikiGetter.getVerifiedLimit(limit);
        WikiGetter.currentSearchLimit = vLimit;
        if (terms === "*RANDOM-SEARCH-REQUEST*"){
            url = WikiGetter.buildQueryURLRandom(vLimit);
        }
        else{
            url = this.buildQueryURL(terms.toLowerCase(), vLimit, 0);
        }
        this.getWebResult(url);
    };
    
    this.getWebResult = function (url) {
        if (WikiGetter.busy) return;
        WikiGetter.busy = true;
        var callback  =function(data){
            if (data.hasOwnProperty("query")){
                WikiGetter.jsonResult = data;
                EventManager.post(EventManager.eType.SEARCH_COMPLETED, WikiGetter, WikiGetter.jsonResult);
            }
            else{
                EventManager.post(EventManager.eType.SEARCH_FAILED, WikiGetter, "Sorry, something went wrong while communicating with the server. Try again.");
            }
            WikiGetter.busy = false;
        }
        $.getJSON(url, callback);
    };
    
    this.loadLocalResult = function (filename) {
        if (this.busy) return;
        busy = true;
        var req = new XMLHttpRequest();
        req.open("GET", filename, true);
        req.onreadystatechange = function() {
            if (req.readyState === 4){
                if (req.status === 200 || req.status === 0) {
                    try{
                        WikiGetter.jsonResult = JSON.parse(req.responseText);
                        EventManager.post(EventManager.eType.SEARCH_COMPLETED, WikiGetter, WikiGetter.jsonResult);
                        return;
                    }
                    catch(error){
                        //will get a SyntaxError exception if the data could not be parsed
                        //file contains invalid data
                        console.log("error reading file: "+error);
                        EventManager.post(EventManager.eType.ERROR_READING_JSON, WikiGetter, req);
                        WikiGetter.jsonResult = null;
                    }
                }
                else{
                    EventManager.post(EventManager.eType.SEARCH_FAILED, WikiGetter, req);
                }
            }
            WikiGetter.busy = false;
        };
        req.send(null);
    };
};