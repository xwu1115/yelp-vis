/*global YelpInfoVis, Backbone, JST*/

YelpInfoVis.Views = YelpInfoVis.Views || {};

(function () {
    'use strict';

    YelpInfoVis.Views.ResturantDetailView = Backbone.View.extend({

        template: JST['app/scripts/templates/ResturantDetailView.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }

    });

})();
