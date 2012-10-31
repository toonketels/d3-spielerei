
/**
 * Grab our svg and
 * data to be displayed.
 */
var svg = d3.select('svg')
  , data = [
    {"x": 1.0, "y": 1.1}
  , {"x": 2.0, "y": 2.5}
  , {"x": 1.3, "y": 1.9}
  , {"x": 2.5, "y": 2.2}
  , {"x": 1.9, "y": 1.0}
  , {"x": 2.9, "y": 2.0}
  ];


/**
 * Draw circles.
 */
var circle = svg
  .selectAll('circle')
  .data(data);

circle
  .transition()
  .attr('cx', function(d,i) {
  	return d.x / 3 * 700;
  })
  .attr('cy', function(d,i) {
  	return d.y / 3 * 300;
  })
  .attr('r', function(d,i) {
    return i * 4 + 5;
  });

circle
  .enter()
  .append('circle')
  .attr('cx', 350)
  .attr('cy', 150)
  .attr('r', 1)
  .transition()
  .attr('cx', function(d,i) {
  	return d.x / 3 * 700;
  })
  .attr('cy', function(d,i) {
  	return d.y / 3 * 300;
  })
  .attr('r', function(d,i) {
    return i * 4 + 5;
  });