// defaults
var column = 0;
var direction = 1;
var row = 11;
var time = 600;
var timeChange = 30;
var pieces = 3;
var result = 'incomplete';
var level = 1;

var level1 = function () {
  column = 0;
  direction = 1;
  row = 11;
  time = 600;
  timeChange = 30;
  pieces = 3;
  result = 'incomplete';
};

var level2 = function () {
  column = 0;
  direction = 1;
  row = 11;
  time = 490;
  timeChange = 25;
  pieces = 3;
  result = 'incomplete';
};

var level3 = function () {
  column = 0;
  direction = 1;
  row = 11;
  time = 380;
  timeChange = 20;
  pieces = 3;
  result = 'incomplete';
};

var level4 = function () {
  column = 0;
  direction = 1;
  row = 11;
  time = 280;
  timeChange = 15;
  pieces = 3;
  result = 'incomplete';
};

var level5 = function () {
  column = 0;
  direction = 1;
  row = 11;
  time = 185;
  timeChange = 10;
  pieces = 3;
  result = 'incomplete';
};


var resetGame = function () {
        resetBoard();
        $('.start').text('Start');
        $('.start').off('click');
        $('.start').on('click', firstStart);
        window.clearInterval(movingpiece);
        $(window).off('keypress');
};

var resetBoard = function () {
          $('.cell').removeClass('active you win lose level number1 number2 number3 number4 number5');
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
        upActive(); ///
        window.setTimeout(levelGraphic, 2000);
        window.setTimeout(allActive, 3000);
        window.setTimeout(number1, 3001);
        window.setTimeout(resetBoard, 4000);
        window.setTimeout(level1, 4001);
        window.setTimeout(playThree, 4100);
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

var progress = function () {
  if ( result === 'incomplete') {
        return;
  } else if (result !== 'incomplete') {
        window.clearInterval(timerID);
        window.setTimeout(youGraphic, 500);
        window.setTimeout(allActive, 1500);
        if (result === 'win' && level === 2) {
            window.setTimeout(winGraphic, 1501);
            window.setTimeout(allActive, 2500);
            window.setTimeout(levelGraphic, 2501);
            window.setTimeout(level2, 2501);
        } else if (result === 'win' && level === 3) {
            window.setTimeout(winGraphic, 1501);
            window.setTimeout(allActive, 2500);
            window.setTimeout(levelGraphic, 2501);
            window.setTimeout(level3, 2501);
        } else if (result === 'win' && level === 4) {
            window.setTimeout(winGraphic, 1501);
            window.setTimeout(allActive, 2500);
            window.setTimeout(levelGraphic, 2501);
            window.setTimeout(level4, 2501);
        } else if (result === 'win' && level === 5) {
            window.setTimeout(winGraphic, 1501);
            window.setTimeout(allActive, 2500);
            window.setTimeout(levelGraphic, 2501);
            window.setTimeout(level5, 2501);
        } else if (result === 'win' && level === 6) {
            window.setTimeout(winGraphic, 1501);
        } else if (result === 'lose') {
            window.setTimeout(loseGraphic, 1501);
        }
        return;   //what is the purpose of this???????
    }
};


var upAnimate = function () {
    if (row === 29) {
        // level += 1;
        // progress();
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

var number1 = function () {
      $('#pos274, #pos263, #pos264, #pos252, #pos253, #pos254, #pos244, #pos234, #pos224, #pos214, #pos204, #pos194, #pos184, #pos174, #pos164, #pos154, #pos142, #pos143, #pos144, #pos145, #pos146').removeClass('active');
};

var number2 = function () {
      $('#pos274, #pos275, #pos263, #pos264, #pos265, #pos266, #pos252, #pos253, #pos256, #pos257, #pos242, #pos247, #pos237, #pos226, #pos227, #pos215, #pos216, #pos204, #pos205, #pos193, #pos194, #pos182, #pos183, #pos172, #pos162, #pos152, #pos142, #pos143, #pos144, #pos145, #pos146, #pos147').removeClass('active');
};

var number3 = function () {
      $('#pos274, #pos275, #pos263, #pos264, #pos265, #pos266, #pos252, #pos253, #pos256, #pos257, #pos242, #pos247, #pos236, #pos237, #pos225, #pos226, #pos214, #pos215, #pos204, #pos205, #pos195, #pos196, #pos186, #pos187, #pos177, #pos162, #pos166, #pos167, #pos152, #pos153, #pos154, #pos155, #pos156, #pos143, #pos144, #pos145').removeClass('active');
};

var number4 = function () {
      $('#pos275, #pos276, #pos265, #pos266, #pos254, #pos256, #pos244, #pos246, #pos233, #pos236, #pos223, #pos226, #pos212, #pos216, #pos202, #pos203, #pos204, #pos205, #pos206, #pos207, #pos196, #pos186, #pos176, #pos166, #pos156, #pos146').removeClass('active');
};

var number5 = function () {
      $('#pos272, #pos273, #pos274, #pos275, #pos276, #pos262, #pos263, #pos264, #pos265, #pos266, #pos252, #pos242, #pos232, #pos222, #pos224, #pos225, #pos212, #pos213, #pos214, #pos215, #pos216, #pos202, #pos203, #pos206, #pos207, #pos197, #pos187, #pos177, #pos162, #pos166, #pos167, #pos152, #pos153, #pos154, #pos155, #pos156, #pos143, #pos144, #pos145').removeClass('active');
};

var levelGraphic = function () {
  $('#pos282, #pos272, #pos262, #pos252, #pos242, #pos243, #pos244, #pos245, #pos222, #pos226, #pos212, #pos216, #pos203, #pos205, #pos193, #pos195, #pos184, #pos174, #pos162, #pos152, #pos142, #pos132, #pos122, #pos123, #pos124, #pos125').removeClass('active');
};

var allActive = function () {
      $('.cell').addClass('active');
      $('.cell').removeClass('you win lose');
};
