if(localStorage.getItem("sizeTbl") > 0) sizeTbl = localStorage.getItem("sizeTbl");
else sizeTbl = 3;

absKey = new Array(parseInt(sizeTbl) + 1).fill(0);
relKey = new Array(parseInt(sizeTbl) + 1).fill(0);

createTbl();