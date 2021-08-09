
let currentColor = "blue";
const firstRow = document.querySelector(".firstRow");
const h1 = document.querySelector("h1");
h1.style.color = `${currentColor}`;
let table = [
    { "nextSpot": 7.1, 1.1: "free", 1.2: "free", 1.3: "free", 1.4: "free", 1.5: "free", 1.6: "free", 1.7: "free" },
    { "nextSpot": 7.2, 2.1: "free", 2.2: "free", 2.3: "free", 2.4: "free", 2.5: "free", 2.6: "free", 2.7: "free" },
    { "nextSpot": 7.3, 3.1: "free", 3.2: "free", 3.3: "free", 3.4: "free", 3.5: "free", 3.6: "free", 3.7: "free" },
    { "nextSpot": 7.4, 4.1: "free", 4.2: "free", 4.3: "free", 4.4: "free", 4.5: "free", 4.6: "free", 4.7: "free" },
    { "nextSpot": 7.5, 5.1: "free", 5.2: "free", 5.3: "free", 5.4: "free", 5.5: "free", 5.6: "free", 5.7: "free" },
    { "nextSpot": 7.6, 6.1: "free", 6.2: "free", 6.3: "free", 6.4: "free", 6.5: "free", 6.6: "free", 6.7: "free" },
    { "nextSpot": 7.7, 7.1: "free", 7.2: "free", 7.3: "free", 7.4: "free", 7.5: "free", 7.6: "free", 7.7: "free" }
]

firstRow.addEventListener("click", function (event) {

    let column = +event.target.id[2]; //[Number] Extract wich column the user picked, in the first Row 
    let currentSpot = (table[column - 1]["nextSpot"]).toFixed(1); //[string] Determine where the program is going to set the piece
    stopIfColumnFull(currentSpot);
    let row = (+(currentSpot)[0]); //[Number]
    table[row - 1][currentSpot] = currentColor; //Update the information in table
    document.getElementById(`${currentSpot}`).style.backgroundColor = currentColor; //locate the current square in the DOM and 
    //apply corresponding color

    for (let obj of table) { //Iterate through the table array and test every square to check for a win
        for (square in obj) {
            if (square !== "nextSpot") {
                console.log(`Testing for spot ${square}: ${obj[square]}`);
                let testRow = +square[0]
                fourInRow(square, testRow);
                try { fourInColumn(square, testRow); }
                catch (e) { };
                try { fourInDiagDown(square, testRow); }
                catch (e) { };
                try { fourInDiagUp(square, testRow); }
                catch (e) { }
            }

        }
    }
    table[column - 1]["nextSpot"]--;
    changeCurrentColor(currentColor);
    h1.style.color = `${currentColor}`;

});

// **************FUNCTIONS************//

let stopIfColumnFull = (currentSpot) => {
    if (currentSpot < 2) {
        throw "Column is full"
    }
}
let changeCurrentColor = () => {
    if (currentColor === "blue") {
        currentColor = "red";
    }
    else {
        currentColor = "blue";
    }
}
let fourInRow = (currentSpot, row) => {
    if (table[row - 1][currentSpot] !== "free") {
        if (table[row - 1][currentSpot] === table[row - 1][(+currentSpot + .1).toFixed(1)] &&
            table[row - 1][(+currentSpot + .2).toFixed(1)] === table[row - 1][(+currentSpot + .3).toFixed(1)] &&
            table[row - 1][(+currentSpot + .2).toFixed(1)] === table[row - 1][currentSpot]) {
            gameOver(currentColor);
        }
    }
}
let fourInColumn = (currentSpot, row) => {
    if (table[row - 1][currentSpot] !== "free") {
        if (table[row - 1][currentSpot] === table[row][(+currentSpot + 1).toFixed(1)] &&
            table[row + 1][(+currentSpot + 2).toFixed(1)] === table[row + 2][(+currentSpot + 3).toFixed(1)] &&
            table[row + 1][(+currentSpot + 2).toFixed(1)] === table[row - 1][currentSpot]) {
            gameOver(currentColor);
        }
    }

}
let fourInDiagDown = (currentSpot, row) => {
    if (table[row - 1][currentSpot] !== "free") {
        if (table[row - 1][currentSpot] === table[row][(+currentSpot + 1.1).toFixed(1)] &&
            table[row + 1][(+currentSpot + 2.2).toFixed(1)] === table[row + 2][(+currentSpot + 3.3).toFixed(1)] &&
            table[row + 1][(+currentSpot + 2.2).toFixed(1)] === table[row - 1][currentSpot]) {
            gameOver(currentColor);
        }
    }

}
let fourInDiagUp = (currentSpot, row) => {
    if (table[row - 1][currentSpot] !== "free") {
        if (table[row - 1][currentSpot] === table[row - 2][(+currentSpot - 0.9).toFixed(1)] &&
            table[row - 3][(+currentSpot - 1.8).toFixed(1)] === table[row - 4][(+currentSpot - 2.7).toFixed(1)] &&
            table[row - 3][(+currentSpot - 1.8).toFixed(1)] === table[row - 1][currentSpot]) {
            gameOver(currentColor);
        }
    }

}
function gameOver(currentColor) {
    setTimeout(() => {
        alert(`${currentColor} Wins!!`)
    }, 1000);
}