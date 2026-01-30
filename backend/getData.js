// Import dependencies
const fs = require("node:fs");
const { google } = require("googleapis");

const service = google.sheets("v4");
const credentials = require("./secret/credentials.json");
const dev = process.env.NODE_ENV !== "production";

// Configure auth client
const authClient = new google.auth.JWT(
	credentials.client_email,
	null,
	credentials.private_key.replace(/\\n/g, "\n"),
	["https://www.googleapis.com/auth/spreadsheets"],
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
			spreadsheetId: "17CnZqRY9U5et3g1MWKcZ4vGMLQpcXuO5Llp-J7hOI0U",
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
			TB: 0,
			TD: 0,
			V: 0,
			Z: 0,
		};

		// Set rows to equal the rows
		const rows = res.data.values;

		// Check if we have any data and if we do add it to our answers array
		if (rows.length) {
			// Remove the headers
			rows.shift();

			// For each row
			for (const row of rows) {
				if (numOfCandidates[row[4]] !== undefined) {
					numOfCandidates[row[4]] += 1;
				} else {
					console.log(`Invalid division: ${row[4]}`);
				}
			}
		} else {
			console.log("No data found.");
		}

		const candidatesArray = Object.entries(numOfCandidates).map(
			([name, candidates]) => ({ name, candidates }),
		);
		// sort by candidates
		candidatesArray.sort((a, b) => b.candidates - a.candidates);

		// Saved the numOfCandidates
		fs.writeFileSync(
			"../frontend/dist/data.json",
			JSON.stringify(candidatesArray),
			(err) => {
				if (err) throw err;
				console.log("Saved!");
			},
		);

		// if dev also save to the public folder in frontend
		if (dev) {
			fs.writeFileSync(
				"../frontend/public/data.json",
				JSON.stringify(candidatesArray),
				(err) => {
					if (err) throw err;
					console.log("Saved in frontend also!");
				},
			);
		}
	} catch (error) {
		// Log the error
		console.log(error);

		// Exit the process with error
		process.exit(1);
	}
}

module.exports = getData;
