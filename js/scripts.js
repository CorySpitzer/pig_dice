
function Game() {
  this.whoseTurn = 1;
}

function Player() {
  this.score = 0;
}

// From MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

Game.prototype.toggle = function() {
  if (this.whoseTurn === 1) {
    this.whoseTurn = 2;
  } else {
    this.whoseTurn = 1;
  }

}

$(document).ready(function() {
  var total = 0;
  var whoseTurn = "player1";
  var player1Score = 0;
  var player2Score = 0;
  $("#roll").click(function() {
    var roll = randomInt(1,7);
    $("#die-roll").text(roll);
    total += roll;
    if (roll === 1) {
      if (whoseTurn === "player1") {
        whoseTurn = "player2";
        total = 0;
      } else {
        whoseTurn = "player1";
        total = 0;
      }
    }
    $(".total").text(total);
  });

  $("#hold").click(function() {

    if (whoseTurn === "player1") {
      player1Score += total;
      $("#player1").text(player1Score);
      whoseTurn = "player2";
    } else {
      player2Score += total;
      $("#player2").text(player2Score);
      whoseTurn = "player1";
    }
    total = 0;
    $(".total").text(total);

  });
});
