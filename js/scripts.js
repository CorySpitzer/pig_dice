
function Game() {
  this.turn = 0;
}

function Player() {
  this.score = 0;
}

// From MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

$(document).ready(function() {
  var total = 0;
  $("#roll").click(function() {
    total += randomInt(1,7);
    $(".total").text(total);
  });
});
