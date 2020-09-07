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
            if (checkHorizontalFour(idx, isplayer1)){
                return true
            }else if (checkVerticalFour(idx, isplayer1)){
                return true
            }else if (checkleftDiagFour(idx, isplayer1)){
                return true
            }else if (checkrightDiagFour(idx, isplayer1)){
                return true
            }else{
                isplayer1 = !isplayer1
            }
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
            return true
        }
    }
    return false
}

function checkVerticalFour(idx, isplayer1){
    var start = idx % 7
    for (var i = 0; i < 3; i++){
        if (buttons.eq(start + i * 7).css('background-color') == buttons.eq(start + (i+1) * 7).css('background-color') && buttons.eq(start + (i+1) * 7).css('background-color') == buttons.eq(start + (i+2) * 7).css('background-color') && buttons.eq(start + (i+2) * 7).css('background-color') == buttons.eq(start + (i+3) * 7).css('background-color') && buttons.eq(start + i * 7).css('background-color') != "rgb(239, 239, 239)"){
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
            return true
        }
    }
    return false
}

function checkleftDiagFour(idx, isplayer1){
    var invalidPos = [21, 28, 35, 29, 36, 37, 4,5,6,12,13,20]
    if (!invalidPos.includes(idx)){
        var col = idx % 7
        var row = Math.floor(idx / 7)
        var leftcol = col
        var leftrow = row
        var steps = 3
        while (leftcol > 0 && leftrow > 0 && steps > 0){
            leftcol --
            leftrow --
            steps --
        }
        var rightcol = col
        var rightrow = row
        steps = 4
        while (rightcol < 7 && rightrow < 6 && steps > 0){
            rightcol ++
            rightrow ++
            steps --
        }
        for (var i = 0; i < rightcol - leftcol - 3; i++){
            if (buttons.eq((leftrow+i)*7 + (leftcol + i)).css('background-color') == buttons.eq((leftrow+i+1)*7 + (leftcol + i+1)).css('background-color') && buttons.eq((leftrow+i+1)*7 + (leftcol + i+1)).css('background-color') == buttons.eq((leftrow+i+2)*7 + (leftcol + i+2)).css('background-color') && buttons.eq((leftrow+i+2)*7 + (leftcol + i+2)).css('background-color') == buttons.eq((leftrow+i+3)*7 + (leftcol + i+3)).css('background-color')){
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
                return true
            }
        }
        return false
    }
}

function checkrightDiagFour(idx, isplayer1){
    var invalidPos = [0,1,2,7,8,14,27,33,34,39,40,41]
    if (!invalidPos.includes(idx)){
        var col = idx % 7
        var row = Math.floor(idx / 7)
        var leftcol = col
        var leftrow = row
        var steps = 3
        while (leftcol > 0 && leftrow < 5 && steps > 0){
            leftcol --
            leftrow ++
            steps --
        }
        var rightcol = col
        var rightrow = row
        steps = 4
        while (rightcol < 7 && rightrow >= 0 && steps > 0){
            rightcol ++
            rightrow --
            steps --
        }
        for (var i = 0; i < rightcol - leftcol - 3; i++){
            if (buttons.eq((leftrow-i)*7 + (leftcol + i)).css('background-color') == buttons.eq((leftrow-i-1)*7 + (leftcol + i+1)).css('background-color') && buttons.eq((leftrow-i-1)*7 + (leftcol + i+1)).css('background-color') == buttons.eq((leftrow-i-2)*7 + (leftcol + i+2)).css('background-color') && buttons.eq((leftrow-i-2)*7 + (leftcol + i+2)).css('background-color') == buttons.eq((leftrow-i-3)*7 + (leftcol + i+3)).css('background-color')){
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
                return true
            }
        }
        return false
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
