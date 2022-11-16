// Base URL for data resources
const base_url = "https://raw.githubusercontent.com/waackph/pandemic_visualizations/docs/"
// set the dimensions and margins of the graph
var margin = {top: 10, right: 100, bottom: 80, left: 60};

var clientWidth = document.getElementById('positive_cases').clientWidth;
var clientHeight = clientWidth / 3.236; // golden rectangle ratio

var width = clientWidth - margin.left - margin.right;
var height = clientHeight - margin.top - margin.bottom;

// Handle window resizing
function doResize() {
    clientWidth = document.getElementById('positive_cases').clientWidth;
    clientHeight = width / 3.236;
    width = clientWidth - margin.left - margin.right,
    height = clientHeight - margin.top - margin.bottom;

    d3.selectAll('svg')
      .attr('width', width)
      .attr('height', height);
}

// Resize function called if window size changed
// window.onresize = doResize;
// window.addEventListener('resize', doResize);