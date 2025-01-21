const inquirer = require("inquirer");

const prompts = require("../views/prompts");
const messages = require("../utils/messageUtils");
const ellipsisUtils = require("../utils/ellipsesUtils");
const getNextAccountNumber = require("../utils/accountNumberUtil");
const capitalizeName = require("../utils/capitalizeName");

async function accountCreator() {
  console.log(messages.createAccount);
  await createAccount();
}

function createAccount() {
  prompts
    .getAccountName()
    .then(async (res) => {
      const name = await capitalizeName(res["accountName"]);
      if (!name) {
        console.log(messages.invalidAccountName);
        return createAccount();
      }
      console.log(messages.accountNameSuccess(name));
      const accountNumber = getNextAccountNumber();
      await ellipsisUtils(
        messages.generateAccountNumber,
        messages.success,
        5000
      );
      console.log(messages.accountNumber(name, accountNumber));
    })
    .catch((err) => console.error(err));
}

module.exports = { accountCreator, createAccount };
