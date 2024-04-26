var sizeTbl;
var absKey;
var relKey;
var absSum = 0;
var nameKey;
var timer = 0;
var checkReset = false;
var checkSum = false;

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
    if(event.key > 0 && event.key <= sizeTbl && checkReset == false && checkSum == false) countKey(event.key);
    if(event.key == "-") reset(event.key);
    if(event.key == 'Enter' && checkReset == true) reset(event.key);
    if(event.key == "End" && checkReset == true) reset(event.key);
    if(event.key == 'Enter' && checkSum == true) {
        showOffDiv();
        checkSum = false;
    }
    if(event.key == "End" && checkSum == true) showOffDiv();
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
    if(absSum == 100) {
        checkSum = true;
        beep();
        let text = "Summe von 100 erreicht! Möchtest du fortsetzen? (Enter = Ja | Ende = Nein)";
        showOnDiv(text);
    }
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

function reset(key){
    if(key == "-") {
        let text = "Möchtest du die Werte wirklich zurücksetzen? (Enter = Ja | Ende = Nein)";
        showOnDiv(text);
        timer = setInterval(function() {
            showOffDiv();
            checkReset = false;
            clearInterval(timer);
        }, 5000);
        checkReset = true;
    }
    if(key == "Enter") {
        clearInterval(timer);
        location.reload();
    }
    if(key == "End") {
        clearInterval(timer);
        showOffDiv();
        checkReset = false;
    }
}

function beep(){ 
    document.getElementById("audio").play();
}

function showOnDiv(text) {
    document.getElementById("showText").innerHTML = text;
    document.getElementById("showInfo").style.display = "block";
}

function showOffDiv() {
    document.getElementById("showInfo").style.display = "none";
}