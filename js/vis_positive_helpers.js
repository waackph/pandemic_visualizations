function AddXAxis(svgElem, data, col) {

    // Add X axis as datetime axis
    var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d[col]; }))
        .range([ 0, width ]);

    svgElem.append("g")
        .attr("id", "xAxisGroup")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0)); // Remove outer last tick

    // Add X axis label
    svgElem.append("text")
        .attr("id", "xLabel")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 30)
        .text("Date (calender week granularity)");

    return x;
    }

function AddYAxis(svgElem, data, col) {

    // Add Y axis - amount of positive cases
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d[col]; })])
        .range([ height, 0 ]);

    svgElem.append("g")
        .call(d3.axisLeft(y)
            .tickSizeOuter(0))
        .call(g => g.select(".domain")
            .remove())
        .call(g => g.selectAll(".tick:not(:first-of-type) line")
            .attr("stroke-opacity", 0.5)
            .attr("x2", width)
            .attr("stroke-dasharray", "2,2"));

    // Add Y axis label
    svgElem.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -margin.top)
        .text("Proportion of positive covid tests");

    return y;
    }
    