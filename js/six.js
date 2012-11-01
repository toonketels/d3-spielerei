/*
 * Generate fake initial data.
 */
var t = 1297110663
  , v = 70
  , data = d3.range(33).map(next);


/*
 * Function applied to each 
 * element of array used to create
 * the data.`
 */
function next() {
  return {
  	  time: ++t
  	, value: v = ~~Math.max(10, Math.min(90, v + 10 * (Math.random() - .5)))
  };
}


/*
 * Keep adding (and removing) data.
 */
setInterval(function() {
  data.shift();
  data.push(next());
  redraw();
}, 1500);


/*
 * Set the scales.
 */
var w = 20
  , h = 80;


var x = d3.scale.linear()
  .domain([0, 1])
  .range([0, w]);


var y = d3.scale.linear()
  .domain([0, 100])
  .rangeRound([0, h]);


/*
 * Add chart...
 */
var chart = d3.select('#chart').append('svg')
  .attr('class', 'chart')
  .attr('width', w * data.length - 1)
  .attr('height', h);


/*
 * Add initial bars...
 */
chart.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', function(d, i) { return x(i) - .5; })
  .attr('y', function(d, i) { return h - y(d.value) - .5; })
  .attr('width', w)
  .attr('height', function(d, i) { return y(d.value); });


/*
 * Add x-axis
 */
chart.append('line')
  .attr('x1', 0)
  .attr('x2', w * data.length)
  .attr('y1', h - .5)
  .attr('y2', h - .5)
  .style('stroke', 'black');


/*
 * Redraw the chart.
 */
function redraw() {

  /*
   * Bind the data, use time as key...
   */
  var rect = chart.selectAll('rect')
    .data(data, function(d) { return d.time; });


  /*
   * Enter...
   */
  rect.enter().append('rect')
    .attr('x', function(d, i) { return x(i + 1) - .5; })
    .attr('y', function(d, i) { return h - y(d.value) - .5; })
    .attr('width', w)
    .attr('height', function(d, i) { return y(d.value); })
    .transition()
    .duration(1000)
    .attr('x', function(d, i) { return x(i) - .5; });

  /*
   * Update...
   */
  rect.transition()
    .duration(1000)
    .attr('x', function(d, i) { return w * i; });

  /*
   * Exit...
   */
  rect.exit()
  .transition()
  .duration(1000)
  .attr('x', function(d,i) { return x(i - 1) - .5; })
  .remove();

}