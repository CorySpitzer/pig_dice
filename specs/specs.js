//Die roll (random number 1-6)


//Player class (human or computer; score)
describe('Player', function () {
  it("makes a new player", function() {
    var testPlayer = new Player();
    expect(testPlayer.score).to.equal(0);
  });

});
//Game class (type of players, game.TakeTurn, difficulty, variations )

describe('Game', function () {
  it("makes a new game", function() {
    var game = new Game();
    expect(game.whoseTurn).to.equal(1);
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
    expect(game.winner()).equal(false);
  });
});
