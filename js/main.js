/**
 * @file 
 * This file contains several classes and methods.
 *
 *  
 */


/**
 * @class Class to store the HSL values 
 * @type Object
 */
class ColorHSL {
    constructor(hue, saturation, lightness) {
        this.hue = 0;
        this.saturation = 0;
        this.lightness = 0;
        if (hue => 0 && hue <= 360) {
            this.hue = hue;
        }
        if (saturation => 0 && saturation <= 100) {
            this.saturation = saturation;
        }
        if (lightness => 0 && lightness <= 100) {
            this.lightness = lightness;
        }
    }
}

var colors = Array(); // declaration of the array colors to store the colors used

function init()
{
    var b1 = new ColorHSL(120, 89, 29); // Dark Goldenrod 4
    var b2 = new ColorHSL(170, 1, 17); // #2b2b2a
    var b3 = new ColorHSL(280, 80, 31); // #3a9010 
    colors.push(b1, b2, b3);
}

function gameLevel(level) {
    var out = Array();
    var color = "";
    switch (level) {
        case 1:
            {
                out = [2, 2];
                color = this.colors[0];
            }
            break;
        case 2:
            {
                out = [3, 3];
                color = this.colors[1];
            }
            break;
        case 3:
            {
                out = [4, 4];
                color = this.colors[2];
            }
            break;
        default:
        {
            out = [2, 2];
            color = this.colors[0];
        }
    }

    renderBoxes(out, color);
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function renderBoxes(out, color) {

    var rows, cols;
    rows = out[0];
    cols = out[1];
    var html = '<table id="tbl2">';
    var total = rows * cols;
    var r = getRandomInt(1, total);

    var rowsH = "";
    var id = 1;
    for (var i = 0; i < rows; i++) {


        for (var j = 0; j < cols; j++) {
            if (id === r) {
                rowsH += '<td class="tile" id="' + (id) + '" onclick="done(' + (id) +
                        ');"  style="background-color:hsl(' + color.hue + ',' +
                        (color.saturation) + '%,' +
                        ((color.lightness) - getRandomInt(-50, 50)) + '%);"><span class="button">&nbsp;</span> </td>';
            } else {

                rowsH += '<td class="tile" id="' + (id) + '" onclick="done(' + (id) + ');" style="background-color:hsl(' + color.hue + ',' + (color.saturation) + '%,' + (color.lightness) + '%);"> <span class="button">&nbsp;</span></td>';
            }
            id++;
        }
        html += '<tr id="row' + (i + 1) + '" class="row">' + rowsH + '</tr>';
        rowsH = "";
    }
    html += '</table>';
    $("#screen").html(html);
}

success = false; // global variable to store the success of each round;
init(); // initialization of the colors;

function done(id) {

    var found = true;
    var c = $("#" + id).css('backgroundColor');
    var res = false;
    var cd = splitColorToHSL(c);
    var els = document.getElementsByClassName("tile");
    for (var i = 0; i < els.length; i++) {
        if ((i + 1) !== id) {
            var el = els[i];
            var cel = el.style.backgroundColor;
            var celHSL = splitColorToHSL(cel);
            if (cd[0] === celHSL[0] && cd[1] === celHSL[1] && cd[2] === celHSL[2]) {
                found = false;
                break;
            }
        }
    }
    if (!found) {
        setMessage("<span class='error'>Game over</span>");
        this.currentLevel = 1;
        gameLevel(this.currentLevel);
        success = false;

    } else {
        gameEngine.LevelUp();
        success = true;
    }
    return res;
}

function clearResult() {
    $("#result").html("");
}
class GameEngine {

    constructor() {
        this.currentLevel = 1;
        this.maxLevel = 3;
    }

    StartGame() {

        gameLevel(this.currentLevel);
        setMessage("Game started");
    }

    LevelUp() {
        if (this.currentLevel < this.maxLevel) {
            this.currentLevel++;
            gameLevel(this.currentLevel);
            setMessage("Game resumes");
        } else if (this.currentLevel === 3 && success) {
            setMessage("You are winner");
            setTimeout("gameEngine.EndGame()", 4000);
        }
    }

    EndGame() {
        this.currentLevel = 1;

        setTimeout("$('#result').html('Start the game');", 2000);
        gameLevel(this.currentLevel);
    }

}


function splitColorToHSL(c) {
    var cd = c.substr(4, c.length - 5).split(", ");
    var cHSL = rgbToHsl(cd[0], cd[1], cd[2]);
    return cHSL;
}


var gameEngine = new GameEngine();

function setMessage(msg) {
    $("#result").html('<h3>' + msg + '</h3><div>Current level: ' + gameEngine.currentLevel + '</div>');

}

gameEngine.StartGame();
