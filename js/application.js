// Global Variable
var timeLeft; // integer
var timePassed; // integer
var setTimer; // setInterval function
var startInterval; // function
var stopInterval; // function
var settingAll; // object
var settingFunction; // array of enabled functions
var questionAnswer; // object
var userPoints; // integer

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

    { // Declear startInterval and stopInterval
      startInterval = function() {
        setTimer = setInterval(function() {
          if (timeLeft == 0) {
            stopInterval();
            hideButton(false);
            hideAnswerField(true);
            hideTimer(true);
            hideResult(false);
            postResult();
            // push result
            // get result 
            // display result to result-content
          }
          $('.timer-counter').html(timeLeft);
          timePassed++;
          timeLeft--;
        }, 1000);
      };
      stopInterval = function() {
        clearInterval(setTimer);
      };
    }

    { // Start Button / Restart Button
      $("#answer-start-button").on("click", function() {
        userPoints = 0;
        timePassed = 0;
        timeLeft = 10;
        getSettings();
        genQuestion();
        postQuestion();
        hideButton(true);
        hideAnswerField(false);
        hideTimer(false);
        hideResult(true);
        startInterval();
        $("#answer-input-field").focus();
      });
    }

    // Keyup answer
    $("#answer-input-field").on("keyup", function() {
      if ($("#answer-input-field").val() == questionAnswer.dataAnswer) {
        $("#answer-input-field").val("");
        stopInterval();
        userPoints++;
        timeLeft++;
        genQuestion();
        postQuestion();
        startInterval();
      }
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
  var hideTimer = function(boolean) {
    if (boolean) {
      $(".timer-block").addClass("hide");
    } else {
      $(".timer-block").removeClass("hide");
    }
  };
  var hideResult = function(boolean) {
    if (boolean) {
      $(".result-block").addClass("hide");
    } else {
      $(".result-block").removeClass("hide");
    }
  };
} // Hidding Stuff C

{ // Posting Stuff S
  var postQuestion = function() {
    $("#question").html(questionAnswer.userQuestion);
  };
  var postResult = function() {
    $(".result-content").html("You answered " + userPoints + " questions in " + timePassed + " seconds.\n" + "You are the top x%");
  };
} // Posting Stuff C
