/*global YelpInfoVis, Backbone, JST*/

YelpInfoVis.Views = YelpInfoVis.Views || {};

(function () {
    'use strict';

    YelpInfoVis.Views.ControlPanel = Backbone.View.extend({

        template: JST['app/scripts/templates/ControlPanel.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
                // "click.btn-cat": "selectCategory",
                //  "click .btn-pri": "selectPrice"
                },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            console.log('panel render!');
            this.$el.html(this.template(this.model.toJSON()));
        },

        selectPrice: function(price) {

        },

        selectCategory: function() {
            event.preventDefault();
            alert($(event.currentTarget).text());
        }
    });

})();
