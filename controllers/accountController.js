const fs = require("fs");
const path = require("path");
const prompts = require("../views/prompts");
const messages = require("../utils/messageUtils");
const ellipsisUtils = require("../utils/ellipsesUtils");
const getNextAccountNumber = require("../utils/accountNumberUtil");
const capitalizeName = require("../utils/capitalizeName");

async function accountCreator() {
  console.log(messages.createAccount);
  await createAccount();
}

async function createAccount() {
  try {
    const accountName = await prompts.getAccountName();
    const name = await capitalizeName(accountName["accountName"]);

    if (!name) {
      console.log(messages.invalidAccountName);
      return createAccount();
    }

    console.log(messages.accountNameSuccess(name));
    const accountNumber = getNextAccountNumber();

    await ellipsisUtils(messages.generateAccountNumber, messages.success, 5000);
    console.log(messages.accountNumber(name, accountNumber));

    const accountPassword = await prompts.getAccountPassword();
    const password = accountPassword["accountPassword"].trim();

    if (!password) {
      console.log(messages.invalidAccountPassword);
      return createAccount();
    }

    const dataDir = path.join(__dirname, "../data/");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    fs.writeFileSync(
      path.join(__dirname, `../data/${accountNumber}.json`),
      `{"name": "${name}", "number": "${accountNumber}", "password": "${password}", "balance": 0}`
    );

    await ellipsisUtils(
      messages.creatingAccount,
      messages.creatingAccountSuccess(name, accountNumber, 5000),
      5000
    );
  } catch (err) {
    console.error(err);
  }
}

module.exports = { accountCreator, createAccount };
