
// add the svg object
var svg2 = d3.select("#positive_cases_variant_groups")
    .append("svg")
        // .attr("viewBox", "0 0 " + String(height + margin.top + margin.bottom)+ " " + String(width + margin.left + margin.right))
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// load the data set and plot it
d3.csv("http://localhost:8000/data/covid_tests/covid_tests_preprocessed.csv", 

    // format variables
    function(d){
        return { date : d3.timeParse("%Y-%m-%d")(d.datum),
                 week_date : d3.timeParse("%Y-%m-%d")("2020" + d.datum.slice(4)),
                amount_positive : d["Positivenanteil"], 
                dominant_variant : d.dominant_variant,
                year : d.year, 
                week : d.week }
    },

    function(data) {

        // data.sort(function(a,b) { return +a.week - +b.week })

        xFeature = ["date", "week_date"];
        d3.select("#selectButton")
            .selectAll('myOptions')
            .data(xFeature)
            .enter()
            .append('option')
            .text(function (d) { return d; }) // text showed in the menu
            .attr("value", function (d) { return d; }); // corresponding value returned by the button

        var x = AddXAxis(svg2, data, "date");
        var y = AddYAxis(svg2, data, "amount_positive");

        // group the data by dominant variant
        var sumstat = d3.nest()
        .key(function(d) { return d.dominant_variant; })
        .entries(data);

        // add group colors
        var res = sumstat.map(function(d){ return d.key })
        var color = d3.scaleOrdinal()
            .domain(res)
            .range(['#e41a1c','#377eb8','#4daf4a','#984ea3']);

        // Add multiple lines, one per group
        var lines = svg2.selectAll(".line")
            .data(sumstat)
            .enter()
            .append("path")
                .attr("fill", "none")
                .attr("stroke", function(d){ return color(d.key)})
                .attr("stroke-width", 1.5)
                .attr("d", function(d){
                    return d3.line()
                        .x(function(d) { return x(+d.date) })
                        .y(function(d) { return y(d.amount_positive) })
                        (d.values)
                });

        // Add legend for color coding
        const groups = { 1: "Origin", 2: "Alpha", 3: "Delta", 4: "Omikron"}
        var size = 20
        svg2.selectAll("legendRects")
            .data(res)
            .enter()
            .append("rect")
                .attr("x", width + 10)
                .attr("y", function(d,i){ return (height/2) + i*(size+5)})
                .attr("width", size)
                .attr("height", size)
                .style("fill", function(d){ return color(d)})

        svg2.selectAll("legendTexts")
            .data(res)
            .enter()
            .append("text")
                .attr("x", width + 10 + size*1.2)
                .attr("y", function(d,i){ return (height/2) + i*(size+5) + (size/1.3)})
                .style("fill", function(d){ return color(d)})
                .text(function(d){ return groups[d]})
                .attr("text-anchor", "left")
                .style("alignment-baseline", "middle");

        // A function that update the chart
        function update(selectedGroup) {

            if(selectedGroup == "week_date") {
                x.domain(d3.extent(data, function(d) { return d.week_date; })).range([0, width]);
                svg2.select("#xLabel")
                    .text("Calender week, ignoring year");
                svg2.select("#xAxisGroup")
                    .transition()
                    .duration(1000)
                    .call(d3.axisBottom(x).tickSizeOuter(0));    
            }
            else {
                x.domain(d3.extent(data, function(d) { return d.date; }))
                    .range([0, width]);
                svg2.select("#xLabel")
                    .text("Date (calender week granularity)");
                svg2.select("#xAxisGroup")
                    .transition()
                    .duration(1000)
                    .call(d3.axisBottom(x).tickSizeOuter(0));
            }

            lines.transition()
                .duration(1000)
                .attr("d", function(d){
                        return d3.line()
                            .x(function(d) { return x(+d[selectedGroup]) })
                            .y(function(d) { return y(d.amount_positive) })
                            (d.values)
                });
        }

        // When the button is changed, run the updateChart function
        d3.select("#selectButton").on("change", function(d) {
            // recover the option that has been chosen
            var selectedOption = d3.select(this).property("value");
            // run the updateChart function with this selected option
            update(selectedOption);
        });
    }
);