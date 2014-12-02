//Timer Stuff as Global Variable C
var timeLeft = 10;
var setTimer;
var startInterval = function() {
  setTimer = setInterval(function() {
    if (timeLeft <= 0) {
      stopInterval();
    }
    $('.rt-timer').html(timeLeft);
    timeLeft--;
  }, 1000);
};
var stopInterval = function() {
  clearInterval(setTimer);
};
//Timer Stuff as Global Variable C 

//Document Ready S
$(document).ready(
  function() {
    //slider stuff
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
    
    //Start Button
    $(".answer-start-button").on("click", function(){
      startInterval();
    });



  }
);
