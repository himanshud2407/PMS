# Google Sheets Integration Guide

To collect form submissions in Google Sheets, follow these steps to set up the backend script.

## 1. Setup Google Sheet
1. Create a new Google Sheet.
2. Rename the first tab to **"ContactUs"**.
3. Create a second tab and rename it to **"Bookings"**.
4. In **"ContactUs"**, add these headers in the first row (A1 to F1):
   `Timestamp`, `FullName`, `Email`, `ContactNumber`, `Subject`, `Message`
5. In **"Bookings"**, add these headers in the first row (A1 to J1):
   `Timestamp`, `FullName`, `Email`, `ContactNumber`, `TestType`, `PreferredDate`, `Gender`, `CollectionType`, `Address`, `Notes`

## 2. Add Google Apps Script
1. In your Google Sheet, go to **Extensions > Apps Script**.
2. Replace the code in `Code.gs` with this:

```javascript
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  try {
    var data = JSON.parse(e.postData.contents);
    var sheetName = data.sheetName || "Sheet1";
    var sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }
    
    // Get headers from the first row
    var headers = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0];
    
    // If sheet is empty, create headers from data keys
    if (headers[0] === "") {
      headers = Object.keys(data);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    // Map data to columns based on headers
    var newRow = headers.map(function(header) {
      return data[header] !== undefined ? data[header] : "";
    });
    
    sheet.appendRow(newRow);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Added to handle preflight or simple GET test
function doGet(e) {
  return ContentService.createTextOutput("Script is running! Send a POST request to submit data.");
}
```

## 3. Deploy the Script (CRITICAL STEP)
1. Click the **"Deploy"** button (top right) > **"New deployment"**.
2. Select **"Web app"** as the type.
3. **Description**: "PMS Form Submission"
4. **Execute as**: **"Me"** (your email).
5. **Who has access**: **"Anyone"** (This is why it's not working for you currently—it must be "Anyone", not "Anyone with Google account").
6. Click **"Deploy"**.
7. Copy the **Web App URL** (ends in `/exec`).

## 4. Update Environment Variables
1. Open `.env.local` in your project.
2. Update the URL:
   ```env
   NEXT_PUBLIC_GOOGLE_SHEET_URL="YOUR_NEW_COPIED_URL"
   ```
3. **Restart your dev server** (`Ctrl+C` then `npm run dev`) so the new URL is loaded.
