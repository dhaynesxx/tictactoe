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
var gameCount = 0;
var gameTarget = 1;

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
    $('#start1Game').off().on('click', adviseStart);
    $('#start3Game').off().on('click', adviseStart3);
    $('#start5Game').off().on('click', adviseStart5);

};

var adviseStart = function () {
    $('#firstMove, #start-menu').addClass('hide');
    $('.game').removeClass('hide');
    $('.square').off('click').on('click', selectSquare);
    $('#numGames').text(gameCount);
};

var adviseStart3 = function () {
    adviseStart();
    $('.numWins').removeClass('hide');
    gameTarget = 3;
};

var adviseStart5 = function () {
    adviseStart();
    $('.numWins').removeClass('hide');
    gameTarget = 5;
};

var resetGame = function () {
        $('#namePlayer1').val('');  //removes player 1 name input
        $('#namePlayer2').val(''); //removes player 2 name input
        $('#player1').text('Player 1'); //removes player 1 name from side menu
        $('#player2').text('Player 2');
        $('#piece1, #piece2').css({'background-image': 'none', 'z-index':2}); //removes piece images from everywhere
        $('.begin-reset-start').text('Begin Game');  //makes reset button back to begin button
        $('img').remove('.selection');
        $('img').remove('.selection1');
        players.player1.wins = 0;
        players.player2.wins = 0;
        gameCount = 0;
        gameTarget = 1;
        resetBoard();
};

var resetBoard = function() {
        $('.square').addClass('unused');  //unused is checked for stalemate function
        $('.square').css({'background-image': 'none'}); //removes piece images from everywhere
        $('.box, .piece').removeClass('move');  //gets rid of class move
        $('body').css({'background-color': 'lightblue'});  // changes back from win css properties
        $('.square').removeClass('win');
        $('#piece1, #piece2').removeClass('multiWin');
        currentMove = 0;
        players.player1.moves = [];
        players.player2.moves = [];
        $('h1').text('Tic Tac Toe');
        gameCount += 1;
        $('#numGames').text(gameCount);
        $('#play1Wins').text(players.player1.wins);
        $('#play2Wins').text(players.player2.wins);
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
    }
    $('h1').text("It's a draw.");
    $('h1').css({'color':'white'});
    $('body').css({'background-color': 'darkblue'});
    $('.square').off('click');
    return true;
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

var testSquareUsed = function (square) {
    if ((square).hasClass('unused') === false) {              //check if cell is already selected
        alert('That square is already taken, please try again');
        return true;
    } return false;
};

var playerSquare = function(square) {
    (square).css({'background-image': 'url(' +pieces[currentMove.piece].src + ')', 'background-size': 'cover'});  //add image
    (square).removeClass('unused');  //so will then be found as already used next time pressed
    var cell = (square).attr('id');
    cell = cell.slice(cell.length-1);
    if (players.player1.name === currentMove.name) {
        players.player1.moves.push(cell);
    } else if (players.player2.name === currentMove.name) {
        players.player2.moves.push(cell);
    }
};

var win = function() {   // test if win, then what to do
    var result = winTest();
    if (result[0] === true) {
        var winner = currentMove.name;  //gets name of current player
        for (var i = 0; i < result[1].length; i++) {
                $('#pos' + result[1][i]).addClass('win');  //adds animation to cells that won
        }
        $('h1').text(currentMove.name + ' Wins!!!');
        if (players.player1.name === currentMove.name) {
            players.player1.wins +=1;
        } else if (players.player2.name === currentMove.name) {
            players.player2.wins +=1;
        }
        $('body').css({'background-color': 'lightgreen'});
        $('.square').off('click');
        return true;
    } return false;
};

var selectSquare = function() {
    var currentSquare = $(this);
    if (testSquareUsed(currentSquare) === true) {return;}
    playerSquare(currentSquare);
    if (win() === true) {
        testNumGames();
        return;
    }
    if (stalemate() === true) {
        testNumGames();
        return;
    }
    changePlayer();
};

var testNumGames = function() {
        $('#play1Wins').text(players.player1.wins);
        $('#play2Wins').text(players.player2.wins);
        $('#numGames').text(gameCount);
        if (gameCount === gameTarget && gameTarget > 1) {
                $('.begin-reset-start').text('Begin Game');
                if (players.player1.wins > players.player2.wins) {
                    $('h1').text(players.player1.name + ' Wins!!! ' +players.player1.wins+ " out of " +gameCount+ ' games.');
                    $('#piece1').css({'z-index': 3});
                    $('#piece1').addClass('multiWin');
                    $('.square').removeClass('win');
                    $('body').css({'background-color': "hotpink"});
                } else if (players.player2.wins > players.player1.wins) {
                    $('h1').text(players.player2.name + ' Wins!!! ' +players.player2.wins+ " out of " +gameCount+ ' games.');
                    $('#piece2').css({'z-index': 3});
                    $('#piece2').addClass('multiWin');
                    $('.square').removeClass('win');
                    $('body').css({'background-color': "hotpink"});
                } else if (players.player1.wins === players.player2.wins) {
                    $('h1').text('Its a Tie.');
                    $('body').css({'background-color': "darkblue"});
                }
        } else if ( gameTarget > 1) {
                $('.begin-reset-start').text('Start Next Game');
        } else {
            return;
        }
};







$(document).ready(function() {


$('.begin-reset-start').on('click', function() {
        var buttonType = $(this).text();
        if (buttonType === 'Begin Game') {
            resetGame();
            getPlayer1();
             $(this).text('Reset Game');
        } else if (buttonType === 'Reset Game') {
            resetGame();
        } else if (buttonType === 'Start Next Game') {
            resetBoard();
            $('.square').on('click', selectSquare);
            currentMove = whoGoesSecond();
            changePlayer();
            $(this).text('Reset Game');
        }
});




});
