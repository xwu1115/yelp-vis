/*global YelpInfoVis, Backbone, JST*/

YelpInfoVis.Views = YelpInfoVis.Views || {};

(function () {
    'use strict';

    YelpInfoVis.Views.MapView = Backbone.View.extend({

        template: JST['app/scripts/templates/MapView.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.initMap();
            this.showDetail();
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.append(this.template(this.model.toJSON()));
        },

        initMap: function () {
            var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
                zoom: 15
            });

            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                var initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                    map.setCenter(initialLocation);
                }, function() {});
            }
        },

        showDetail: function() {
            var detail = new YelpInfoVis.Models.ResturantDetail({});
            var detailView = new YelpInfoVis.Views.ResturantDetailView({model:detail, el:'.detail'});
            detailView.render();
        }
    });

})();
