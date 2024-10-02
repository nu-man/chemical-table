// JSON array of chemicals
const chemicals = [
    { id: 1, name: "Ammonium Persulfate", vendor: "LG Chem", density: 3525.92, viscosity: 60.63, packaging: "Bag", packSize: 100.00, unit: "kg", quantity: 6495.18 },
    { id: 2, name: "Caustic Potash", vendor: "Formosa", density: 3172.15, viscosity: 48.22, packaging: "Bag", packSize: 100.00, unit: "kg", quantity: 8751.90 },
    { id: 3, name: "Dimethylaminopropylamino", vendor: "LG Chem", density: 8435.37, viscosity: 12.62, packaging: "Barrel", packSize: 75.00, unit: "L", quantity: 5964.61 },
    { id: 4, name: "Mono Ammonium Phosphate", vendor: "Sinopec", density: 1597.65, viscosity: 76.51, packaging: "Bag", packSize: 105.00, unit: "kg", quantity: 8183.73 },
    { id: 5, name: "Ferric Nitrate", vendor: "DowDuPont", density: 364.04, viscosity: 14.90, packaging: "Bag", packSize: 105.00, unit: "kg", quantity: 4154.33 },
    { id: 6, name: "n-Pentane", vendor: "Sinopec", density: 4535.26, viscosity: 66.76, packaging: "Drum", packSize: 200.00, unit: "L", quantity: 6272.34 },
    { id: 7, name: "Glycol Ether PM", vendor: "LG Chem", density: 6495.18, viscosity: 72.12, packaging: "Bag", packSize: 250.00, unit: "kg", quantity: 8749.54 },
    { id: 8, name: "Sodium Hydroxide", vendor: "Sinopec", density: 1523.12, viscosity: 30.45, packaging: "Barrel", packSize: 200.00, unit: "L", quantity: 5145.12 },
    { id: 9, name: "Phosphoric Acid", vendor: "Formosa", density: 1982.52, viscosity: 58.32, packaging: "Bag", packSize: 110.00, unit: "kg", quantity: 9652.45 },
    { id: 10, name: "Sodium Bicarbonate", vendor: "LG Chem", density: 8532.47, viscosity: 12.15, packaging: "Bag", packSize: 50.00, unit: "kg", quantity: 7425.34 },
    { id: 11, name: "Ammonia", vendor: "Formosa", density: 8732.52, viscosity: 68.32, packaging: "Barrel", packSize: 150.00, unit: "L", quantity: 9452.32 },
    { id: 12, name: "Sulfuric Acid", vendor: "Sinopec", density: 6523.12, viscosity: 25.34, packaging: "Drum", packSize: 180.00, unit: "L", quantity: 8547.23 },
    { id: 13, name: "Hydrochloric Acid", vendor: "LG Chem", density: 9512.37, viscosity: 22.65, packaging: "Barrel", packSize: 75.00, unit: "L", quantity: 4627.18 },
    { id: 14, name: "Methanol", vendor: "DowDuPont", density: 2563.52, viscosity: 19.12, packaging: "Bag", packSize: 75.00, unit: "kg", quantity: 7854.12 },
    { id: 15, name: "Ethanol", vendor: "Formosa", density: 3523.17, viscosity: 60.32, packaging: "Barrel", packSize: 200.00, unit: "L", quantity: 9632.41 }
  ];
  
  
  

  // Load the initial data into the table
function loadTableData() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; // Clear existing rows
    chemicals.forEach((chemical) => {
        const row = document.createElement("tr");
        // Create and append cells for each property of the chemical
        Object.values(chemical).forEach((value) => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
}

// Call this function on page load
loadTableData();

let selectedRow = null;

// Add a new row with placeholder values
function addRow() {
    const tableBody = document.getElementById("tableBody");
    const newRow = tableBody.insertRow(); // Insert a new row at the end
    for (let i = 0; i < 9; i++) {
        const cell = newRow.insertCell(i);
        cell.textContent = "New"; // Placeholder text
    }
}

// Move the selected row up in the table
function moveRowUp() {
    if (selectedRow && selectedRow.previousElementSibling) {
        selectedRow.parentNode.insertBefore(selectedRow, selectedRow.previousElementSibling);
    }
}

// Move the selected row down in the table
function moveRowDown() {
    if (selectedRow && selectedRow.nextElementSibling) {
        selectedRow.parentNode.insertBefore(selectedRow.nextElementSibling, selectedRow);
    }
}

// Delete the selected row from the table
function deleteRow() {
    if (selectedRow) {
        selectedRow.remove();
        selectedRow = null; // Reset the selected row
    }
}

// Refresh the table data (reload from the original dataset)
function refreshTable() {
    loadTableData();
}

// Save the current table data to an array
function saveData() {
    const updatedData = Array.from(document.querySelectorAll("#chemicalTable tbody tr")).map(row => {
        return {
            id: row.cells[0].textContent,
            name: row.cells[1].textContent,
            vendor: row.cells[2].textContent,
            density: row.cells[3].textContent,
            viscosity: row.cells[4].textContent,
            packaging: row.cells[5].textContent,
            packSize: row.cells[6].textContent,
            unit: row.cells[7].textContent,
            quantity: row.cells[8].textContent
        };
    });
    console.log("Updated Data:", updatedData);
}

// Sort the table based on the clicked column index
function sortTable(columnIndex) {
    const tableBody = document.querySelector("#chemicalTable tbody");
    const rows = Array.from(tableBody.rows);

    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.toLowerCase();
        const cellB = rowB.cells[columnIndex].textContent.toLowerCase();
        return cellA.localeCompare(cellB); // Compare values directly
    });

    // Clear and re-populate the table with sorted rows
    tableBody.innerHTML = "";
    rows.forEach(row => tableBody.appendChild(row));
}

// Handle row selection and highlight it
document.querySelector("tbody").addEventListener("click", (event) => {
    const tr = event.target.closest("tr");
    if (tr) {
        if (selectedRow) selectedRow.classList.remove("selected");
        selectedRow = tr; // Update selected row
        selectedRow.classList.add("selected");
    }
});

// Make a cell editable on double-click
function editCell(cell) {
    cell.contentEditable = "true"; // Make cell editable
    cell.classList.add("edit-cell"); // Optional: add a class for styling

    // Save the cell content on blur
    cell.addEventListener("blur", () => {
        cell.contentEditable = "false"; // Make it non-editable again
    });
}

// Attach double-click event to make cells editable
document.querySelector("#chemicalTable tbody").addEventListener("dblclick", (event) => {
    const cell = event.target.closest("td");
    if (cell) {
        editCell(cell);
    }
});

// Attach event listener for adding rows
document.getElementById("addRowButton").addEventListener("click", addRow);

