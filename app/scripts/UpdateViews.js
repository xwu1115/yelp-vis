function updateMap(data){
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 36.1215, lng: -115.1739},
                zoom: 12
            });

        for (var i = 0; i < data.length; i++) {
                var d = data[i];
                var lat = d.latitude;
                var lng = d.longitude;

                var circle = new google.maps.Circle({
                    strokeColor: '#B9D154',
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                    fillColor: "#EF6A50",
                    fillOpacity: 0.7,
                    map: map,
                    center: new google.maps.LatLng(lat,lng),
                    radius: d.review_count
                });
                circle['index'] = i;
                circle.addListener('click', function (event) {
                    updateDetaiView(data[this.index]);
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

    function selectCategory(id){
        if(id == "All"){
            graph.initGraph(allData);
            updateMap(allData);
            return;
        }
        var find = false;
        var d = allData.filter(function (el){
            //console.log("el " + el);
            var category = el.categories;
            for (i in category) {
                if (category[i].indexOf(id)!=-1) {
                    return true;
                };
            };
            return false;
        })
        console.log(d);
        graph.initGraph(d);
        updateMap(d);
    }
    function selectPrice(id){
        if(id == "All"){
            graph.initGraph(allData);
            updateMap(allData);
            return;
        }
        var find = false;
        var d = allData.filter(function (el){
            console.log(el.attributes["Price Range"]);
            return el.attributes["Price Range"] == id;
        })
        graph.initGraph(d);
        updateMap(d);
    }
