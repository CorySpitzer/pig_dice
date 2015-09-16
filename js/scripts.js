
function Game() {
  this.whoseTurn = 1;
  this.player1score = 0;
  this.player2score = 0;
  this.total = 0;
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

Game.prototype.winner = function() {
  if (this.player1score >= 100) {
    return 1;
  } else if (this.player2score >= 100) {
    return 2;
  } else {
    return false;
  }
}

$(document).ready(function() {
  var game = new Game();
  game.total = 0;
  var player1Score = 0;
  var player2Score = 0;
  $("#roll").click(function() {
    var roll = randomInt(1,7);
    $("#die-roll").text(roll);
    game.total += roll;
    if (roll === 1) {
      if (game.whoseTurn === 1) {
        game.toggle();
        game.total = 0;
        $(".player1").toggleClass("well");
        $(".player2").toggleClass("well");
      } else {
        game.toggle();
        game.total = 0;
        $(".player2").toggleClass("well");
        $(".player1").toggleClass("well");
      }
    }
    $(".total").text(game.total);
  });

  $("#hold").click(function() {
    if (! game.winner){
      if (game.whoseTurn === 1) {
        player1Score += game.total;
        $("#player1").text(player1Score);
        $(".player1").toggleClass("well");
        $(".player2").toggleClass("well");
        game.toggle();
      } else {
        player2Score += game.total;
        $("#player2").text(player2Score);
        $(".player2").toggleClass("well");
        $(".player1").toggleClass("well");
        game.toggle();
      }
      game.total = 0;
      $(".total").text(game.total);
    } else {
      $('#winner').text(game.winner);
    }

  });
});
