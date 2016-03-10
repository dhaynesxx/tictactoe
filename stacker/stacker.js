var column = 0;
var direction = 1;
var row = 11;
var time = 500;
var timeChange = 25;
var pieces = 3;
var result = '';

var resetGame = function () {
        $('.cell').removeClass('active you win lose');
        column = 0;
        direction = 1;
        row = 11;
        time = 600;
        pieces = 3;
        result = '';
        $('.start').text('Start');
        $('.start').off('click');
        $('.start').on('click', firstStart);
        window.clearInterval(movingpiece);

};

var playThreePiece = function () {
        if (column > 1) {
                var z = column - direction - direction;
                $('#pos' + row + z).removeClass('active');
        }
        column += direction;
        $('#pos' + row + column).addClass('active');
        if (column === 1) {
          direction = 1;
          if ($('#pos' + row + '1').hasClass('active') === true && $('#pos' + row + '2').hasClass('active') && $('#pos' + row + '3').hasClass('active')) {
                  column = 3;
          }
  } else if (column === 7) {
          direction = -1;
          column = 5;
        }
};


var playTwoPiece = function () {
        if (column > 1) {
                var z = column - direction;
                $('#pos' + row + z).removeClass('active');
        }
        column += direction;
        $('#pos' + row + column).addClass('active');
        if (column === 1) {
          direction = 1;
          if ($('#pos' + row + '1').hasClass('active') === true && $('#pos' + row + '2').hasClass('active')) {
                  column = 2;
          }
        } else if (column === 7) {
          direction = -1;
          column = 6;
        }
};

var playOnePiece = function () {
        if (column > 0) {
                $('#pos' + row + column).removeClass('active');
        }
        column += direction;
        $('#pos' + row + column).addClass('active');
        if (column === 1) {
          direction = 1;
        } else if (column === 7) {
          direction = -1;
        }
};

var testMove = function () {
        var testRow = row - 1;
        var prevRow = row - 2;
        for (var i = 1; i <= 7; i++) {
                if ($('#pos' + testRow + i).hasClass('active') === true && $('#pos' + prevRow + i).hasClass('active') === false) {
                      $('#pos' + testRow + i).removeClass('active');
                      pieces -= 1;
                }
        } if (row === 29 && pieces > 0 ) {
                result = 'win';
                endGame();
                return false;
        } return true;
};

var testCurrentPieces = function () {
        if ( pieces === 3 ) {
                movingpiece = window.setInterval(playThreePiece, time);
        } else if ( pieces === 2 ) {
                movingpiece = window.setInterval(playTwoPiece, time);
        } else if ( pieces === 1 ) {
                movingpiece = window.setInterval(playOnePiece, time);
        } else if ( pieces === 0 ) {
                result = 'lose';
                endGame();
        }
};

var changeRow = function(event) {
        $('.start').blur();
        if (event.keyCode === 32) {
            window.clearInterval(movingpiece);
            row += 1;
            time -= timeChange;
            column = 0;
            direction = 1;
            if (row > 12) {
              if (testMove() === false) {
                return;
              }
            }
            testCurrentPieces();
        }
};

var playThree = function() {
        movingpiece = window.setInterval(playThreePiece, time);
};

var playTwo = function() {
        movingpiece = window.setInterval(playTwoPiece, time);
};

var playOne = function() {
        movingpiece = window.setInterval(playOnePiece, time);
};

var firstStart = function() {
        $('.start').off('click');
        $('.start').text('Reset');
        $('.start').on('click', resetGame);
        $(window).on('keypress', changeRow);
        playThree();
};

$(document).ready(function() {
        $('.start').on('click', firstStart);
});

var endAnimate = function () {
    if (row === 10) {
      window.clearInterval(timerID);
      upActive();
      return;
    }
    $('.row' + row).removeClass('active');
    row--;
};

var endGame = function() {
        $(window).off('keypress');
        timerID = window.setInterval(endAnimate, 100);
};

var upAnimate = function () {
    if (row === 29) {
      window.clearInterval(timerID);
      window.setTimeout(youGraphic, 500);
      window.setTimeout(allActive, 1500);
      if (result === 'win') {
          window.setTimeout(winGraphic, 1501);
      } else if (result === 'lose') {
          window.setTimeout(loseGraphic, 1501);
      }
      return;
    }
    $('.row' + row).addClass('active');
    row += 1;
};

var upActive = function() {
        timerID = window.setInterval(upAnimate, 100);
};

var youGraphic = function () {
      $('#pos282, #pos286, #pos272, #pos276, #pos263, #pos265, #pos254, #pos244, #pos222, #pos223, #pos224, #pos225, #pos226, #pos212, #pos216, #pos202, #pos206, #pos192, #pos196, #pos182, #pos183, #pos184, #pos185, #pos186, #pos162, #pos166, #pos152, #pos156, #pos142, #pos146, #pos132, #pos136, #pos123, #pos124, #pos125').removeClass('active');
      $('#pos282, #pos286, #pos272, #pos276, #pos263, #pos265, #pos254, #pos244, #pos222, #pos223, #pos224, #pos225, #pos226, #pos212, #pos216, #pos202, #pos206, #pos192, #pos196, #pos182, #pos183, #pos184, #pos185, #pos186, #pos162, #pos166, #pos152, #pos156, #pos142, #pos146, #pos132, #pos136, #pos123, #pos124, #pos125').addClass('you');
};

var winGraphic = function () {
      $('#pos282, #pos286, #pos272, #pos276, #pos262, #pos264, #pos266, #pos252, #pos253, #pos255, #pos256, #pos242, #pos246, #pos223, #pos224, #pos225, #pos214, #pos204, #pos194, #pos183, #pos184, #pos185, #pos162, #pos166, #pos152, #pos153, #pos156, #pos142, #pos144, #pos146, #pos132, #pos135, #pos136, #pos122, #pos126').removeClass('active');
      $('#pos282, #pos286, #pos272, #pos276, #pos262, #pos264, #pos266, #pos252, #pos253, #pos255, #pos256, #pos242, #pos246, #pos223, #pos224, #pos225, #pos214, #pos204, #pos194, #pos183, #pos184, #pos185, #pos162, #pos166, #pos152, #pos153, #pos156, #pos142, #pos144, #pos146, #pos132, #pos135, #pos136, #pos122, #pos126').addClass('win');
};

var loseGraphic = function () {
      $('#pos281, #pos271, #pos261, #pos251, #pos241, #pos242, #pos243, #pos221, #pos222, #pos223, #pos211, #pos213, #pos215, #pos216, #pos217, #pos201, #pos203, #pos205, #pos191, #pos193, #pos195, #pos196, #pos197, #pos181, #pos182, #pos183, #pos187, #pos175, #pos176, #pos177, #pos155, #pos156, #pos157, #pos145, #pos135, #pos136, #pos125, #pos115, #pos116, #pos117').removeClass('active');
      $('#pos281, #pos271, #pos261, #pos251, #pos241, #pos242, #pos243, #pos221, #pos222, #pos223, #pos211, #pos213, #pos215, #pos216, #pos217, #pos201, #pos203, #pos205, #pos191, #pos193, #pos195, #pos196, #pos197, #pos181, #pos182, #pos183, #pos187, #pos175, #pos176, #pos177, #pos155, #pos156, #pos157, #pos145, #pos135, #pos136, #pos125, #pos115, #pos116, #pos117').addClass('lose');
};

var allActive = function () {
      $('.cell').addClass('active');
      $('.cell').removeClass('you win lose');
};
