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
var textData = [];
var timeData = [];
var map;

$(document).ready(function () {
    'use strict';
    YelpInfoVis.init();
    console.log('start!');
    this.appRouter = new YelpInfoVis.Routers.AppRouter;
    Backbone.history.start({ pushState: true });
});

function initMapView(){
	'use strict';
     var mapView = new YelpInfoVis.Views.MapView({el:'.mainGraph'});
        
}
