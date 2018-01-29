$(document).ready(function() {
  /* Highlight a box */
  function highlight(color) {
  let box = "." + color;
  let opacityTemp = $(box).css("opacity");
  $(box).animate({
    opacity: 1
  }, 200, function() {
    $(box).animate({
      opacity: opacityTemp
    }, 200);
  });
  }

})
