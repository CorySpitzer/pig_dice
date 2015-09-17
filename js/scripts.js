function Player(number) {
  this.score = 0;
  this.turnTotal = 0;
  this.number = number;
  this.auto = false;
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
    $("#player1").text(this.player1.score);
    if ((this.whoseTurn) === 2 && (this.player2.auto === true)) {
      this.turnTotal = this.autoDiceRoll();
      this.toggle();
    }
  } else {
    this.player2.score += this.turnTotal;
    this.whoseTurn = 1;
    $("#player2").text(this.player2.score);
  }
  if (this.winner()){
    $('#winner').text("Winner" + this.winner());
    $('.playing').hide();
    $('.not-playing').show();
  }
  $(".player1").toggleClass("gray");
  $(".player2").toggleClass("gray");
  this.turnTotal = 0;
  $(".total").text(this.turnTotal);
}

Game.prototype.winner = function() {
  if (this.player1.score >= 50) {
    return 1;
  } else if (this.player2.score >= 50) {
    return 2;
  } else {
    return false;
  }
}

Game.prototype.reset = function() {
  this.player1.score = 0;
  this.player2.score = 0;
  $(".score").text(0);
  this.turnTotal = 0;
  $('.playing').show();
  $('.not-playing').hide();
}

Game.prototype.autoTurn = function() {
  this.turnTotal = this.autoDiceRoll();
  this.toggle();
}

Game.prototype.autoDiceRoll = function() {
  var sum = 0;
  while (sum <= 15) {
    var roll = randomInt(1,7);

    if (roll === 1) {
      return 0;
    }
    sum += roll;
  }
  return sum;

}

$(document).ready(function() {

  var game = new Game();
  $("#dicebutton").click(function() {
    // D6.dice(1);
    // console.log(D6.dieTotal);
    var roll;
    // var roll = randomInt(1,7);
    if (!globalDieTotal) {
      roll = 0;
    } else {
      var roll = parseInt(globalDieTotal);
    }
    debugger;
    console.log(document.getElementById('die-roll-int').innerHTML);
    // $("#die-roll-int").text(roll);
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

  $("#auto").click(function() {
    game.autoTurn();
  });

  playing = false;
  $('#play-human').click(function() {
    game.reset();
  });

  $('#play-computer').click(function() {
    game.reset();
    game.player2.auto = true;
  });

});
