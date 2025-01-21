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

module.exports = { getAction };
