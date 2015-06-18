// Builds a pie chart summarizing table content
$(function(){
  // Data
  // Collect data from DOM
  var rawCountDate = [];
  $(".project-leader").each(function(index, item){
    rawCountDate.push(item.innerHTML.toUpperCase());
  });
  // Sort and count occurances, marshal the data to be used in a chart
  rawCountDate.sort();
  if (rawCountDate.length == 0) {
    // No data to process, abort all subsequent steps
    return;
  }
  var last = rawCountDate[0];
  var count = 0;
  var dataset = [];
  $.each(rawCountDate, function(current){
    if (last == rawCountDate[current]) {
      count++;
    } else {
      var toLoad = {};
      toLoad.label = last;
      toLoad.count = count;
      dataset.push(toLoad);
      last = rawCountDate[current];
      count = 0;
    }
  });

  // Config
  var width = 500;
  var height = 300;
  var radius = Math.min(width, height) / 2;
  var donutWidth = 75;
  var color = d3.scale.category20c();
  var legendRectSize = 18;
  var legendSpacing = 4;

  // Build the graph
  var svg = d3.select('#pieSummaryLeader').append('svg').attr('width', width).attr('height', height).append('g').attr('transform', 'translate(' + (width / 3) +',' + (height / 2) + ')');
  var arc = d3.svg.arc().innerRadius(radius - donutWidth).outerRadius(radius);
  var pie = d3.layout.pie().value(function(d) { return d.count; }).sort(null);
  var path = svg.selectAll('path').data(pie(dataset)).enter().append('path').attr('d', arc).attr('fill', function(d, i) {return color(d.data.label);});

  //  Build a legend
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
});