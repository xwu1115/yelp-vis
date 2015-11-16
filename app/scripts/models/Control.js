/*global YelpInfoVis, Backbone*/

YelpInfoVis.Models = YelpInfoVis.Models || {};

(function () {
    'use strict';

    YelpInfoVis.Models.Control = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
