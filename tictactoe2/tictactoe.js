var players =   {'player1':
                    {'name':'', 'piece':'', 'moves':[], 'wins':''},
                'player2':
                    {'name':'', 'piece':'', 'moves':[], 'wins':''}
                };

var pieces = {  'nought':
                {'name':'nought', 'src':'images/nought.png', 'class': '', 'id': 'nought'},
                'cross':
                {'name': 'cross', 'src': 'images/cross.png', 'class': '', 'id': 'cross'},
                'dog':
                {'name': 'dog', 'src': 'images/dog.png', 'class': '', 'id': 'dog'},
                'cat':
                {'name': 'cat', 'src': 'images/cat.png', 'class': '', 'id': 'cat'},
                'sun':
                {'name': 'sun', 'src': 'images/sun1.png', 'class': '', 'id': 'sun'},
                'moon':
                {'name': 'moon', 'src': 'images/moon.png', 'class': '', 'id': 'moon'},
                'bird':
                {'name': 'bird', 'src': 'images/bird.png', 'class': '', 'id': 'bird'},
                'ironman':
                {'name': 'ironman', 'src': 'images/ironman.png', 'class': '', 'id': 'ironman'},
                'scream':
                {'name': 'scream', 'src': 'images/scream.png', 'class': '', 'id': 'scream'}
};

var piecesArray = ['nought', 'cross', 'dog', 'cat', 'sun', 'moon', 'bird', 'ironman', 'scream'];

var winningCombos = ['123','456','789','147','258','369','159','357'];
var currentMove;

var getPiece = function () {
    var images = [];
    for (var i = 0; i < piecesArray.length; i++) {
        images.push( $('<img>', pieces[piecesArray[i]] ));
    }
    return images;
};

var getPlayer1 = function() {
    $('#start-menu, #player1Name').removeClass('hide');
    $('.game').addClass('hide');
    $('#player1NameOk').on('click', addPlayer1Name);
};

var addPlayer1Name = function() {
    players.player1.name = $('#namePlayer1').val();
    $('#player1').text(players.player1.name);
    $('#player1Name').addClass('hide');
    $('#player2Name').removeClass('hide');
    $('#player2NameOk').on('click', addPlayer2Name);
};

var addPlayer2Name = function (e) {
    // e.stopPropagation();
    // e.stopImmediatePropagation();
    $("img").remove(".selection, .selection1");
    players.player2.name = $('#namePlayer2').val();
    $('#player2').text(players.player2.name);
    $('#player2Name').addClass('hide');
    $('#choosePiece1').removeClass('hide');
    $('#choosePiece1').append( getPiece() );
    $('img').addClass('selection');
    $('.selection').on('click', addPlayer1Piece);
};

var addPlayer1Piece = function (e) {
    players.player1.piece = $(this).attr('id');
    $('#piece1').css({'background-image': 'url(' +pieces[players.player1.piece].src + ')', 'background-size': 'cover'});
    $('#choosePiece1').addClass('hide');
    $('#choosePiece2').removeClass('hide');
    $('#choosePiece2').append(getPiece());
    $('img').addClass('selection1');
    $('.selection').off('click');
    $('#' + players.player1.piece).remove(); //removes from 1st screen
    $('#' + players.player1.piece).remove(); // removes from 2nd screen
    $('.selection1').on('click', addPlayer2Piece);
};

var addPlayer2Piece = function (e) {
    players.player2.piece = $(this).attr('id');
    $('#piece2').css({'background-image': 'url(' +pieces[players.player2.piece].src + ')', 'background-size': 'cover'});
    currentMove = whoGoesSecond();
    changePlayer();
    $('#firstMovePlayer').text(currentMove.name);
    $('#choosePiece2').addClass('hide');
    $('#firstMove').removeClass('hide');
    $('#startGame').on('click', adviseStart);

};

var adviseStart = function () {
    $('#firstMove, #start-menu').addClass('hide');
    $('.game').removeClass('hide');
};

var resetGame = function () {
        $('.square').addClass('unused');  //unused is checked for stalemate function
        $('#namePlayer1').val('');  //removes player 1 name input
        $('#namePlayer2').val(''); //removes player 2 name input
        $('#player1').text('Player 1'); //removes player 1 name from side menu
        $('#player2').text('Player 2');
        $('#piece1, #piece2, .square').css({'background-image': 'none'}); //removes piece images from everywhere
        $('.begin-reset').text('Begin Game');  //makes reset button back to begin button
        $('.box, .piece').removeClass('move');  //gets rid of class move
        $('body').css({'background-color': 'lightblue'});  // changes back from win css properties
        $('.square').removeClass('win');
        $('img').remove('.selection');
        $('img').remove('.selection1');
        currentMove = 0;
        players.player1.moves = [];
        players.player2.moves = [];
        $('h1').text('Tic Tac Toe');
};


// random selector to pick starter
var whoGoesSecond = function() {
    var whoGoes = Math.random();
    if (whoGoes <= 0.5) {
        return players.player1;
    } else if (whoGoes > 0.5) {
        return players.player2;
    }
};



var winTest = function () {
    var result = [];
    var moves = currentMove.moves.sort().join('');
        for (var j = 0; j < winningCombos.length; j++) {
            var isWin = $(currentMove.moves).filter( winningCombos[j].split('') );
            if (isWin.length === 3 ) {
                result[0] =(true);
                result[1] = winningCombos[j];
                return  result;
            }
        }return false;
};

var stalemate = function () {
    var count = $('ul').children('li').length;
    for (var i = 0; i < count; i++) {
        var testSquare = $('.square')[i];
        if ($(testSquare).hasClass('unused') === true) {
            return false;
        }
    } return true;
};

var changePlayer = function() {
    if (currentMove === players.player1) {
        currentMove = players.player2;
        $('#player2, #piece2').addClass('move');
        $('#player1, #piece1').removeClass('move');
    } else if (currentMove === players.player2) {
        currentMove = players.player1;
        $('#player1, #piece1').addClass('move');
        $('#player2, #piece2').removeClass('move');
    }
};

var selectSquare = function() {
    if ($(this).hasClass('unused') !== true) {
        alert('That square is already taken, please try again');
        return;
    }
    $(this).css({'background-image': 'url(' +pieces[currentMove.piece].src + ')', 'background-size': 'cover'});
    $(this).removeClass('unused');
    var cell = $(this).attr('id');
    cell = cell.slice(cell.length-1);
    if (players.player1.name === currentMove.name) {
        players.player1.moves.push(cell);
    } else if (players.player2.name === currentMove.name) {
        players.player2.moves.push(cell);
    }
    var result = winTest();
    if (result[0] === true) {
        var winner = currentMove.name;
        for (var i = 0; i < result[1].length; i++) {
                $('#pos' + result[1][i]).addClass('win');
        }
        $('h1').text(currentMove.name + ' Wins!!!');
        $('body').css({'background-color': 'lightgreen'});
        $('.square').off('click');
        return;
    } else if (stalemate() === true) {
        alert("There was no winner, try again.");
        resetGame();
        return;
    }
    changePlayer();
};

var playNumGames = function(num) {
        
};







$(document).ready(function() {


$('.begin-reset').on('click', function() {
        var buttonType = $(this).text();
        if (buttonType === 'Begin Game') {
            $('.square').on('click', selectSquare);
            resetGame();
            getPlayer1();
             $(this).text('Reset Game');
        } else if (buttonType === 'Reset Game') {
            resetGame();
        }
});




});
