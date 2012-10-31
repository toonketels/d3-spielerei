var circle = d3.select('svg').selectAll("circle");

circle
  .data([4, 8, 15, 16, 23, 42, 30, 14, 34])
  .enter().append("circle")
  .attr('cx', function(d, i) {
  	return d * 20;
  })
  .attr('cy', function(d,i) {
  	return i * 50;
  })
  .attr('r', 6);

circle
    .data([4, 8, 15, 16]);

circle.exit().remove();
