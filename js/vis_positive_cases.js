
// add the svg object
var svg1 = d3.select("#positive_cases")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// load the data set and plot it
d3.csv(base_url + "data/covid_tests/covid_tests_preprocessed.csv", 

    // format variables
    function(d) {
        return { date : d3.timeParse("%Y-%m-%d")(d.datum), 
                amount_positive : d["Positivenanteil"], 
                dominant_variant : d.dominant_variant,
                year : d.year, 
                week : d.week }
    },

    function(data) {

        var x = AddXAxis(svg1, data, "date");
        var y = AddYAxis(svg1, data, "amount_positive");

        // This allows to find the closest X index of the mouse:
        var bisect = d3.bisector(function(d) { return d.date; }).right;

        // Add the line
        svg1.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return x(d.date) })
                .y(function(d) { return y(d.amount_positive) })
                );

        // Create the circle that travels along the curve of chart
        var focus = svg1
            .append('g')
            .append('circle')
                .style("fill", "none")
                .attr("stroke", "black")
                .attr('r', 8.5)
                .style("opacity", 0);

        // Create the text that travels along the curve of chart
        var focusText = svg1
            .append('g')
            .append('text')
                .style("opacity", 0)
                .attr("text-anchor", "left")
                .attr("alignment-baseline", "middle");

        // Create a rect on top of the svg area: this rectangle recovers mouse position
        svg1.append('rect')
            .style("fill", "none")
            .style("pointer-events", "all")
            .attr('width', width)
            .attr('height', height)
            .on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseout', mouseout);

        // What happens when the mouse move -> show the annotations at the right positions.
        function mouseover() {
            focus.style("opacity", 1)
            focusText.style("opacity",1)
        }

        function mouseout() {
            focus.style("opacity", 0)
            focusText.style("opacity", 0)
        }

        function mousemove() {
            // recover coordinate we need
            var x0 = x.invert(d3.mouse(this)[0]);
            var i = bisect(data, x0, 1);
            selectedData = data[i];

            focus
                .attr("cx", x(selectedData.date))
                .attr("cy", y(selectedData.amount_positive))

            focusText
                // .html("Month/Year:" + (selectedData.date.getMonth()+1).toString() + "/" + selectedData.date.getFullYear().toString() + "  //  " + "Positive prop.:" + parseFloat(selectedData.amount_positive).toFixed(2))
                .html("Positive prop.:" + parseFloat(selectedData.amount_positive).toFixed(2))
                .attr("x", x(selectedData.date)+15)
                .attr("y", y(selectedData.amount_positive))
            }
    }
);