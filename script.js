$(document).ready(function() {
  const tAnim = 300;
  const maxScore = 5;
  let colorPattern = [];
  let highscore = 0;
  let currentScore = 0;

  /* Highlight a box */
  function highlight(color) {
    let box = "." + color;
    let opacityTemp = $(box).css("opacity");
    $(box).animate({
      opacity: 1
    }, tAnim, function() {
      $(box).animate({
        opacity: opacityTemp
      }, tAnim);
    });
  }

  function highlightAll() {
    highlight("color1");
    highlight("color2");
    highlight("color3");
    highlight("color4");
  }

  function randomColor() {
    let r = Math.floor((Math.random() * 4) + 1);
    return "color" + r;
  }

  function patternAnim() {
    for(let i = 0; i <= colorPattern.length ; i++)
    {
      setTimeout(function() {
        highlight(colorPattern[i]);
        if(i === colorPattern.length)
          playerTurn();
        else
          highlight(colorPattern[i]);
      }, i*1300);
    }
  }

  function playerTurn() {
    $(".upper-text").html("Play!");
    let i = 0;


    $(".game-grid>div").click(function() {
      let c = this.className;
      if(c === colorPattern[i])
          {
            highlight(c);
            if(i === colorPattern.length - 1)
            {
              updateCurrentScore();
              $(".upper-text").html("Well done!");
              if(updateHighScore(i) != (maxScore-1)) { // 5
                $(".game-grid>div").off();
                setTimeout(function() { computerTurn(); }, 1000);
              }
              else
              {
              $(".upper-text").html("You win the game!");
              }
            }
            resetOpacity();
            i++;
          }
      else
          {
            // ------------- Lose Message
            loseGame();
          }
    });

  }

  function computerTurn() {
    $(".upper-text").html("Wait...");
    colorPattern.push(randomColor());
    patternAnim();
  }

  function reset() {
    updateCurrentScore(0);
    highscore = 0;
    colorPattern = [];
    setTimeout(function() {
      computerTurn();
    }, 1000);
  }

  function resetOpacity() {
    console.log("--- Resetting opacity")
    setTimeout( function() {$(".game-grid>div").css("opacity", "0.3");}, 2000);
  }

  function updateCurrentScore(k) {
    (k === 0 ? currentScore = 0 : currentScore = colorPattern.length);
    $(".score--current").html("Score: " + currentScore);
  }

  function updateHighScore(k) {
    if(k > highscore)
      highscore = k;
    $(".score").html("Highscore: " + highscore);
    return highscore;
  }

  function loseGame() {
    highlightAll();
    $(".upper-text").html("You lost!");
    $(".game-grid>div").off();
    console.log("You lost! " + colorPattern.length);
    resetOpacity();
    reset();
  }

  $(".menu>.start").on("click", function() {
    $(this).fadeOut(300,function() {
      $(".menu>.reset").fadeIn(300);
    });
    $
    console.log("Game started");
    computerTurn();
  })
  $(".menu>.reset").on("click", function() {
    console.log("Game reset");
    $(".upper-text").html("Reset!");
    highlightAll();
    reset();
  })
  $(".menu>.reset").hide();

  /***** Disables selection *****/
  jQuery.fn.extend({ disableSelection: function() { return this.each(function() {
  this.onselectstart = function() { return false; }; this.unselectable = "on";
  jQuery(this).css('user-select', 'none'); jQuery(this).css('-o-user-select',
  'none'); jQuery(this).css('-moz-user-select', 'none');
  jQuery(this).css('-khtml-user-select', 'none');
  jQuery(this).css('-webkit-user-select', 'none'); }); } });
  $('html').disableSelection();

})
