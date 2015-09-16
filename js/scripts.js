

function Player() {
  this.score = 0;
}

// From MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function Game() {
  this.whoseTurn = 1;
  this.player1score = 0;
  this.player2score = 0;
  this.total = 0;
}

Game.prototype.toggle = function() {
  if (this.whoseTurn === 1) {
    this.whoseTurn = 2;
  } else {
    this.whoseTurn = 1;
  }
  if (this.winner()){
    $('#winner').text("Winner" + this.winner());
  }
  $(".player1").toggleClass("well");
  $(".player2").toggleClass("well");
  this.total = 0;
  $(".total").text(this.total);
}

Game.prototype.winner = function() {
  if (this.player1score >= 10) {
    return 1;
  } else if (this.player2score >= 10) {
    return 2;
  } else {
    return false;
  }
}



$(document).ready(function() {
  var game = new Game();
  game.total = 0;
  $("#roll").click(function() {
    var roll = randomInt(1,7);
    $("#die-roll").text(roll);
    game.total += roll;
    if (roll === 1) {
      game.toggle();
    }
    $(".total").text(game.total);
  });

  $("#hold").click(function() {
    if (game.whoseTurn === 1) {
      game.player1score += game.total;
      $("#player1").text(game.player1score);
      game.toggle();
    } else {
      game.player2score += game.total;
      $("#player2").text(game.player2score);
      game.toggle();
    }

  });
});
