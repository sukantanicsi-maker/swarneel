// Google Sheet published CSV URL
const sheetURL =
  "https://docs.google.com/spreadsheets/d/12yHqIhFQZyEwYJlmBfscDmaXZpp2lXQK/gviz/tq?tqx=out:csv&gid=752590382";

// Test: Load Google Sheet data
fetch(sheetURL)
  .then(response => response.text())
  .then(data => {
    console.log("Google Sheet Data:");
    console.log(data);
  })
  .catch(error => {
    console.error("Error loading Google Sheet:", error);
  });
