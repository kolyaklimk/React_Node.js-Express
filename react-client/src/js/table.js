const table = document.getElementById("table");
const transposeButton = document.getElementById("transpose");
const limitInput = document.getElementById("limit");
const addRowButton = document.getElementById("addRow");
const addColumnButton = document.getElementById("addColumn");
const deleteRowButton = document.getElementById("deleteRow");
const deleteColumnButton = document.getElementById("deleteColumn");

let numRows = 0;
let numCols = 0;
let limit = 0;
let selectedInColumnCount = {};

function generateTable() {
for(key in selectedInColumnCount) {
    delete selectedInColumnCount[key];
}
    selectedInColumnCount = {};
    table.innerHTML = "";

    for (let i = 0; i < numRows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < numCols; j++) {
            const cell = document.createElement("td");
            cell.textContent = Math.floor(Math.random() * 10);
            cell.addEventListener("click", toggleCellSelection);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}


function transposeTable() {
    const cells = Array.from(table.querySelectorAll("tr"));
    table.innerHTML = "";

    const transposed = [];
    for (let j = 0; j < numCols; j++) {
        const row = document.createElement("tr");
        for (let i = 0; i < numRows; i++) {
            const cell = cells[i].children[j].cloneNode(true);
            row.appendChild(cell);
        }
        transposed.push(row);
    }
    table.append(...transposed);

    [numRows, numCols] = [numCols, numRows];
}


function toggleCellSelection(event) {
    const cell = event.target;
    console.log(selectedInColumnCount[cell.cellIndex])
    if (cell.classList.contains("selected")) {
        cell.classList.remove("selected");
        cell.style.backgroundColor = "transparent";
        selectedInColumnCount[cell.cellIndex]--;
    } else {
        const columnIndex = cell.cellIndex;
        selectedInColumnCount[columnIndex] = (selectedInColumnCount[columnIndex] || 0) + 1;
        if (selectedInColumnCount[columnIndex] > limit) {
            cell.classList.remove("selected");
            cell.style.backgroundColor = "transparent";
            selectedInColumnCount[columnIndex]--;
        }
        else if (isIsolated(cell)) {
            cell.classList.add("selected");
            const cellValue = parseInt(cell.textContent);
            if (cellValue % 2 === 0) {
                cell.style.backgroundColor = "lightblue";
            } else {
                cell.style.backgroundColor = "lightgreen";
            }
        }
    }
}

function isIsolated(cell) {
    const row = cell.parentElement;
    const cells = Array.from(row.children);
    const index = cells.indexOf(cell);
    if (index > 0 && cells[index - 1].classList.contains("selected")) {
        return false;
    }
    if (index < cells.length - 1 && cells[index + 1].classList.contains("selected")) {
        return false;
    }
    return true;
}

function addRow() {
    numRows++;
    generateTable();
}

function addColumn() {
    numCols++;
    generateTable();
}

function deleteRow() {
if(numRows > 1){
    numRows--;
    generateTable();
    }
}

function deleteColumn() {
if(numCols > 1){
    numCols--;
    generateTable();
    }
}

transposeButton.addEventListener("click", transposeTable);
limitInput.addEventListener("input", (event) => {
    limit = parseInt(event.target.value) ;
});
addRowButton.addEventListener("click", addRow);
addColumnButton.addEventListener("click", addColumn);
deleteRowButton.addEventListener("click", deleteRow);
deleteColumnButton.addEventListener("click", deleteColumn);

generateTable();
