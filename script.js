===============================
// GOOGLE SHEET CONFIGURATION
// ===============================

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/12yHqIhFQZyEwYJlmBfscDmaXZpp2lXQK/gviz/tq?tqx=out:csv&gid=752590382";


// ===============================
// LOAD GOOGLE SHEET DATA
// ===============================

async function loadData() {
    try {

        const response = await fetch(SHEET_URL);

        if (!response.ok) {
            throw new Error("Unable to load Google Sheet");
        }

        const csvText = await response.text();

        const rows = parseCSV(csvText);

        console.log("Google Sheet Data:", rows);

        displayDashboard(rows);

    } catch (error) {

        console.error("Error:", error);

        document.getElementById("status").innerText =
            "Unable to load data from Google Sheet.";

    }
}


// ===============================
// SIMPLE CSV PARSER
// ===============================

function parseCSV(text) {

    const lines = text.trim().split("\n");

    return lines.map(line => {

        return line.split(",").map(cell =>
            cell.replace(/^"|"$/g, "").trim()
        );

    });

}


// ===============================
// DISPLAY DASHBOARD
// ===============================

function displayDashboard(rows) {

    if (rows.length <= 1) {
        document.getElementById("status").innerText =
            "No data found.";
        return;
    }

    // Remove header row
    const data = rows.slice(1);

    // Column positions
    // A = Sl
    // B = Date
    // C = Category
    // D = Item Name
    // E = Quantity
    // F = Unit
    // G = Unit Cost
    // H = Total Cost

    let totalPurchase = 0;

    data.forEach(row => {

        const total = parseFloat(row[7]) || 0;

        totalPurchase += total;

    });


    // Total Purchase
    document.getElementById("totalPurchase").innerText =
        "₹" + totalPurchase.toLocaleString("en-IN");


    // Total Records
    document.getElementById("totalRecords").innerText =
        data.length;


    // Create table
    const tableBody =
        document.getElementById("tableBody");

    tableBody.innerHTML = "";


    data.forEach(row => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${row[0] || ""}</td>
            <td>${row[1] || ""}</td>
            <td>${row[2] || ""}</td>
            <td>${row[3] || ""}</td>
            <td>${row[4] || ""}</td>
            <td>${row[5] || ""}</td>
            <td>₹${Number(row[6] || 0).toLocaleString("en-IN")}</td>
            <td>₹${Number(row[7] || 0).toLocaleString("en-IN")}</td>
        `;

        tableBody.appendChild(tr);

    });


    document.getElementById("status").innerText =
        "Data loaded successfully";

}


// ===============================
// START
// ===============================

loadData();
