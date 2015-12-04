function updateMap(){
        for (var i = 0; i < globalData.length; i++) {
                var d = globalData[i];
                var lat = d.latitude;
                var lng = d.longitude;

                var circle = new google.maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: d.stars/5*0.8,
                    map: map,
                    center: new google.maps.LatLng(lat,lng),
                    radius: d.review_count/2
                });
                circle['index'] = i;
                circle.addListener('click', function (event) {
                    updateDetaiView(globalData[this.index]);
                });
        }
    }

    function updateDetaiView(d){
        var category = "";
        for (var i = 0; i < d.categories.length; i++) {
            category += d.categories[i];
            category += "\r\n";
        };
        var location = d.full_address;

        var resturant = new YelpInfoVis.Models.ResturantDetail({
            name: d.name, 
            reviewScore: d.stars,
            reviewNumber: d.review_count,
            type: category, 
            location: location, 
            reviews: []
        });
        $(".shop").empty();
        var view = new YelpInfoVis.Views.ResturantDetailView({el: ".shop", model: resturant});
        view.render();
        showWordCloud(d.business_id);
        if(timeData.length == 0){
            downloadTimeData();
        }
    }

    function initDetailView(data){
              var d = data[0];
              console.log(d);
              updateDetaiView(d);
    }


