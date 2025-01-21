const inquirer = require("inquirer");

const messages = require("../utils/messageUtils");

function getAction() {
  return inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: messages.options,
      choices: ["Criar conta", "Entrar na conta", "Sair"],
    },
  ]);
}

function getAccountName() {
  return inquirer.prompt([
    {
      name: "accountName",
      message: messages.accountName,
    },
  ]);
}

function getAccountPassword() {
  return inquirer.prompt([
    {
      name: "accountPassword",
      type: "password",
      mask: true,
      message: messages.accountPassword,
    },
  ]);
}

module.exports = { getAction, getAccountName, getAccountPassword };
