// Builds a pie chart summarizing table content
$(function(){
  // Data
  // Collect data from DOM
  var rawCountForChart = [];
  $(".project-leader").each(function(index, item){
    rawCountForChart.push(item.innerHTML);
  });
  // Sort and count occurances, marshal the data to be used in a chart
  rawCountForChart.sort();
  if (rawCountForChart.length == 0) {
    // No data to process, abort all subsequent steps
    console.log("No data to display - Leader chart will not be loaded");
    return;
  }
  var last = "start";
  var count = 0;
  var dataset = [];
  $.each(rawCountForChart, function(current){
    if ((last == "start") && (count == 0)) {
      // Handle the start case
      last = rawCountForChart[current];
      count++;
    } else if (last == rawCountForChart[current]) {
      // Item is the same, keep counting
      count++;
    } else {
      // Item changed, load to array and start counting the new item
      var toLoad = {};
      toLoad.label = last;
      toLoad.count = count;
      dataset.push(toLoad);
      last = rawCountForChart[current];
      count = 1;
    }
  });
  // Push onto the array whatever was at the end
  var toLoad = {};
  toLoad.label = last;
  toLoad.count = count;
  dataset.push(toLoad);

  // Sort array of objects
  function compare(a,b) {
    if (a.count < b.count)
      return 1;
    if (a.count > b.count)
      return -1;
    return 0;
  }
  dataset.sort(compare);

  // Config
  var width = document.getElementById("pieSummaryLeader").offsetWidth;
  if (width < 300) {
    // Screen is too small, do not display charts
    console.log("Screen is too small - we will not load charts");
    return;
  }
  var height = 300;
  var radius = Math.min(width, height) / 2;
  var donutWidth = 75;
  var color = d3.scale.category20c();
  var legendRectSize = 18;
  var legendSpacing = 4;

  // Build the graph
  var svg;
  if (width >= 500) {
    svg = d3.select('#pieSummaryLeader').append('svg').attr('width', width).attr('height', height).append('g').attr('transform', 'translate(' + (width / 3) +',' + (height / 2) + ')');
  } else {
    svg = d3.select('#pieSummaryLeader').append('svg').attr('width', width).attr('height', height).append('g').attr('transform', 'translate(' + (width / 2) +',' + (height / 2) + ')');
  }
  var arc = d3.svg.arc().innerRadius(radius - donutWidth).outerRadius(radius);
  var pie = d3.layout.pie().value(function(d) { return d.count; }).sort(null);
  var path = svg.selectAll('path').data(pie(dataset)).enter().append('path').attr('d', arc).attr('fill', function(d, i) {return color(d.data.label);});

  //  Build a legend
  if (width >= 500) {
    var legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
      var height = legendRectSize + legendSpacing;
      var offset =  height * color.domain().length / 2;
      var horz = -2 * legendRectSize;
      var vert = i * height - offset;
      return 'translate(' + (horz + 190) + ',' + vert + ')';
    });
    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', color)
      .style('stroke', color);
    legend.append('text')
          .attr('x', legendRectSize + legendSpacing)
          .attr('y', legendRectSize - legendSpacing)
          .text(function(d) { return d; });
  }

  // Enable tooltips
  var tooltip = d3.select('#pieSummaryLeader').append('div').attr('class', 'd3tooltip');
  tooltip.append('div').attr('class', 'tip-main');
  tooltip.append('div').attr('class', 'tip-count');
  tooltip.append('div').attr('class', 'tip-percent');
  // Mouse in/over
  path.on('mouseover', function(d) {
    var total = d3.sum(dataset.map(function(d) {
      return d.count;
    }));
    var percent = Math.round(1000 * d.data.count / total) / 10;
    tooltip.select('.tip-main').html(d.data.label);
    tooltip.select('.tip-count').html(d.data.count + " projects");
    tooltip.select('.tip-percent').html(percent + "% of all projects" );
    tooltip.style('display', 'block');
  });
  // Mouse out
  path.on('mouseout', function() {
    tooltip.style('display', 'none');
  });
});
