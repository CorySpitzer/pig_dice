function Player(number) {
  this.score = 0;
  this.turnTotal = 0;
  this.number = number;
}

Player.prototype.takeTurn = function() {
  this.score += this.turnTotal;
  $("#player" + player.number).text(player.score);
  game.toggle();
}

// From MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function Game() {
  this.whoseTurn = 1;
  this.turnTotal = 0;
  this.player1 = new Player(1);
  this.player2 = new Player(2);
}

Game.prototype.toggle = function() {
  if (this.whoseTurn === 1) {
    this.player1.score += this.turnTotal;
    this.whoseTurn = 2;
    $("#player1").text(this.player1.score)
  } else {
    this.player2.score += this.turnTotal;
    this.whoseTurn = 1;
    $("#player2").text(this.player2.score)
  }
  if (this.winner()){
    $('#winner').text("Winner" + this.winner());
    $('.playing').hide();
    $('.not-playing').show();
  }
  $(".player1").toggleClass("well");
  $(".player2").toggleClass("well");
  this.turnTotal = 0;
  $(".total").text(this.turnTotal);
}

Game.prototype.winner = function() {
  if (this.player1.score >= 10) {
    return 1;
  } else if (this.player2.score >= 10) {
    return 2;
  } else {
    return false;
  }
}



$(document).ready(function() {

  var game = new Game();
  $("#roll").click(function() {
    var roll = randomInt(1,7);
    $("#die-roll").text(roll);
    game.turnTotal += roll;
    if (roll === 1) {
      game.turnTotal = 0;
      game.toggle();
    }
    $(".total").text(game.turnTotal);
  });

  $("#hold").click(function() {
    game.toggle();
  });
  playing = false;
  $('#play-again').click(function() {
    game.player1.score = 0;
    game.player2.score = 0;
    $(".score").text(0);
    game.turnTotal = 0;
    $('.playing').show();
    $('.not-playing').hide();
  });

});
