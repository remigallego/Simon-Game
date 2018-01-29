$(document).ready(function() {
  const tAnim = 300;
  const maxScore = 5;
  let colorPattern = [];
  let highscore = 0;
  let currentScore = 0;
  let strict = false;

  var audiocolor1 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
  var audiocolor2 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
  var audiocolor3 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
  var audiocolor4 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

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

        if(i === colorPattern.length) {
          playerTurn();
        }
        else
        {
          highlight(colorPattern[i]);
          simonSound(colorPattern[i]);
        }
      }, i*1300);
    }
  }

  function simonSound(color) {
  switch(color){
    case 'color1': audiocolor1.play(); break;
    case 'color2': audiocolor2.play(); break;
    case 'color3': audiocolor3.play(); break;
    case 'color4': audiocolor4.play(); break;
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
            simonSound(c);
            if(i === colorPattern.length - 1)
            {
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
            if(strict) {
            loseGame();
          }
          else {
            $(".game-grid>div").off();
            $(".upper-text").html("Wrong, look again...");
            patternAnim();
          }
          }
    });

  }

  function computerTurn() {
    $(".upper-text").html("Wait...");
    colorPattern.push(randomColor());
    updateCurrentCount();
    patternAnim();
  }

  function reset() {
    updateCurrentCount(0);
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

  function updateCurrentCount(k) {
    (k === 0 ? currentScore = 0 : currentScore = colorPattern.length);
    $(".count").html("Count: " + currentScore);
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
  $(".menu>.strict").on("click", function() {
    strict = !strict;
    strict ? $(this).html("Strict Mode: ON") : $(this).html("Strict Mode: OFF");

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
