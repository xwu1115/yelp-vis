/*global YelpInfoVis, Backbone*/

YelpInfoVis.Routers = YelpInfoVis.Routers || {};

(function () {
    'use strict';

    YelpInfoVis.Routers.AppRouter = Backbone.Router.extend({
    	routes: {
            "":"mainPage"
    	},

    	mainPage: function(){
    		var control = new YelpInfoVis.Models.Control({});
    		var controlPanelView = new YelpInfoVis.Views.ControlPanel({model:control});
    		$(".sideBar").html(controlPanelView.render().el);

            var graph = new YelpInfoVis.Views.GraphView({el:'.mainGraph'});
            graph.render();

            var resturant = new YelpInfoVis.Models.ResturantDetail({});
    	},

    	loadView: function (view) {
            this.view && this.view.remove();
            this.view = view;
            console.log(this.view);
            $(".content").html(this.view);
        }
    });

})();
