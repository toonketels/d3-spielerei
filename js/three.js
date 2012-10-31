/*
 * Array of letters and others vars.
 */
var alphabet = "abcdefghijklmnopqrstuvwxyz".split('')
  , width = 700
  , height = 300;


/*
 * Initialize our "canvas" by injecting
 * the svg element, setting its dimensions
 * and injecting a group svg element.
 *
 * Use translate to position all the letters
 * in middle svg.
 */
var svg = d3.select('#svg').append('svg')
  .attr('width', width)
  .attr('height', height)
  .append("g")
  .attr('transform', 'translate(0, ' + height/2 + ')');


/*
 * The games begin...
 *
 * Start drawing letters...
 */
update(alphabet);

setInterval(function() {
  var letters = shuffle(alphabet)
    , letters = letters.slice(0, Math.floor(Math.random() * 26))
    , letters = letters.sort();

  update(letters);
}, 1500);


/*
 * Helper to update the text.
 */
function update(letters) {

  /*
   * Data join
   *
   * Join new letters with existing
   * ones, if any.
   *
   * We add a key function which states
   * that the letter is they key...
   */
  var text = svg.selectAll('text')
    .data(letters, function(d) {
      return d;
    });

  /*
   * Update
   *
   * Update old text as needed. Since
   * text is already added, we only need
   * to reposition it.
   */
  text.attr('class', 'update')
    .transition()
    .duration(750)
    .attr('x', function(d, i) {
      return i * 32;
    });

  /*
   * Enter
   *
   * Add new letters and position them
   *
   * We position relative to grouping.
   */
  text.enter()
    .append('text')
    .attr('class', 'enter')
    .attr('dy', '.35em')
    .attr('y', -60)
    .attr('x', function(d, i) {
      return i * 32
    })
    .style('fill-opacity', 1e-6)
    .text(function(d) {
      return d;
    })
    .transition()
    .duration(750)
    .attr('y', 0)
    .style('fill-opacity', 1);

  /*
   * Exit
   *
   * Slide it down and remove.
   */
  text.exit()
    .attr('class', 'remove')
    .transition()
    .duration(750)
    .attr('y', 60)
    .style('fill-opacity', 1e-6)
    .remove();
}


/*
 * Helper to suffle the input.
 */
function shuffle(letters) {
  var m = letters.length
    , t
    , i;

  while (m) {
  	// Shuffle the letter on m with a 
  	// letter at random under m and vice versa
  	i = Math.floor(Math.random() * m--)
  	, t = letters[m]
  	, letters[m] = letters[i]
  	, letters[i] = t;
  }

  return letters;
}