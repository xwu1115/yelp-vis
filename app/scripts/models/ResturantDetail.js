/*global YelpInfoVis, Backbone*/

YelpInfoVis.Models = YelpInfoVis.Models || {};

(function () {
    'use strict';

    YelpInfoVis.Models.ResturantDetail = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
            name:"SweetHut",
            reviewScore:3,
            reviewNumber:1,
            type:"Coffee, Tea",
            location:"935 Peachtree st NE, Atlanta, GA, 30309",
            reviews:[]
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
