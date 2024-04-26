document.getElementById("showInfo").style.display="none";

if(localStorage.getItem("sizeTbl") > 0) sizeTbl = localStorage.getItem("sizeTbl");
else sizeTbl = 3;

absKey = new Array(parseInt(sizeTbl) + 1).fill(0);
relKey = new Array(parseInt(sizeTbl) + 1).fill(0);
nameKey = new Array(parseInt(sizeTbl) + 1).fill(0);
for(var i = 1; i < parseInt(sizeTbl) + 1; i++) {
    nameKey[i] = "Taste " + i;
}

createTbl();