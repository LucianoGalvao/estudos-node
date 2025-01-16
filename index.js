// modulos externos
const inquirer = require("inquirer");
const chalk = require("chalk");

// modulos nativos
const fs = require("fs");

// inicialização

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
          "Criar Conta",
          "Consultar Saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((res) => {
      const action = res["action"];
      console.log(action);
    })
    .catch((err) => console.error(err));
}