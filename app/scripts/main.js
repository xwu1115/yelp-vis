/*global YelpInfoVis, $*/


window.YelpInfoVis = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
    }
};

var globalData = [];
var allData = [];
var textData = [];
var timeData = [];
var map;
var controlPanelView;
var graph;
var svg;
var circles = [];
var colors = ["#780700","#FF0F00","#D94200","#F08400","#f8be21","#FDE300","#FFE546","#FFE59C","#FFE5C6"];
var selectedPrice = "All";
var selectedCategory = "All";

$(document).ready(function () {
    'use strict';
    YelpInfoVis.init();
    this.appRouter = new YelpInfoVis.Routers.AppRouter;
    Backbone.history.start({ pushState: true });
});

function initMapView(){
	'use strict';
     var mapView = new YelpInfoVis.Views.MapView({el:'.mainGraph'});
        
}
