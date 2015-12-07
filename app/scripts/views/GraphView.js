/*global YelpInfoVis, Backbone, JST*/

YelpInfoVis.Views = YelpInfoVis.Views || {};

(function () {
    'use strict';

    YelpInfoVis.Views.GraphView = Backbone.View.extend({

        template: JST['app/scripts/templates/GraphView.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        resturant: {},

        initialize: function () {
            //this.listenTo(this.model, 'change', this.render);
            downloadTmp(this.initGraph);
        },

        render: function () {
            //this.$el.html(this.template(this.model.toJSON()));
            //return this;
        },

        initGraph: function (data) {
            $("#graph").empty();
            
            var margin = {top: 20, right: 50, bottom: 50, left: 60},
                width = 800 - margin.left - margin.right,
                height = 300 - margin.top - margin.bottom;

            // setup x 
            var xValue = function(d) { return d.review_count;}, 
                xScale = d3.scale.linear().range([0, width]), 
                xMap = function(d) { return xScale(xValue(d));}, 
                xAxis = d3.svg.axis().scale(xScale).orient("bottom");

            // setup y
            var yValue = function(d) { return d.stars;}, 
                yScale = d3.scale.linear().range([height, 0]), 
                yMap = function(d) { return yScale(yValue(d));}, 
                yAxis = d3.svg.axis().scale(yScale).orient("left");

            // setup fill color
            var cValue = function(d) { return d.review_count;},
                color = d3.scale.category10();

            // add the graph canvas to the body of the webpage
            svg = d3.select("#graph").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // add the tooltip area to the webpage
            var tooltip = d3.select("#graph").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            var view = this;
            
              // don't want dots overlapping axis, so add in buffer to data domain
              xScale.domain([d3.min(data, xValue)-5, d3.max(data, xValue)+5]);
              yScale.domain([1,5]);
              //yScale.domain([0, 5]);
              // x-axis
              svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis)
                  .append("text")
                  .attr("class", "label")
                  .attr("x", width - 5)
                  .attr("y", 40)//move label down
                  .style("text-anchor", "end")
                  .text("Rating Number");

              // y-axis
              svg.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)
                  .append("text")
                  .attr("class", "label")
                  .attr("transform", "rotate(-90)")
                  .attr("x", -10)
                  .attr("y", -40)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text("Rating Score");

              // draw dots
              svg.selectAll(".dot")
                  .data(data)
                  .enter().append("circle")
                  .attr("class", "dot")
                  .attr("r", 4)
                  .attr("cx", xMap)
                  .attr("cy", yMap)
                  .attr("stroke-width", 2)
                  .attr("stroke", "black")
                  .attr("stroke-opacity", 0)
                  .style("opacity", "0.7")
                  .style("strokeColor", '#B9D154')
                  .style("fill", function(d) { return d3.rgb("#EF6A50");}) 
                  .on("mouseover", function(d) {
                    updateGraphView(d);
                    updateDetaiView(d);
                    updateCircle(d, true);
                    
                  })
                  .on("mouseout", function(d) {
                      updateCircle(d, false);
                  });
            }
        });
})();
