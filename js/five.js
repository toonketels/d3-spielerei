/*
 * Data to play with.
 */
var data = [4, 8, 15, 16, 23, 42]
  , xOffset = 10
  , yOffset = 15;


/*
 * Create container for chart.
 */
 var container = d3.select('#container')
   .append('svg')
   .attr('class', 'chart')
   .attr('width', 700)
   .attr('height', (data.length * 40))
   .attr('x', -10);


/*
 * Chart is just a grouping withing container.
 */
var chart = container .append('g')
   .attr('transform', 'translate('+xOffset+','+yOffset+')');


/*
 * Scaling function for data.
 *
 * Checks the max area we can use (range)
 * and compares the max data we have (domain).
 */
var x = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range([0, container.attr('width') - xOffset]);


/*
 * Scaling function for y position.
 *
 * We scale based on the number of data points.
 */
var y = d3.scale.ordinal()
  .domain(data)
  .rangeBands([0, container.attr('height') -yOffset]);


/*
 * Create 'ticks'.
 *
 * Lines in background, provided
 * by linear scale.
 */
chart.selectAll('line')
  .data(x.ticks(10))
  .enter()
  .append('line')
  .attr('x1', x)
  .attr('x2', x)
  .attr('y1', container.attr('height') -yOffset)
  .attr('y2', container.attr('height') -yOffset)
  .style('stroke', '#eee')
  .transition()
  .duration(1500)
  .attr('y1', 0);


/*
 * Draw the bars.
 */
chart.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', 0)
  .attr('y', y)
  .attr('width', 0)
  .attr('height', y.rangeBand())
  .transition()
  .duration(750)
  .attr('width', x);


/*
 * Draw labels.
 */
chart.selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .attr('x', x)
  .attr('y', function(d,i) {
    return y(d) + y.rangeBand()/2;
  })
  .attr('dx', -10)
  .attr('dy', '.35em')
  .attr('text-anchor', 'end')
  .attr('fill', 'black')
  .text(String)
  .transition()
  .duration(1000)
  .attr('fill', 'white');


/*
 * Create 'ticks' labels.
 */
chart.selectAll('.rule')
  .data(x.ticks(10))
  .enter()
  .append('text')
  .attr("class", "rule")
     .attr("x", x)
     .attr("y", 0)
     .attr("dy", -3)
     .attr("text-anchor", "middle")
     .style('fill-opacity', 1e-6)
     .text(String)
     .transition()
     .delay(500)
     .duration(1000)
     .style('fill-opacity', 1);