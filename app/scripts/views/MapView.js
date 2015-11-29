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

        positions:[],

        initialize: function () {
            this.initMap();
            this.showDetail();
            //this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            //this.$el.append(this.template(this.model.toJSON()));
        },

        initMap: function () {
            map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 33.7758, lng: -84.3947},
                zoom: 15
            });

            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                var initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                    map.setCenter(initialLocation);
                }, function() {});
            }

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(33.778463, -84.398881),
                map: map
            });
        },

        showDetail: function() {
            // var detail = new YelpInfoVis.Models.ResturantDetail({});
            // var detailView = new YelpInfoVis.Views.ResturantDetailView({model:detail, el:'.detail'});
            // detailView.render();
        }
    });

})();
