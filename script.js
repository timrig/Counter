var sizeTbl;
var absKey;
var relKey;
var absSum = 0;
var nameKey;

function createTbl() {
    var table = document.getElementById("counterTbl");
    clearTbl(table.id);
    for(var i = 0; i <= 2; i++) {
        var row = table.insertRow(i);
        for(var j = 0; j <= parseInt(sizeTbl) + 1; j++) {
            var cell = row.insertCell(j);
            cell.classList.add("tdTbl");
            if(i == 0) {
                if(j == 0) cell.style = "background-color: darkgray;";
                else if(j > 0 && j <= sizeTbl) {
                    cell.style = "font-weight: bold; background-color: darkgray; color: white;";
                    cell.innerHTML = "Taste " + j;
                }
                else if(j == parseInt(sizeTbl) + 1) {
                    cell.style = "font-weight: bold; background-color: darkgray; color: white;";
                    cell.innerHTML = "Summe";
                }
            }
            else if(i > 0 && j == 0) {
                cell.style = "font-weight: bold; background-color: darkgray; color: white;";
                if(i == 1) cell.innerHTML = "Absolut";
                else if(i == 2) cell.innerHTML = "Relativ";
            }
            else if(i == 1 && j > 0) cell.innerHTML = "0";
            else if(i == 2 && j > 0) cell.innerHTML = "0&#037;";
        }
    }
}

function clearTbl(tbl) {
    var table = document.getElementById(tbl);
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
}

document.addEventListener("keydown", function(event) {
    if(event.key > 0 && event.key <= sizeTbl) countKey(event.key);
});

function countKey(key) {
    absKey[key]++;
    absSum++;
    for(var i = 1; i <= sizeTbl; i++) {
        relKey[i] = (absKey[i] * 100) / absSum;
    }
    writeKeys();
}

function writeKeys() {
    var table = document.getElementById("counterTbl");
    for(var i = 1; i <= 2; i++) {
        for(var j = 1; j <= parseInt(sizeTbl) + 1; j++) {
            if(i == 1) {
                if(j == parseInt(sizeTbl) + 1) {
                    table.rows[i].cells[j].innerHTML = absSum;
                }
                else table.rows[i].cells[j].innerHTML = absKey[j];
            }
            else if(i == 2) {
                if(j == parseInt(sizeTbl) + 1) table.rows[i].cells[j].innerHTML = "100&#037;";
                else table.rows[i].cells[j].innerHTML = relKey[j].toFixed(2) + "&#037;";
            }
        }
    }
    chart();
    if(absSum > 95 && absSum < 99) beep1();
    if(absSum == 99) beep2();
    if(absSum == 100) alert("Summe von 100 erreicht!");
}

function sizeSubmit() {
    sizeTbl = document.getElementById("sizeTbl").value;
    localStorage.setItem("sizeTbl", sizeTbl);
    if(sizeTbl <= 0) alert("Der Wert " + sizeTbl + " ist ungültig. Gib einen Wert zwischen 1 und 9 ein!");
    else {
        absKey = new Array(parseInt(sizeTbl) + 1).fill(0);
        relKey = new Array(parseInt(sizeTbl) + 1).fill(0);
        nameKey = new Array(parseInt(sizeTbl) + 1).fill(0);
        for(var i = 1; i < parseInt(sizeTbl) + 1; i++) {
            nameKey[i] = "Taste " + i;
        }
        absSum = 0;
        createTbl();
        resetChart();
    }
}

function beep1(){ 
    var audio = new Audio("https://audio-previews.elements.envatousercontent.com/files/177328289/preview.mp3"); 
    audio.play(); 
}
function beep2(){ 
    var audio = new Audio("https://orangefreesounds.com/wp-content/uploads/2023/04/Quick-beep-sound-effect.mp3"); 
    audio.play(); 
} 