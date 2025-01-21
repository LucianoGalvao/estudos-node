const fs = require("fs");
const path = require("path");

const accountNumberFile = path.join(__dirname, "../utils/countingAccounts.json");

function getNextAccountNumber() {
  if (!fs.existsSync(accountNumberFile)) {
    fs.writeFileSync(
      accountNumberFile,
      JSON.stringify({ lastAccountNumber: 0 }, null, 2)
    );
  }

  const data = JSON.parse(fs.readFileSync(accountNumberFile, "utf8"));

  const nextAccountNumber = data.lastAccountNumber + 1;

  fs.writeFileSync(
    accountNumberFile,
    JSON.stringify({ lastAccountNumber: nextAccountNumber }, null, 2)
  );

  return nextAccountNumber;
}

module.exports = getNextAccountNumber;
