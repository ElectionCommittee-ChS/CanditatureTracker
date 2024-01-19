// Import dependencies
const fs = require("fs");
const { google } = require("googleapis");

const service = google.sheets("v4");
const credentials = require("./secret/credentials.json");

// Configure auth client
const authClient = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key.replace(/\\n/g, "\n"),
  ["https://www.googleapis.com/auth/spreadsheets"]
);

async function getData() {
  try {

    // Authorize the client
    const token = await authClient.authorize();

    // Set the client credentials
    authClient.setCredentials(token);

    // Get the rows
    const res = await service.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId: "1qfd-yGu1Wl8VovGRwG-tcUIBWAwbqI23_fkFUxauQeA",
      range: "A:G",
    });

    // All of the answers
    const numOfCandidates = {
      A: 0,
      AE: 0,
      D: 0,
      DS: 0,
      E: 0,
      F: 0,
      GS: 0,
      H: 0,
      I: 0,
      IT: 0,
      K: 0,
      KfKb: 0,
      M: 0,
      Sjö: 0,
      TD: 0,
      V: 0,
      Z: 0
    }

    // Set rows to equal the rows
    const rows = res.data.values;

    // Check if we have any data and if we do add it to our answers array
    if (rows.length) {

      // Remove the headers
      rows.shift()

      // For each row
      for (const row of rows) {
        if (numOfCandidates[row[3]] !== undefined) {
          numOfCandidates[row[3]] += 1
        } else {
          console.log("Invalid division: " + row[3])
        }
      }

    } else {
      console.log("No data found.");
    }

    let candidatesArray = Object.entries(numOfCandidates).map(([name, candidates]) => ({ name, candidates }));
    // sort by candidates
    candidatesArray.sort((a, b) => b.candidates - a.candidates);

    // Saved the numOfCandidates
    fs.writeFileSync("public/data.json", JSON.stringify(candidatesArray), function (err, file) {
      if (err) throw err;
      console.log("Saved!");
    });

  } catch (error) {

    // Log the error
    console.log(error);

    // Exit the process with error
    process.exit(1);

  }
}

module.exports = getData;