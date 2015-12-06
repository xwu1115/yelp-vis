    function showWordCloud(id){
        //var frequency_list = [{"text": "last", "size": 3}, {"text": "delicious", "size": 3}, {"text": "huge", "size": 3}, {"text": "sure", "size": 3}, {"text": "medical", "size": 3}, {"text": "other", "size": 4}, {"text": "many", "size": 5}, {"text": "nice", "size": 5}, {"text": "good", "size": 7}, {"text": "great", "size": 7}];
        var frequency_list = textData[id];

        d3.layout.cloud().size([400, 300])
            .words(frequency_list)
            .rotate(0)
            .fontSize(function(d) { return d.size*100; })
            .on("end", draw)
            .start();
    }

    function draw(words) {
        var color = d3.scale.linear()
             .domain([2,3,4,5,6,10,15,20,100,200])
             .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444"]);

        $(".detail_vis1").empty();
        var cloud = d3.select(".detail_vis1").append("svg")
                .attr("width", 400)
                .attr("height", 300)
                .attr("class", "wordcloud")
                .append("g")
                // without the transform, words words would get cutoff to the left and top, they would
                // appear outside of the SVG area
                .attr("transform", "translate(180,130)")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size*2 + "px"; })
                .style("fill", function(d, i) { return color(i); })
                .style("fill-opacity", 0)
                .text(function(d) { return d.text; });
        cloud.transition()
             .duration(300)
             .attr("transform", function(d) {
                    return "translate(" + [d.x*1.4, d.y*1.4] + ")rotate(" + d.rotate + ")";
                })
             .style("fill-opacity", 1);
    }