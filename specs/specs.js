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
    var player1 = new Player();
    var player2 = new Player();
    var game = new Game(player1, player2);
    expect(game.turn).to.equal(0);
    expect(game.player1).to.equal(player1)
    expect(game.player2).to.equal(player2)
  });

});



while player1.score < 100 && player2.score < 100

  player1.takeTurn (dice rolling, player choosing to continue or not, set score, toggle to player2)
    hold === false
    dice roll
    while (diceroll !== 1 || hold === false)
      if player holds {
        add score
        hold === true
      dice roll

      while (true)
        dice roll
        if dice === 1
          break

        PROMPT if player holds {
          add score
          break
        current turn score = current turn score + dice roll


    toggle to player2
  player2.takeTurn

end while
