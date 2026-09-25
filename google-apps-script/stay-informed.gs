/**
 * Receives "Stay Informed" sign-ups from the DAHF website and appends each one
 * as a row in the Google Sheet this script is attached to.
 *
 * Setup (once): see the "Stay Informed sign-ups" section in README-stay-informed.md.
 */

// Optional shared secret. If you set one here, set the same value as
// STAY_INFORMED_SECRET in the website's environment variables. Leave empty
// to skip the check.
var SECRET = "";

var SHEET_NAME = "Sign-ups";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (SECRET && data.secret !== SECRET) {
      return json_({ ok: false, error: "unauthorised" });
    }

    var email = String(data.email || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return json_({ ok: false, error: "invalid email" });
    }

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Submitted at", "Email", "Source"]);
        sheet.setFrozenRows(1);
      }

      // Skip duplicates (case-insensitive) so a repeat sign-up is not a new row.
      var last = sheet.getLastRow();
      if (last > 1) {
        var existing = sheet.getRange(2, 2, last - 1, 1).getValues();
        for (var i = 0; i < existing.length; i++) {
          if (String(existing[i][0]).toLowerCase() === email.toLowerCase()) {
            return json_({ ok: true, duplicate: true });
          }
        }
      }

      sheet.appendRow([data.submittedAt || new Date().toISOString(), email, data.source || ""]);
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
