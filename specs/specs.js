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
    expect(game.turn).to.equal(0);
    // expect(game.)
  });

});
