var data = absKey;
var nameData = nameKey;
var width = screen.width / 4;
var height = screen.width / 4;
var margin = width / 20;
var radius = Math.min(width, height) / 2 - margin;

var color = d3.scaleOrdinal()
    .domain(data.map(function(d) { return d.key; }))
    .range(d3.schemeCategory10);

function chart() {
    var svg = d3.select("#chart").select("svg");
    if (svg.empty()) {
        svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    }
    var pie = d3.pie()
        .value(function(d) { return d.value; });
    var data_ready = pie(d3.entries(data));
    var arcs = svg.selectAll('path')
        .data(data_ready);

    arcs.enter().append('path')
        .merge(arcs)
        .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
        )
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .attr("fill", function(d) { return color(d.data.key); });

    var text = svg.selectAll('text')
        .data(data_ready);
    text.enter().append('text')
        .merge(text)
        .text(function(d, i) { if(i > 0 && d.data.value > 0) return nameKey[i]; })
        .attr("transform", function(d) {
            var pos = d3.arc().innerRadius(radius-50).outerRadius(radius-50).centroid(d);
            return "translate(" + pos + ")";
        })
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .style("alignment-baseline", "middle");

    arcs.exit().remove();
    text.exit().remove();
}

function resetChart() {
    d3.select("#chart").select("svg").remove();
    data = absKey;
    nameData = nameKey;
}