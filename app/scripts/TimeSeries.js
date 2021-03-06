function drawTimeView (data) {
    console.log(new Date(data[0].time));
    var margin = {top: 20, right: 30, bottom: 20, left: 30},
                width = 400 - margin.left - margin.right,
                height = 250 - margin.top - margin.bottom;


            var xScale = d3.time.scale()
                .domain([new Date(data[0].time), d3.time.day.offset(new Date(data[data.length - 1].time), 1)])
                .rangeRound([0, width - margin.left - margin.right]);

            // setup x 
            var xValue = function(d) { 
                return[new Date(d.time)];
            }, 
                xAxis = d3.svg.axis().scale(xScale)
                        .orient("bottom")
                        .ticks(d3.time.months, 12)
                        .tickFormat(d3.time.format('%y'))

                        .tickPadding(6);

            // setup y
            var yValue = function(d) { return d.score;}, 
                yScale = d3.scale.linear().range([height, 0]), 
                yMap = function(d) { return yScale(yValue(d));}, 
                yAxis = d3.svg.axis().scale(yScale).orient("left");

            // setup fill color
            var cValue = function(d) { return d.score;},
                color = d3.scale.category20c();

            // add the graph canvas to the body of the webpage
            var svg = d3.select(".vis2_content").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // add the tooltip area to the webpage
            var tooltip = d3.select(".vis2_content").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

              yScale.domain([0,5]);
              //yScale.domain([0, 5]);
              // x-axis
              svg.append("g")
                  .attr("class", "x axis_t")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis)
                  .append("text")
                  .attr("class", "label")
                  .attr("x", width - 40)
                  .attr("y", 20)
                  .style("text-anchor", "end")
                  .text("Time");

              // y-axis
              svg.append("g")
                  .attr("class", "y axis_t")
                  .call(yAxis)
                  .append("text")
                  .attr("class", "label")

                  .attr("y", -20)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text("Rating Score");

              // draw dots
              // var dots = svg.selectAll(".dot")
              //     .data(data)
              //     .enter().append("circle")
              //     .attr("class", "dot")
              //     .attr("r", function(d){return d.num/10;})
              //     .attr("cx", function(d){return xScale(new Date(data[40].time));})
              //     .attr("cy", yMap)
              var dots = svg.selectAll(".bar")
                  .data(data)
                  .enter().append("rect")
                  .attr("class", ".bar")
                  .attr("width", function(d){return 3;})
                  .attr("height", function(d){return d.num/3;})
                  .attr("x", function(d){return xScale(new Date(data[40].time));})
                  .attr("y", yMap)
                  //.attr("transform",)
                  .style("fill-opacity", 0.8)
                  //.style("stroke", "white")
                  .style("stroke-opacity", "0")
                  .style("stroke", function(d){ return "#ef6a50";})
                  .style("stroke-width", "1")
                  //.style("fill", function(d) { return color(d.time);})
                  .style("fill", function(d) { return "#ef6a50";})
                  .on("mouseover", function(d) {
                        //d3.select(this).style("stroke-opacity", "1");
                        d3.select(this).style("stroke", "black");
                        d3.select(this).style("stroke-width", "3");
                        tooltip.transition()
                           .duration(200)
                           .style("opacity", 1);
                        tooltip.html("Time: "+ d.time + "<br/>" + "Number:" + d.num)
                           .style("left", (d3.event.layerX) + "px")
                           .style("top", (d3.event.layerY) + "px");
                           //.style("left", "0px")
                           //.style("right", "0px");
                  })
                  .on("mouseout", function(d) {
                        d3.select(this).style("stroke", "red");
                         d3.select(this).style("stroke-width", "1");
                        tooltip.transition()
                           .duration(500)
                           .style("opacity", 0);
                  });

                dots.transition()
                  .duration(1200)
                  //.style("fill-opacity", 0)
                  .style("stroke-opacity", "0.3")
                  .attr("x", function(d){return xScale(new Date(d.time));});
                  
}
