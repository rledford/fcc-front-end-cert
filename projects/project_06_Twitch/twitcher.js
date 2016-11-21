//namespace
var twitcher = {
    featured: {
        streams: null,
        lastUpdated: -1
    },
    
    streamers:  ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"],
    
    fcc:{
        streams: null,
        lastUpdated: -1
    },

    getStreamerStatus: function (){
        this.streamers.forEach(function(id){
            $.getJSON("https://api.twitch.tv/kraken/streams/"+id+"?callback=?", function(data){
               console.log(JSON.stringify(data)); 
            });
        });
    },
    
    getFeaturedStreams: function(callback){
        $.getJSON("https://api.twitch.tv/kraken/streams/featured?callback=?", function(data){
            if (data){
                twitcher.featured.streams = data.featured;
                callback(true);
            }
            else{
                callback(false);
            }
        });
    },
    
    getLocalFeaturedStreams: function(callback){
        console.log("getting local data");
        $.getJSON("featured.json", function(data){
           if (data){
                twitcher.featured.streams = data.featured;
                callback(true);
            }
            else{
                callback(false);
            } 
        });
    },
    
    getFccStreams: function(callback){
        console.log("getting fcc data");
        var count = twitcher.streamers.length;
        var fetched = 0;
        twitcher.fcc.streams = [];
        twitcher.streamers.forEach(function(streamer){
            $.getJSON("https://api.twitch.tv/kraken/streams/"+streamer+"?callback=?", function(data){
                fetched++;
                if (data){
                    twitcher.fcc.streams.push(data);
                }
                else{
                    callback(false);
                }
                if(fetched === count){
                    callback(true);
                }
            });
        });
    },
    
    extractFirstParagraph: function(str){
        return str.slice(str.indexOf("<p>"),str.indexOf("</p>"))+"</p>";
    },
    
    truncateName: function(str){
        //14 max, start periods at 11
        if (str.length >= 14){
            return str.slice(0,10)+"...";
        }
        else{
            return str;
        }
    },
    
    createFccStreamInfo: function(stream){
        var html="";
        html="<div style='margin: 5px'></div>";
        if (stream.stream !== null){
            html+="<div class='row font-main'>";
                html+="<div class='col-xs-10 col-xs-offset-1 stream-col'>";
                    html+="<div class='row'>";
                        html+="<div class='col-xs-4 stream-col-image'>"
                            html+="<div class='row stream-display-name'>"+this.truncateName(stream.stream.channel.display_name)+"</div>"
                            html+="<img class='img-rect-thumbnail img-thumbnail' alt='preview' src='"+stream.stream.channel.logo+"'></div>";
                        html+="<div class='col-xs-8 stream-col-description'>";
                            html+="<div class='row'>Viewers: "+stream.stream.viewers+"</div>";
                            html+="<div class='row row-centered'><a href='"+stream.stream.channel.url+"' target='_blank'><img class='img-rect-thumbnail img-thubmnail' style='padding-top: 15px' alt='preview' src='"+stream.stream.preview.large+"'></a></div>"
                        html+="</div>";
                    html+="</div>";
                html+="</div>";
            html+="</div>";
        }
        else{
            var str = stream._links.self;
            html+="<div class='row row-centered font-main'>";
            html+="<div class='col-xs-6 col-xs-offset-3 stream-col stream-col-white-text'>"+str.slice(str.lastIndexOf('/')+1)+"</div>";
            html+="</div>";
        }
        return html;
    },
    
    createFeaturedStreamInfo: function(stream){
        var html="";
        html="<div style='margin: 5px'></div>";
        html+="<div class='row font-main'>";
            html+="<div class='col-xs-10 col-xs-offset-1 stream-col'>";
                html+="<div class='row'>";
                    html+="<div class='col-xs-4 stream-col-image'>"
                        html+="<div class='row stream-display-name'>"+this.truncateName(stream.stream.channel.display_name)+"</div>"
                        html+="<img class='img-rect-thumbnail img-thumbnail' alt='preview' src='"+stream.image+"'></div>";
                    html+="<div class='col-xs-8 stream-col-description'>";
                        html+="<div class='row'>"+stream.title+"</div>";
                        html+="<div class='row'>Viewers: "+stream.stream.viewers+"</div>";
                        html+="<div class='row'>"+this.extractFirstParagraph(stream.text)+"</div>";
                    html+="</div>";
                html+="</div>";
                html+="<div class='row row-centered'><a href='"+stream.stream.channel.url+"' target='_blank'><img class='img-rect-thumbnail img-thubmnail' style='padding-top: 15px' alt='preview' src='"+stream.stream.preview.medium+"'></a></div>"
            html+="</div>";
        html+="</div>";
        return html;
    }
};