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

    		var controlPanelView = new YelpInfoVis.Views.ControlPanel({model:control, el:'.sideBar'});
            controlPanelView.render();
            
            var graph = new YelpInfoVis.Views.GraphView({el:'.mainGraph'});
            graph.render();
    	},

    	loadView: function (view) {
            this.view && this.view.remove();
            this.view = view;
            console.log(this.view);
            $(".content").html(this.view);
        }
    });

})();
