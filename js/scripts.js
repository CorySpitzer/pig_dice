
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
  $(".player1").toggleClass("well");
  $(".player2").toggleClass("well");
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

// function toggleTurn(player) {
//   if player ===
//   $(".player1").toggleClass("well");
//   $(".player2").toggleClass("well");
// }

$(document).ready(function() {
  var game = new Game();
  game.total = 0;
  $("#roll").click(function() {
    var roll = randomInt(1,7);
    $("#die-roll").text(roll);
    game.total += roll;
    if (roll === 1) {
      if (game.whoseTurn === 1) {
        game.toggle();
        game.total = 0;
      } else {
        game.toggle();
        game.total = 0;
      }
    }
    $(".total").text(game.total);
  });

  $("#hold").click(function() {
    if (game.whoseTurn === 1) {
      game.player1score += game.total;
      $("#player1").text(game.player1score);
      if (game.winner()){
        console.log('game winner true');
        $('#winner').text(game.winner());
      }
      game.toggle();
    } else {
      game.player2score += game.total;
      if (game.winner()){
        $('#winner').text(game.winner());
      }
      $("#player2").text(game.player2score);
      game.toggle();
      game.total = 0;
      $(".total").text(game.total);
    }

  });
});
