function updateMap(data){
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 36.1215, lng: -115.1739},
                zoom: 14
            });
        circles = [];
        for (var i = 0; i < data.length; i++) {
                var d = data[i];
                var lat = d.latitude;
                var lng = d.longitude;

                var circle = new google.maps.Circle({
                    strokeColor: '#494544',
                    strokeOpacity: 1,
                    strokeWidth: 2,
                    fillColor: colors[10-d.stars*2],
                    fillOpacity: 1,
                    map: map,
                    center: new google.maps.LatLng(lat,lng),
                    radius: Math.sqrt(d.review_count)*10
                });
                circle['index'] = i;
                circle.addListener('click', function (event) {
                    updateDetaiView(data[this.index]);
                    updateGraphView(data[this.index]);
                });
                circles.push(circle);
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
        selectedCategory = id;
        // if(selectedCategory == "All"){
        //     graph.initGraph(allData);
        //     updateMap(allData);
        //     return;
        // }
        var d = allData.filter(function (el){
            //console.log("el " + el);
            var category = el.categories;
            return (selectedPrice == "All" || el.attributes["Price Range"] == selectedPrice) && (selectedCategory == "All" || isInCategory(id, el.categories));

        })
        globalData = d;
        graph.initGraph(d);
        updateMap(d);
    }

    function selectPrice(id){
        selectedPrice = id;
        console.log(selectedPrice);
        // if(selectedPrice == "All"){
        //     graph.initGraph(allData);
        //     updateMap(allData);
        //     return;
        // }
        var d = allData.filter(function (el){
            console.log(el.attributes["Price Range"]);
            return (selectedPrice == "All" || el.attributes["Price Range"] == id) && (selectedCategory == "All" || (isInCategory(selectedCategory, el.categories)));
        })
        globalData = d;
        graph.initGraph(d);
        updateMap(d);
    }

    function isInCategory(id, category){
        for (i in category) {
                if (category[i].indexOf(id)!=-1) {
                    return true;
                };
        };
        return false;
    }

    function updateGraphView(data){
        svg.selectAll(".dot")
                  .data(globalData)
                  .attr("stroke-opacity", function(d){
                    if(d.business_id == data.business_id)return 1;
                    else return 0;
                  })
                  .attr("r", function(d){
                    if(d.business_id == data.business_id)return 10;
                    else return 4;
                  });
    }

    function updateCircle(d, b){
        if(circles.length>0){
            var i = 0;       
            for(; i < globalData.length; i++){
                var tmp = globalData[i];
                if(tmp.business_id == d.business_id){
                    break;
                }
            }
        var centerPoint = {lat: d.latitude, lng: d.longitude};
        //map.setCenter(centerPoint);
        map.setZoom(12);
        var circle = circles[i];
        //console.log(circle.strokeWidth);
        // if(b==true)circle.setRadius(Math.sqrt(d.review_count)*30);
        // else circle.setRadius(Math.sqrt(d.review_count)*10);
        if(b == true)circle.setOptions({strokeWeight: 8, strokeColor: "#000"});
        else circle.setOptions({strokeWeight: 2, strokeColor: "#494544"});


    }
}
