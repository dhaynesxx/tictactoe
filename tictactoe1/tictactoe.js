var player1 = ['name', 'piece'];
var player2 = ['name', 'piece'];
var pieces = ["0","X"];
var pieceClass = ['.nought', '.cross'];
var currentMove;

//get player names, select pieces
var beginGame = function() {
    player1[0] = prompt('Player 1, please enter your name');
    $('#player1').text(player1[0]);
    player2[0] = prompt('Player 2, please enter your name');
    $('#player2').text(player2[0]);
    var whoGoesFirst = Math.random();
if (whoGoesFirst <= 0.5) {
        var selections1 = selectPiece(player1[0], player2[0]);
        player1[1] = selections1[0];
        player2[1] = selections1[1];
        currentMove = player1;
        $('#player1').addClass('move');
        $('#piece1').addClass('move');
} else if (whoGoesFirst > 0.5) {
        var selections2 = selectPiece(player2[0], player1[0]);
        player1[1] = selections2[1];
        player2[1] = selections2[0];
        currentMove = player2;
        $('#player2').addClass('move');
        $('#piece2').addClass('move');
}
if (player1[1] === "X") {
    $('#piece1').addClass('cross');
    $('#piece2').addClass('nought');
} else if (player1[1] === "0") {
    $('#piece2').addClass('cross');
    $('#piece1').addClass('nought');
}
};


//function that can return a piece selecion for both players
var selectPiece = function(player, playerAlt) {
    var playerPieces = [];
    var playerPiece = prompt(player +', please enter ' + pieces[0] + ' or ' + pieces[1]);
    if (playerPiece === pieces[0]) {
        playerAltPiece = pieces[1];
    } else if (playerPiece === pieces[1]) {
        playerAltPiece = pieces[0];
    } else {
        alert (player + ', you have made an incorrect selection, please try again');
    }
    alert(player + ", you are " + playerPiece + '. ' + playerAlt + ", you are " + playerAltPiece);
    alert(player + ", it is your move. ");
    playerPieces.push(playerPiece);
    playerPieces.push(playerAltPiece);
    return playerPieces;
};



// get move and assign to board;
var assignMove = function (playerPiece, cell) {
        if (playerPiece === pieces[0]) {
            $('#' + cell).addClass('nought');
        } else if (playerPiece === pieces[1]) {
            $('#' + cell).addClass('cross');
        }
};

//test if won horizontally
var rowWin = function() {
        if ( $('#pos1').attr('class') === $('#pos2').attr('class') && $('#pos1').attr('class') === $('#pos3').attr('class') && $('#pos1').attr('class') !== 'square' ) {
            $('#pos1, #pos2, #pos3').addClass('win');
            return true;
        } else if ( $('#pos4').attr('class') === $('#pos5').attr('class') && $('#pos4').attr('class') === $('#pos6').attr('class') && $('#pos4').attr('class') !== 'square') {
            $('#pos4, #pos5, #pos6').addClass('win');
            return true;
        } else if ( $('#pos7').attr('class') === $('#pos8').attr('class') && $('#pos7').attr('class') === $('#pos9').attr('class') && $('#pos7').attr('class') !== 'square') {
            $('#pos7, #pos8, #pos9').addClass('win');
            return true;
        } else {
            return false;
        }
};

//test if won vertically
var columnWin = function() {
        if ( $('#pos1').attr('class') === $('#pos4').attr('class') && $('#pos1').attr('class') === $('#pos7').attr('class') && $('#pos1').attr('class') !== 'square') {
            $('#pos1, #pos4, #pos7').addClass('win');
            return true;
        } else if ( $('#pos2').attr('class') === $('#pos5').attr('class') && $('#pos2').attr('class') === $('#pos8').attr('class') && $('#pos2').attr('class') !== 'square') {
            $('#pos2, #pos5, #pos8').addClass('win');
            return true;
        } else if ( $('#pos3').attr('class') === $('#pos6').attr('class') && $('#pos3').attr('class') === $('#pos9').attr('class') && $('#pos3').attr('class') !== 'square' ) {
            $('#pos3, #pos6, #pos9').addClass('win');
            return true;
        } else {
            return false;
        }
};

//test if won diagonaly
var diagonalWin = function() {
        if ( $('#pos1').attr('class') === $('#pos5').attr('class') && $('#pos1').attr('class') === $('#pos9').attr('class') && $('#pos1').attr('class') !== 'square' ) {
            $('#pos1, #pos5, #pos9').addClass('win');
            return true;
        } else if ( $('#pos3').attr('class') === $('#pos5').attr('class') && $('#pos3').attr('class') === $('#pos7').attr('class') && $('#pos3').attr('class') !== 'square') {
            $('#pos3, #pos5, #pos7').addClass('win');
            return true;
        }  else {
            return false;
        }
};

//test all for the win
var testWin = function() {
    var row = rowWin();
    var column = columnWin();
    var diagonal = diagonalWin();
    return row || column || diagonal;
};

var stalemate = function () {
    var stale = 0;
    for (var i = 0; i < 9; i++) {
        var testSquare = $('.square')[i];
        if ($(testSquare).attr('class') === "square cross") {
            stale++;
        } else if ($(testSquare).attr('class') === "square nought") {
            stale++;
        }
    } if (stale === 9) {
        return true;
    }  else {
        return false;
    }
};

var changePlayer = function() {
    if (currentMove === player1) {
        currentMove = player2;
        $('#player2').addClass('move');
        $('#player1').removeClass('move');
        $('#piece2').addClass('move');
        $('#piece1').removeClass('move');
    } else if (currentMove === player2) {
        currentMove = player1;
        $('#player1').addClass('move');
        $('#player2').removeClass('move');
        $('#piece1').addClass('move');
        $('#piece2').removeClass('move');
    }
};

$(document).ready(function() {

$('.square').on('click', function() {
        var pos = $(this).attr('id');
        var piece = currentMove[1];
        if ($(this).attr('class').length > 6) {
            alert('That square is already taken, please try again');
            return;
        }
        assignMove(piece, pos);
        if (testWin()) {
            var winner = currentMove[0];
            //$('#' + winner).addClass('win');
            alert (winner + ' Wins!!!');
            resetGame();
            return;
        } else if (stalemate()) {
            alert("There was no winner, try again.");
            resetGame();
            return;
        }
        changePlayer();
});

$('.begin-reset').on('click', function() {
        var buttonType = $(this).text();
        if (buttonType === 'Begin Game') {
            beginGame();
             $(this).text('Reset Game');
        } else if (buttonType === 'Reset Game') {
            resetGame();
        }
});

$('#player1NameOk').on('click', function() {

});

var resetGame = function () {
        $('.square, #piece1, #piece2').removeClass('nought cross win');
        $('#player1').text('Player 1');
        $('#player2').text('Player 2');
        $('.begin-reset').text('Begin Game');
        $('.box, .piece').removeClass('move');
};


});
