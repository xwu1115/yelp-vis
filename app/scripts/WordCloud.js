    function showWordCloud(){
        var frequency_list = [{"text": "last", "size": 3}, {"text": "delicious", "size": 3}, {"text": "huge", "size": 3}, {"text": "sure", "size": 3}, {"text": "medical", "size": 3}, {"text": "other", "size": 4}, {"text": "many", "size": 5}, {"text": "nice", "size": 5}, {"text": "good", "size": 7}, {"text": "great", "size": 7}];
        
        d3.layout.cloud().size([500, 300])
            .words(frequency_list)
            .rotate(0)
            .fontSize(function(d) { return d.size*2.5; })
            .on("end", draw)
            .start();
    }

    function draw(words) {
        var color = d3.scale.linear()
            .domain([0,1,2,3,4,5,6,10,15,20,100])
            .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

        $(".detail_vis1").empty();
        d3.select(".detail_vis1").append("svg")
                .attr("width", 550)
                .attr("height", 350)
                .attr("class", "wordcloud")
                .append("g")
                // without the transform, words words would get cutoff to the left and top, they would
                // appear outside of the SVG area
                .attr("transform", "translate(200,100)")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size*2.5 + "px"; })
                .style("fill", function(d, i) { return color(i); })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
    }