function doGet() {
  const sheet = SpreadsheetApp
    .openById('1MSDmtDcmmKTt6ykUQh9XOnq0tfsipn2A')
    .getSheetByName('Sheet1'); // আপনার শিটের নাম বসান

  const data = sheet.getDataRange().getValues();

  // ধরুন "Buy" কলামটি ২ নম্বর কলামে (index 1)
  let totalBuy = 0;
  for (let i = 1; i < data.length; i++) {
    const value = data[i][1]; // Buy কলাম
    if (value && !isNaN(value)) {
      totalBuy += Number(value);
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({ totalBuy: totalBuy }))
    .setMimeType(ContentService.MimeType.JSON);
}
