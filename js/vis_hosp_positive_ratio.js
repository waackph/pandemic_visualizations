
// add the svg object
var svg3 = d3.select("#hospitalization_positive_ratio")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// load the data set and plot it
d3.csv("http://localhost:8000/data/covid_tests/hosp_positive_preprocessed.csv", 

    // format variables
    function(d){
        return { date : d3.timeParse("%Y-%m-%d")(d.datum),
                 week_date : d3.timeParse("%Y-%m-%d")("2020" + d.datum.slice(4)),
                 test_hosp_ratio : d.test_hosp_ratio, 
                dominant_variant : d.dominant_variant,
                year : d.year, 
                week : d.week }
    },

    function(data) {

        data.sort(function(a,b) { return +a.week - +b.week });
 
        // Add X axis as datetime axis
        var x = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return d.week_date; }))
            .range([ 0, width ]);

        svg3.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSizeOuter(0)); // Remove outer last tick

        // Add X axis label
        svg3.append("text")
            .attr("id", "xLabel")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height + margin.top + 30)
            .text("Calender week");

        // Add Y axis - amount of positive cases
        var y = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return +d["test_hosp_ratio"]; })])
            .range([ height, 0 ]);

        svg3.append("g")
            .call(d3.axisLeft(y)
                .tickSizeOuter(0))
            .call(g => g.select(".domain")
                .remove())
            .call(g => g.selectAll(".tick:not(:first-of-type) line")
                .attr("stroke-opacity", 0.5)
                .attr("x2", width)
                .attr("stroke-dasharray", "2,2"));

        // Add Y axis label
        svg3.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -margin.top)
            .text("(Hospitalization / positive cases) ratio");

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
        svg3.selectAll(".line")
            .data(sumstat)
            .enter()
            .append("path")
                .attr("fill", "none")
                .attr("stroke", function(d){ return color(d.key)})
                .attr("stroke-width", 1.5)
                .attr("d", function(d){
                    return d3.line()
                        .x(function(d) { return x(+d.week_date) })
                        .y(function(d) { return y(d.test_hosp_ratio) })
                        (d.values)
                });

        // Add legend for color coding
        const groups = { 1: "Origin", 2: "Alpha", 3: "Delta", 4: "Omikron"}
        var size = 20
        svg3.selectAll("legendRects")
            .data(res)
            .enter()
            .append("rect")
                .attr("x", width + 10)
                .attr("y", function(d,i){ return (height/2) + i*(size+5)})
                .attr("width", size)
                .attr("height", size)
                .style("fill", function(d){ return color(d)})

        svg3.selectAll("legendTexts")
            .data(res)
            .enter()
            .append("text")
                .attr("x", width + 10 + size*1.2)
                .attr("y", function(d,i){ return (height/2) + i*(size+5) + (size/1.3)})
                .style("fill", function(d){ return color(d)})
                .text(function(d){ return groups[d]})
                .attr("text-anchor", "left")
                .style("alignment-baseline", "middle");
    }
);