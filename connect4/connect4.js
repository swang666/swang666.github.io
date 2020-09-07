var buttons = $('button').not('#rematch')
var score1 = 0
var score2 = 0

function setup(){
    $('h2#result').text("")
    var isplayer1 = true
    var playerColor = "rgb(255, 0, 0)"
    buttons.css('background-color', "rgb(239, 239, 239)")
    buttons.on('click', function(){
        if (isplayer1){
            playerColor = "rgb(255, 0, 0)"
        }else{
            playerColor = "rgb(0, 0, 255)"
        }
        var idx = buttons.index(this)
        idx = idx % 7
        idx = findEmptySpace(idx)
        if (idx >= 0){
            fillPlayerColor(idx, playerColor)
            checkHorizontalFour(idx, isplayer1)
            isplayer1 = !isplayer1
        }
    })
    $('button#rematch').on('click', function(){
        buttons.off()
        setup()
    })
}

function findEmptySpace(colidx){
    var lastrow = 35 + colidx
    while (buttons.eq(lastrow).css('background-color') != "rgb(239, 239, 239)"){
        lastrow -= 7
        if (lastrow < 0){
            break
        }
    }
    return lastrow
}

function fillPlayerColor(idx, playerColor){
    buttons.eq(idx).css('background-color', playerColor)
}

function checkHorizontalFour(idx, isplayer1){
    var m = idx % 7
    var left = Math.max(idx - m, idx - 3)
    var right = Math.min(idx + 7 - m, idx + 4)
    for (var i = left; i < right - 3; i++){
        if (buttons.eq(i).css('background-color') == buttons.eq(i+1).css('background-color') && buttons.eq(i+1).css('background-color') == buttons.eq(i+2).css('background-color') && buttons.eq(i+2).css('background-color') == buttons.eq(i+3).css('background-color')){
            if (isplayer1){
                $('h2#result').text(player1 + " won!")
                score1 += 1
                $('td#score1').text(score1)
            }else{
                $('h2#result').text(player2 + " won!")
                score2 += 1
                $('td#score2').text(score2)
            }
            buttons.off()
        }
    }
}

var player1 = prompt("Player 1 please enter your name")
var player2 = prompt("Player 2 please enter your name")
$('td#player1').text(player1 + ": ")
$('td#player2').text(player2 + ": ")
$('td#player1').css('color', 'red')
$('td#player2').css('color', 'blue')
$('td#score1').text(score1)
$('td#score2').text(score2)
setup()
