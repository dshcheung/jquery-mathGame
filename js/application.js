  $(function() {
    $("#c-s-slider").slider({
      range: "min",
      value: 100,
      min: 10,
      max: 1000,
      slide: function(event, ui) {
        $("#amount").val(ui.value);
      }
    });
    $("#amount").val($("#c-s-slider").slider("value"));
  });