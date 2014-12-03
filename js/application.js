// Global Variable
var timeLeft;
var setTimer;
var startInterval;
var stopInterval;
var settingAll;
var settingFunction;
var questionAnswer;
var userPoints;

$(document).ready( // Document Ready S
  function() {
    { // Create Slider S
      $("#setting-slider").slider({
        range: "min",
        value: 100,
        min: 10,
        max: 1000,
        slide: function(event, ui) {
          $("#amount").val(ui.value);
        }
      });
      $("#amount").val($("#setting-slider").slider("value"));
    }; // Create Slider C

    { // declear startInterval and stopInterval
      startInterval = function() {
        setTimer = setInterval(function() {
          if (timeLeft == 0) {
            stopInterval();
            hideButton(false);
            hideAnswerField(true);
            hideTimer(true);
            hideResult(false);
            // get result.json 
            // calculate position
            // display result to result-content
          }
          console.log(timeLeft);
          $('.timer-counter').html(timeLeft);
          timeLeft--;
        }, 1000);
      };
      stopInterval = function() {
        clearInterval(setTimer);
      };
    }

    { // Start Button / Restart Button
      $("#answer-start-button").on("click", function() {
        timeLeft = 10;
        getSettings();
        genQuestion();
        hideButton(true);
        hideAnswerField(false);
        startInterval();
      });
    }

    // Keyup answer
    $("#answer-input-field").on("keyup", function() {
      // if input == questionAnswer.dataAnswer 
      stopInterval()
      userPoints++
      timeLeft++
      genQuestion()
        // postData()
        // postQuestion()
      startInterval()
    })
  }
);

{ // Question Stuff S
  var getSettings = function() {
    settingAll = {
      max: $("#setting-slider").slider('value'),
      addition: $("#setting-addition").prop("checked"),
      multiplication: $("#setting-multiplication").prop("checked"),
      subtraction: $("#setting-subtraction").prop("checked"),
      division: $("#setting-division").prop("checked"),
      square: $("#setting-square").prop("checked"),
      squareRoot: $("#setting-square-root").prop("checked")
    }
    settingFunction = [];
    for (var i = 0; i < $(".setting-checkbox li input").length; i++) {
      if ($($(".setting-checkbox li input")[i]).prop("checked") == true) {
        settingFunction.push(i);
      }
    }
  };
  var genTwoNum = function(maxLimit, noZero) {
    var twoNumArray = [];
    var tempNum;
    for (var i = 0; i < 2; i++) {
      tempNum = Math.floor(Math.random() * maxLimit) + 1;
      if (noZero == true && tempNum == 0) {
        tempNum++;
      }
      if (tempNum <= twoNumArray[0] || twoNumArray[0] == undefined) {
        twoNumArray.push(tempNum);
      } else if (tempNum > twoNumArray) {
        twoNumArray.unshift(tempNum);
      }
    }
    return twoNumArray;
  };
  var genQuestion = function() {
    questionAnswer = {};
    switch (settingFunction[Math.floor(Math.random() * settingFunction.length)]) {
      case 0: // addition
        var twoRanNumArray = genTwoNum(settingAll.max, false);
        questionAnswer.dataEquation = twoRanNumArray[0] + " + " + twoRanNumArray[1];
        questionAnswer.userQuestion = questionAnswer.dataEquation
        questionAnswer.dataAnswer = eval(questionAnswer.dataEquation);
        // displayQuestion(userQuestion);
        break;
      case 1: // multiplication
        var twoRanNumArray = genTwoNum(settingAll.max, false);
        questionAnswer.dataEquation = twoRanNumArray[0] + " * " + twoRanNumArray[1];
        questionAnswer.userQuestion = questionAnswer.dataEquation
        questionAnswer.dataAnswer = eval(questionAnswer.dataEquation);
        // displayQuestion(userQuestion);
        break;
      case 2: // subtraction. prevent negative
        var twoRanNumArray = genTwoNum(settingAll.max, false);
        questionAnswer.dataEquation = twoRanNumArray[0] + " - " + twoRanNumArray[1];
        questionAnswer.userQuestion = questionAnswer.dataEquation
        questionAnswer.dataAnswer = eval(questionAnswer.dataEquation);
        // displayQuestion(userQuestion);
        break;
      case 3: // division. prevent decimal. prevent zero denominator
        var twoRanNumArray = genTwoNum(Math.floor(Math.sqrt(settingAll.max)), true);
        var specialDivideNum = twoRanNumArray[0] * twoRanNumArray[1];
        questionAnswer.dataEquation = specialDivideNum + " / " + twoRanNumArray[0];
        questionAnswer.userQuestion = questionAnswer.dataEquation
        questionAnswer.dataAnswer = eval(questionAnswer.dataEquation);
        // displayQuestion(userQuestion);
        break;
      case 4: // power of 2
        var twoRanNumArray = genTwoNum(settingAll.max, false);
        questionAnswer.dataEquation = "Math.pow(" + twoRanNumArray[0] + ", 2)";
        questionAnswer.userQuestion = twoRanNumArray[0] + "²";
        questionAnswer.dataAnswer = eval(questionAnswer.dataEquation);
        // displayQuestion(userQuestion);
        break;
      case 5: // squre root. prevent odd number
        var twoRanNumArray = genTwoNum(Math.floor(Math.sqrt(settingAll.max)), false);
        var specialRootNum = Math.pow(twoRanNumArray[0], 2);
        questionAnswer.dataEquation = "Math.sqrt(" + specialRootNum + ")";
        questionAnswer.userQuestion = "√" + specialRootNum;
        questionAnswer.dataAnswer = eval(questionAnswer.dataEquation);
        // displayQuestion(userQuestion);
        break;
    }
  };
} // Question Stuff C

{ // Hidding Stuff S
  var hideButton = function(boolean) {
    if (boolean) {
      $(".answer-button-block").addClass("hide");
    } else {
      $("#answer-start-button").html("Restart");
      $(".answer-button-block").removeClass("hide");
    }
  };
  var hideAnswerField = function(boolean) {
    if (boolean) {
      $(".answer-input-block").addClass("hide");
    } else {
      $(".answer-input-block").removeClass("hide");
    }
  };
} // Hidding Stuff C
