        function download(callback){
            var auth = {
                //
                // Update with your auth tokens.
                //
                consumerKey : "zaqwLIU-N2HQgUw64pFtAQ",
                consumerSecret : "tSZh8ZXl8b_pTPJAJr61slf75I8",
                accessToken : "x_t_FEJs3tRA0v-HJLTsesMlW1aVH_Lv",
                // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
                // You wouldn't actually want to expose your access token secret like this in a real application.
                accessTokenSecret : "huOeU72gHftobQXWvKU-5GPjMpc",
                serviceProvider : {
                    signatureMethod : "HMAC-SHA1"
                }
            };

            var terms = 'restaurants';
            var near = 'Atlanta GA';
            var cll = '33.778463, -84.398881';
            var offset = '20';

            var accessor = {
                consumerSecret : auth.consumerSecret,
                tokenSecret : auth.accessTokenSecret
            };

            parameters = [];
            parameters.push(['term', terms]);
            parameters.push(['location', near]);
            parameters.push(['cll', cll]);
            parameters.push(['offset', offset]);
            parameters.push(['callback', 'cb']);
            parameters.push(['oauth_consumer_key', auth.consumerKey]);
            parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
            parameters.push(['oauth_token', auth.accessToken]);
            parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

            var message = {
                'action' : 'http://api.yelp.com/v2/search/',
                'method' : 'GET',
                'parameters' : parameters
            };

            OAuth.setTimestampAndNonce(message);
            OAuth.SignatureMethod.sign(message, accessor);

            var parameterMap = OAuth.getParameterMap(message.parameters);

            $.ajax({
                'url' : message.action,
                'data' : parameterMap,
                'dataType' : 'jsonp',
                'jsonpCallback' : 'cb',
                'success' : function(data, textStats, XMLHttpRequest) {
                    //console.log(data);
                    console.log(textStats);
                    callback(data);
                }
            });
    }

    function downloadTmp(callback){
        $.ajax({
                'url' : "../files/data.json",
                'dataType' : 'json',
                'jsonpCallback' : 'cb',
                'success' : function(data, textStats, XMLHttpRequest) {
                    //console.log(data);
                    globalData = data;
                    updateMap();
                    callback(data);
                    downloadText();
                },
                'error': function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log(textStatus);
                }
        });
    }

    function downloadText(){
        $.ajax({
                'url' : "../files/reviewText.json",
                'dataType' : 'json',
                'jsonpCallback' : 'cb',
                'success' : function(data, textStats, XMLHttpRequest) {
                    textData = data;
                    initDetailView(globalData);
                },
                'error': function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log(textStatus);
                }
        });
    }

    function downloadTimeData(){
        $.ajax({
                'url' : "../files/newReviewData.json",
                'dataType' : 'json',
                'jsonpCallback' : 'cb',
                'success' : function(data, textStats, XMLHttpRequest) {
                    timeData = data;
                    drawTimeView(data);
                },
                'error': function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log(textStatus);
                }
        });
    }
            