///////////////////////////////////////////////////////////////////////////////////////
//    JavaScript Animated D6 Dice Roller - D6 Dice Rolling JavaScript classes
//
//    Written in 2005 by Michael K. Eidson, mike@eposic.org, http://eposic.org
//
//    To the extent possible under law, the author(s) have dedicated all
//    copyright and related and neighboring rights to this software to the
//    public domain worldwide. This software is distributed without any warranty.
//
//    You should have received a copy of the CC0 Public Domain Dedication along
//    with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
///////////////////////////////////////////////////////////////////////////////////////

// <<<<<<< HEAD
// function Game(player1, player2) {
//   this.turn = 0;
//   this.player1 = player1;
//   this.player2 = player2;
// =======
// The D6Animator class
function D6Animator(id, baseUrl, key) {
  if ((typeof id != "string") || !id) return; // allows a dummy object to be created without causing errors below.
  this.id = id;
  if ((typeof key != "string") || !key) key = id;
  D6Animator.animators[id] = this;
  if (document.getElementById) {
    var targetElem = document.getElementById(id);
    if (!targetElem) {
      this.nope("Debug: The tag with specified id (" + id + ") was not found in the document.");
    } else {
      if (targetElem.nodeName.toLowerCase() == 'img') {
        this.useImages = true;
        this.targetImg = targetElem;
        var imageBank = D6Animator.getImageBank(key, baseUrl);
        this.blank = imageBank.blank;
        var i;
        for (i=1; i<7; ++i) {
          var whichDie = "die" + i;
          this[whichDie] = imageBank[whichDie];
        }
      } else {
        this.useImages = false;
        this.dieSpan = targetElem;
      }
    }
    this.seedMod = Math.round(Math.random() * 100);
    this.seedModInc = Math.round(Math.random() * 100) + 89;
    this.initSeed();
    this.callback = new Function("args", "return false;");
    this.args = 0;
    this.interval = 50;
    if (!this.useImages) this.interval = 10;
  } else {
    this.nope(0);
  }
}

D6Animator.animators = new Array();

D6Animator.get = function(id) {
  if (D6Animator.animators[id]) return D6Animator.animators[id];
  return new D6Animator(id);
}

D6Animator.imageBanks = new Object();

D6Animator.getImageBank = function(key, baseUrl) {
  var imageBank = D6Animator.imageBanks[key];
  if (!imageBank) {
    D6Animator.imageBanks[key] = new Object();
    imageBank = D6Animator.imageBanks[key];
    if (typeof baseUrl != "string")
      baseUrl = D6Animator.baseUrl;
    if (typeof baseUrl != "string") baseUrl = "";
    imageBank.blank = new Image();
    imageBank.blank.src = baseUrl + "pig.png";
    var i;
    for (i=1; i<7; ++i) {
      whichDie = "die" + i;
      imageBank[whichDie] = new Object();
      imageBank[whichDie].die = new Image();
      imageBank[whichDie].die.src = baseUrl + "die-" + i + ".gif";
      imageBank[whichDie].side = new Image();
      imageBank[whichDie].side.src = baseUrl + "dices-" + i + ".gif";
      imageBank[whichDie].top = new Image();
      imageBank[whichDie].top.src = baseUrl + "dicet-" + i + ".gif";
    }
  }
  return imageBank;
}

D6Animator.prototype.setInterval = function(interval) {
  if (!interval) {
    if (this.useImages)
      interval = 50;
    else
      interval = 10;
  }
  this.interval = interval;
}

D6Animator.prototype.setCallback = function(callback, args) {
  if (typeof callback != 'function')
    return this.nope("Debug: The first argument to the setCallback method of the D6Animator class must be of type 'function'.");
  this.callback = callback;
  this.args = args;
}
var globalRoll;
D6Animator.prototype.start = function(result) {
  if (!result || result < 1 || result > 6) result = this.randomBaseOne(6);
  var sequence = new Array();
  var state = "top";
  if (this.random(2) == 1) state = "side";
  var seqCount = this.random(3) + this.random(3) + this.random(3) + 2;
  if (!this.useImages) seqCount += 2;
  var thisRoll = 0;
  var i=0;
  for ( ; i<seqCount; ++i) {
    thisRoll += this.randomBaseOne(5);
    thisRoll = thisRoll % 6;
    if (!thisRoll) thisRoll = 6;
    sequence[i] = thisRoll;
  }

  //sequence[i] gets the image
  sequence[i] = result;
  globalRoll = result;
  this.result = result;
  this.animate(sequence, state);
}

D6Animator.prototype.animate = function(sequence, state) {
  if (!sequence) return this.nope("Debug: The sequence passed to the animate method of D6Animator was invalid.");
  if (typeof sequence != 'object') {
    return this.nope("Debug: The sequence passed to the animate method of D6Animator was invalid.");
  }
  var numNumbers = sequence.length;
  if (!numNumbers || numNumbers < 1)
    return this.nope("Debug: The sequence passed to the animate method of D6Animator contained no values.");
  if (state != 'top' && state != 'side') state = 'die';
  this.showImg(sequence[0], state);
  var ind = 0;
  if (state == 'die') {
    if (numNumbers == 1) {
      window.setTimeout("D6Animator.callAnimatorCallback('" + this.id + "')", this.interval);
      return true;
    }
    state = "side";
    if (this.random(2) == 0) state = "top";
    ind = 1;
  } else {
    state = "die";
  }
  var nextCall = "D6Animator.animate('" + this.id + "', ['" + sequence[ind];
  for (var i=ind+1; i<numNumbers; ++i) {
    nextCall += "','" + sequence[i];
  }
  nextCall += "'], '" + state + "')";
  window.setTimeout(nextCall, this.interval);
}

D6Animator.callAnimatorCallback = function(id) {
  var animator = D6Animator.animators[id];
  if (animator && (typeof animator == "object") && (typeof animator.callback == "function"))
    animator.callback(animator.args);
}

D6Animator.animate = function(id, sequence, state) {
  var animator = D6Animator.animators[id];
  if (animator && (typeof animator == "object") && (typeof animator.animate == "function"))
    animator.animate(sequence, state);
}

D6Animator.prototype.showImg = function(number, state) {
  if (number < 1 || number > 6 || !state) {
    if (this.useImages) {
      this.targetImg.src = this.blank.src;
    } else {
      this.dieSpan.innerHTML = "";
    }
    return;
  }
  if (this.useImages) {
    var whichDie = "die" + number;
    var dieObj = this[whichDie];
    if (!dieObj) return this.nope("Debug: The specified number (" + number + ") is not a valid number for the D6Animator.");
    var dieImg = dieObj[state];
    if (!dieImg) return this.nope("Debug: The specified state (" + state + ") is not a valid state for the D6Animator.");
    this.targetImg.src = dieImg.src;
  } else {
    this.dieSpan.innerHTML = "[" + number + "]";
  }
}

D6Animator.prototype.clear = function() {
  this.showImg(0, false);
}

D6Animator.prototype.nope = function(msg) {
  if (msg) {
    alert(msg + "\n\n(If you're not the developer for this application, please contact the owner of this website!)");
  } else {
    alert("Either your browser can't handle this application, or there's a bug.\nEither way, you're out of luck right now.\nIf you think this is a bug, please contact the owner of this site!");
  }
  return false;
}

D6Animator.prototype.randomBaseOne = function(n) {
  var m = this.random(n);
  return m+1;
}

D6Animator.prototype.random = function(n) {
  if (!this.seed) this.reInitSeed();
  this.seed = (0x015a4e35 * this.seed) % 0x7fffffff;
  return (this.seed >> 16) % n;
}

D6Animator.prototype.initSeed = function() {
  var now = new Date();
  this.seed = (this.seedMod + now.getTime()) % 0xffffffff;
}

D6Animator.prototype.reInitSeed = function() {
  this.seedMod += this.seedModInc;
  this.initSeed();
}

// The D6AnimGroup class
function D6AnimGroup(id, animators, isSequenced) {  // The animators argument is an array of D6Animator and/or D6AnimGroup objects.
  if ((typeof id != "string") || !id) return; // allows a dummy object to be created without causing errors below.
  this.id = id;
  D6AnimGroup.animgroups[id] = this;
  this.animators = animators;
  this.length = animators.length;
  this.callback = new Function("args", "return false;");
  this.args = 0;
  this.isSequenced = isSequenced;
}

D6AnimGroup.animgroups = new Array();

D6AnimGroup.get = function(id) {
  return D6AnimGroup.animgroups[id];
}

D6AnimGroup.prototype.start = function(results) {
  this.results = this.genMissingResults(results);
  this.completions = new Array();
  var i;
  for (i=0; i<this.length; ++i) {
    var args = {'id': this.id, 'index' : i};
    this.animators[i].setCallback(D6AnimGroup.animgroupCallback, args);
    this.completions[i] = 0;
  }
  for (i=0; i<this.length; ++i) {
    if (!i || !this.isSequenced) {
      this.animators[i].start(this.results[i]);
    }
  }
}

D6AnimGroup.prototype.genMissingResults = function(results) {
  if (!results) results = [];
  for (var i=0; i<this.length; ++i) {
    if (!results[i]) {
      if (this.animators[i].randomBaseOne) {
        results[i] = this.animators[i].randomBaseOne(6);
      } else if (this.animators[i].genMissingResults) {
        results[i] = this.animators[i].genMissingResults();
      } else {
        results[i] = 0;
      }
      this.animators[i].result = results[i];
    }
  }
//	for (var c=results.length; c<this.length; ++c) {
//		if (this.animators[c].randomBaseOne) {
//			results[c] = this.animators[c].randomBaseOne(6);
//		} else if (this.animators[c].genMissingResults) {
//			results[c] = this.animators[c].genMissingResults();
//		} else {
//			results[c] = 0;
//		}
//		this.animators[c].result = results[c];
//	}
  return results;
}

D6AnimGroup.prototype.clear = function() {
  for (var i=0; i<this.length; ++i) {
    this.animators[i].clear();
  }
}

D6AnimGroup.prototype.setCallback = function(callback, args) {
  if (typeof callback != 'function')
    return alert("Debug: The first argument to the setCallback method of the D6AnimGroup class must be of type 'function'.");
  this.callback = callback;
  this.args = args;
}

D6AnimGroup.prototype.notify = function(args) {
  var whichAnim = args.index;
  this.completions[whichAnim]++;
  var numNonZero = 0;
  for (var i=0; i<this.length; ++i) {
    if (this.completions[i])
      numNonZero++;
  }
  if (numNonZero == this.length) {
    this.callback(this.args);
  } else if (this.isSequenced) {
    this.animators[1 + whichAnim].start(this.results[1 + whichAnim]);
  }
}

D6AnimGroup.animgroupCallback = function(args) {
  var id = args.id;
  var animGroup = D6AnimGroup.animgroups[id];
  if (!animGroup) return false;
  animGroup.notify(args);
}

// The D6AnimBuilder class
function D6AnimBuilder(id, results, locations, baseUrl, groupsize, interval, useImages) {
  if (!id) return; // allows a dummy object to be created without causing errors
  this.id = id;
  D6AnimBuilder.animBuilders[id] = this;
  this.results = results;
  if (!locations || (typeof locations != 'object') || !locations.length) locations = new Array();
  for (var c=locations.length; c<results.length; ++c) {
    locations[c] = "die" + (c+1);
  }
  this.locations = locations;
  if (!baseUrl) baseUrl = "";
  this.baseUrl = baseUrl;
  this.groupsize = groupsize;
  this.numGroups = Math.floor(results.length / groupsize);
  this.interval = interval;
  this.useImages = useImages;
  this.callback = null;
  this.callbackData = null;
}

D6AnimBuilder.animBuilders = new Array();

D6AnimBuilder.get = function(id) {
  return D6AnimBuilder.animBuilders[id];
}

D6AnimBuilder.prototype.reset = function() {
  var i;
  for (i=0; i<this.results.length; ++i) {
    this.results[i] = 0;
  }
  for (i=0; i<this.layout.length; ++i) {
    var dieSpan = document.getElementById("sidebar_" + i);
    dieSpan.innerHTML = "";
  }

}

D6AnimBuilder.prototype.genDiceHtml = function(layout, callback, callbackData) {
  this.layout = layout;
  this.callback = callback;
  this.callbackData = callbackData;
  var dieCount = 0;
  var genHtml = "";
  var numTotalImgs = this.groupsize * this.numGroups;
  for (var i=0; i<layout.length; ++i) {
    if (dieCount >= numTotalImgs) break;
    genHtml += "<div id='" + this.id + "_diceGroup_" + i + "' class='diceGroup'>";
    var imgsThisRow = layout[i] * this.groupsize;
    for (var j=0; j<imgsThisRow; ++j) {
      ++dieCount;
      if (dieCount > numTotalImgs) break;
      if (this.useImages) {
        genHtml += "<img id='" + this.id + dieCount + "' class='die' src='" + this.baseUrl + "pig.png' />";
      } else {
        genHtml += "<span id='" + this.id + dieCount + "' class='dieNumber'>&nbsp;</span> ";
      }
    }
    genHtml += " <span id='sidebar_" + i + "' class='sidebar'></span>";
    genHtml += "</div>\n";
  }
  return genHtml;
// >>>>>>> merge_better-ai_animation
}

D6AnimBuilder.prototype.start = function() {
  D6Animator.baseUrl = this.baseUrl;
  var animGroups = new Array();
  var resultsGroups = new Array();
  var dieCount = 0;
  for (var i=0; i<this.numGroups; ++i) {
    var animators = new Array();
    var resultsGroup = new Array();
    for (var j=0; j<this.groupsize; ++j) {
      ++dieCount;
      animators[j] = new D6Animator(this.id + dieCount);
      animators[j].setInterval(this.interval);
      resultsGroup[j] = this.results[i*this.groupsize + j];
      if (!resultsGroup[j]) {
        resultsGroup[j] = animators[j].randomBaseOne(6);
        this.results[i*this.groupsize + j] = resultsGroup[j];
      }
    }
    animGroups[i] = new D6AnimGroup(this.id + "_" + i, animators, false);
    resultsGroups[i] = resultsGroup;
  }
  this.animGroups = animGroups;
  this.resultsGroups = resultsGroups;

  var animTopGroup = new D6AnimGroup(this.id, this.animGroups, true);
  if (this.callback)
    animTopGroup.setCallback(this.callback, this.callbackData);
  animTopGroup.start(this.resultsGroups);
}

// A class with some sample callbacks for D6AnimBuilder as class methods

function D6Sample() {}

D6Sample.showTotals = function(id) {
  var animBuilder = D6AnimBuilder.animBuilders[id];
  var results = animBuilder.results;
  var layout = animBuilder.layout;
  var numTotals = layout.length;
  var dieCount = -1;
  for (var i=0; i<numTotals; ++i) {
    var numInRow = layout[i] * animBuilder.groupsize;
    var rowTotal = 0;
    for (var j=0; j<numInRow; ++j) {
      rowTotal += results[++dieCount];
    }
    var dieSpan = document.getElementById("sidebar_" + i);
    dieSpan.innerHTML = "&nbsp;= " + rowTotal;
  }
}

D6Sample.noop = function() { return; }

// Below is the high level dice roller code, which is much simpler
// to use than all the low level stuff above. Of course, using
// the low level stuff gives you a lot more flexibility in what
// you do, but the following D6 class will still allow you
// to do quite a lot.

function D6() {
  this.dieTotal = 0;
}

D6.dice = function(numDice, callback, callbackData, useImages, buttonLabel) {
  if (typeof useImages == "undefined") useImages = true;
  if (!buttonLabel) buttonLabel = "Roll Dice";
  if (!numDice) numDice = 1;
  if (numDice < 1) numDice = 1;
  D6.numDice = numDice;
  D6.numDiceShown = numDice;
  var results = new Array();
  var i;
  for (i=0; i<numDice; ++i) {
    results[i] = 0;
  }
  var builder = new D6AnimBuilder("dice", results, null, D6.baseUrl, numDice, 50, useImages);
  D6.builder = builder;
  var layout = [1];
  if (!callback) callback= D6Sample.noop;
  if (!callbackData) callbackData = null;
  var middleManData = {
    "id" : "dice",
    "callback" : callback,
    "callbackData" : callbackData
  };
  var genHtml = "<div id='diceall'>" + builder.genDiceHtml(layout, D6.middleManCallback, middleManData) + "</div>";
  // if (buttonLabel != "none") {
  // 	genHtml += "<div id='diceform'><form><input type='button' id='dicebutton' value='" + buttonLabel + "' onclick='D6AnimBuilder.get(\"dice\").reset(); D6AnimBuilder.get(\"dice\").start()' /></form></div>";
  // }
  // genHtml += "</div>";

  $("#die-roll-img").append(genHtml);
}

D6.roll = function() {
  D6AnimBuilder.get("dice").reset();
  D6AnimBuilder.get("dice").start();
}

D6.baseUrl = "js/d6/";

D6.setBaseUrl = function(baseUrl) {
  D6.baseUrl = baseUrl;
}

D6.setButtonLabel = function(buttonLabel) {
  var button = document.getElementById('dicebutton');
  if (!button) return;
  if (!buttonLabel) buttonLabel = "Roll Dice";
  if (buttonLabel == "none") {
    button.style.visibility = "hidden";
  } else {
    button.style.visibility = "";
    button.value = buttonLabel;
  }
}

D6.middleManCallback = function(middleManData) {
  var callback = middleManData.callback;
  if (typeof callback != "function") {
    return;
  }
  var id = middleManData.id;
  var callbackData = middleManData.callbackData;
  var animBuilder = D6AnimBuilder.animBuilders[id];
  var results = animBuilder.results;
  var resultsTotal = 0;
  var i;
  for (i=0; i<D6.numDiceShown; ++i) {
    resultsTotal += results[i];
  }
  callback(resultsTotal, callbackData, results);
}

D6.quickRandom = function(base) {
  var baseInt = parseInt(base);
  if (baseInt < 2) return 1;
  return 1 + Math.floor(Math.random() * 698377680) % baseInt;
}

D6.diceToShow = function(numDice) {
  if (!numDice) numDice = 0;
  if (numDice < 0) numDice = 0;
  if (numDice > D6.numDice) numDice = D6.numDice;
  if (numDice == D6.numDiceShown) return;
  var i;
  var dieElem;
  for (i=1; i<=numDice; ++i) {
    dieElem = document.getElementById('dice' + i);
    if (dieElem) dieElem.style.visibility = "";
  }
  for ( ; i<=D6.numDice; ++i) {
    dieElem = document.getElementById('dice' + i);
    if (dieElem) dieElem.style.visibility = "hidden";
  }
  D6.numDiceShown = numDice;
}


//Our Code:
function Player(number, smarts) {
  this.score = 0;
  this.turnTotal = 0;
  this.number = number;
  this.auto = false;
  if (typeof(smarts)==='undefined'){
    this.smarts = 'human';
  } else {
    this.smarts = smarts;
  }
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
    if ((this.whoseTurn) === 2 && (this.player2.smarts === "computer")) {
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
  // $(".total").text(this.turnTotal);
}

Game.prototype.winner = function() {
  var winning_score = 100;
  if (this.player1.score >= winning_score) {
    return 1;
  } else if (this.player2.score >= winning_score) {
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

function rollUntil(limit) {
  var sum = 0;
  while (sum <= limit) {
    var roll = randomInt(1,7);

    if (roll === 1) {
      return 0;
    }
    sum += roll;
  }
  return sum;
}

Game.prototype.autoDiceRoll = function() {
  var sum = 0;
  var totalScore = this.player1.score + this.player2.score;
  if (totalScore < 45) {
    sum += rollUntil(20)
  } else {
    if (this.player1.score > this.player2.score + 35) {
      sum += rollUntil(30)
    } else if (this.player1.score > this.player2.score) {
      sum += rollUntil(25)
    } else {
      sum += rollUntil(15)
    }
  }
  return sum;
}

$(document).ready(function() {
  D6.dice(1);
  var game = new Game();
  $("#dicebutton").click(function() {
    game.turnTotal += globalRoll;
    if (globalRoll === 1) {
      game.turnTotal = 0;
      game.toggle();
    }
    $(".total").text(game.turnTotal);
    // $(".total").addClass("animated fadeIn infinite");
    // $(".total").addClass("animated fadeOut");
  });

  $("#hold").click(function() {
    game.toggle();
  });

  var playing = false;
  $('#play-human').click(function() {
    game.reset();
  });

  $('#play-computer').click(function() {
    game.reset();
    game.player2.smarts = 'computer';
  });

});
