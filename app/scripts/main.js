/*global YelpInfoVis, $*/


window.YelpInfoVis = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Hello from Backbone!');
    }
};

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
