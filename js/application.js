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
var ovalArray;

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
            hideMaster(false, true, true, false, true);
            postResult();
            runAnimate();
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
        hideMaster(true, false, false, true, true);
        startInterval();
        $("#answer-input-field").focus();
      });
    }

    // Keyup answer
    $("#answer-input-field").on("keyup", function() {
      if ($("#answer-input-field").val() == questionAnswer.dataAnswer) {
        stopInterval();
        $("#answer-input-field").val("");
        $("#dingding")[0].load();
        $("#dingding")[0].play();
        userPoints++;
        timeLeft += 2;
        $('.timer-counter').html(timeLeft);
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
  var hideMaster = function(boolean1, boolean2, boolean3, boolean4, boolean5) {
    hideButton(boolean1);
    hideAnswerField(boolean2);
    hideTimer(boolean3);
    hideResult(boolean4);
    hideReady(boolean5);
  };
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
  var hideReady = function(boolean) {
    if (boolean) {
      $(".ready-block").addClass("hide");
    } else {
      $(".ready-block").removeClass("hide");
    }
  }
} // Hidding Stuff C

{ // Posting Stuff S
  var postQuestion = function() {
    $("#question").html(questionAnswer.userQuestion);
  };
  var getName = function() {
    var name = prompt("what's your name?");
    if (name == "") {
      name = "anonymous"
    }
    return name;
  }
  var postResult = function() {
    $.ajax({
      type: "POST",
      url: "https://stark-eyrie-2329.herokuapp.com/leaders/create",
      data: {
        'name': getName(),
        'score': userPoints
      },
      success: function(response) {
        $(".result-content").html("You answered " + userPoints + " questions in " + timePassed + " seconds." + "<br>You are the better than " + ((1 - response.ranking) * 100).toFixed(2) + "%");
      },
      error: function() {
        $(".result-content").html("You answered " + userPoints + " questions in " + timePassed + " seconds.")
      }
    });
  };
} // Posting Stuff C

{ // Animate Stuff S
  var ovalArray;
  var numOval;
  var count;
  var animateTimer;

  var generateOval = function() {
    for (var i = 0 + numOval; i < 50 + numOval; i++) {
      $('body').append('<div class="oval" id="oval' + i + '"></div>');
      $('#oval' + i).css("-webkit-animation", "rainDrop" + i + " 1s ease-in running")
      var posLeft = Math.floor(Math.random() * 100) + "%";
      var posTop1 = Math.floor(Math.random() * 50) + "%";
      var posTop2 = (Math.floor(Math.random() * 50) + 50) + "%";

      $.keyframe.define({
        name: 'rainDrop' + i,
        from: {
          'top': "-50px",
          'left': posLeft
        },
        to: {
          'top': posTop2,
          'left': posLeft
        }
      });
      ovalArray.push("#oval" + i);
    }
    numOval += 50;
    count++;
    if (count == 6) {
      clearInterval(animateTimer);
      setTimeout(function() {
        $('.oval').remove();
      }, 2000);
    }
  };
  var runAnimate = function() {
    ovalArray = [];
    numOval = 0;
    count = 0;
    animateTimer = setInterval(function() {
      generateOval();
    }, 100);
  };
} // Animate Stuff C
