/*
 * Data to populate
 * our table with.
 */
var matrix = [
    [1, 65, 45, 24]
  , [86, 52, 34, 13]
  , [76, 43, 34, 23]
  , [63, 43, 87, 12]
];

/*
 * Create table el in dom.
 */
var container = d3.select('#new-table')
  , heading = container.append('h2').text('New table')
  , table = container.append('table');


/*
 * Bind the matrix data to all rows,
 * and add them on enter.
 */
var tr = table.selectAll('tr')
  .data(matrix)
  .enter().append('tr');


/*
 * Bind row data to all table data
 * per row, add them via animation
 * and finally, add the text.
 */
var td = tr.selectAll('td')
    .data(function(d) { return d; })
  .enter().append('td')
    .style('background-color', 'grey')
  .transition()
    .duration(750)
    .style('background-color', 'white')
  .text(function(d, i) { return d; });
