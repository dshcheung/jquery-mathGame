//Global Variable
var timeLeft;
var setTimer;
var startInterval;
var stopInterval;

//Document Ready S
$(document).ready(
  function() {

    { // declear startInterval and stopInterval
      startInterval = function() {
        setTimer = setInterval(function() {
          if (timeLeft = 0) {
            stopInterval();
            // hide answer-input-block
            // unhide button
            // change button to restart
            // hide timer-block
            // unhide result-block
            // get result.json 
            // calculate position
            // display result to result-content
          }
          $('.timer-counter').html(timeLeft);
          timeLeft--;
        }, 1000);
      };
      stopInterval = function() {
        clearInterval(setTimer);
      };
    }

    { //Create Slider
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
    };

    { //Start Button / Restart Button
      $("#answer-start-button").on("click", function() {
        timeLeft = 10;
        startInterval();
        // getSettings();
        // genQuestion();
        // hide button
        // unhide answer-input-block
      });
    }

    //Keyup answer
    $("#answer-input-field").on("keyup", function() {
      // if input == getAnswer() 
      // stopInterval()
      // point++ 
      // timeLeft++
      // genQuestion()
      // startInterval()
    })
  }
);
var getSettings = function() {
  var settings = {
    max: $("#setting-slider").slider('value'),
    addition: $("#setting-addition").prop("checked"),
    subtraction: $("#setting-subtraction").prop("checked"),
    multiplication: $("#setting-multiplication").prop("checked"),
    division: $("#setting-division").prop("checked"),
    square: $("#setting-square").prop("checked"),
    squareRoot: $("#setting-square-root").prop("checked")
  }
  return settings;
};

var genQuestion = function() {

};
