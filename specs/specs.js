//Die roll (random number 1-6)


//Player class (human or computer; score)
describe('Player', function () {
  it("makes a new player", function() {
    var testPlayer = new Player();
    expect(testPlayer.score).to.equal(0);
  });

  it("takes a turn", function() {
    var testPlayer = new Player();
    var testGame = new Game();
    testPlayer.takeTurn;
    expect(testGame.turn).to.equal(1);
  });

});
//Game class (type of players, game.TakeTurn, difficulty, variations )

describe('Game', function () {
  it("makes a new game", function() {
// <<<<<<< HEAD
//     var player1 = new Player();
//     var player2 = new Player();
//     var game = new Game(player1, player2);
//     expect(game.turn).to.equal(0);
//     expect(game.player1).to.equal(player1)
//     expect(game.player2).to.equal(player2)
// =======
    var game = new Game();
    expect(game.whoseTurn).to.equal(1);
// >>>>>>> merge_better-ai_animation
  });

  it("switches turns", function() {
    var game = new Game();
    game.toggle();
    expect(game.whoseTurn).to.equal(2);
    game.toggle();
    expect(game.whoseTurn).to.equal(1);
  });

  it("Allows someone to win", function() {
    var game = new Game();
    game.player1.score = 100;
    expect(game.winner()).to.equal(1);
  });

  it("does not set a winner before 100 points", function() {
    var game = new Game();
    expect(game.winner()).to.equal(false);
  });

  describe('autoDiceRoll', function() {
    it('gives points', function() {
      var game = new Game();
      expect(game.autoDiceRoll()).is.a('number');
    });
  });
});

describe("rollUntil", function() {
  it("will not return a number that is six more than the limit", function() {
    expect(rollUntil(15) < 22).to.equal(true);
  });
});
