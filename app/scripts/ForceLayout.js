function forceLayout(width, height){
        var nodes = d3.range(100).map(function(i) {
            return {index: i};
        });

        var force = d3.layout.force()
                            .nodes(nodes)
                            .size([width, height])
                            .on("tick", tick)
                            .start();
        return force;
    }


    function tick(e) {
          // Push different nodes in different directions for clustering.
          var k = 6 * e.alpha;
          nodes.forEach(function(o, i) {
            o.y += i & 1 ? k : -k;
            o.x += i & 2 ? k : -k;
          });

          node.attr("cx", function(d) { return d.x; })
              .attr("cy", function(d) { return d.y; });
    }