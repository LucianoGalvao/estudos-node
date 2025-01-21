const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const operation = require("./services/operation");
const messages = require("./utils/messageUtils.js");

function startApp() {
  console.log(messages.welcome);
  operation();
}

startApp();

function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual é o nome da sua conta?",
      },
    ])
    .then((res) => {
      const accountName = res["accountName"];
      // Vefifica conta

      if (!checkAccount(accountName)) {
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Qual o valor do deposito?",
          },
        ])
        .then((res) => {
          const amount = res["amount"];
          addAmount(accountName, amount);
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}

function checkAccount(accountName) {
  // Implementar a verificação da conta
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black("Esta conta não existe, tente novamente!"));
    return false;
  }

  return true;
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);
  if (!amount) {
    console.log(
      chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde")
    );
    return deposit();
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.error(err);
    }
  );

  console.log(chalk.green(`Foi depositado R$${amount} na sua conta.`));
  operation();
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf8",
    flag: "r",
  });

  return JSON.parse(accountJSON);
}

function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual é o nome da sua conta?",
      },
    ])
    .then((res) => {
      const accountName = res["accountName"];
      if (!checkAccount(accountName)) {
        return getAccountBalance();
      }

      const accountData = getAccount(accountName);
      console.log(
        chalk.bgCyan.black(`O saldo da sua conta é de R$${accountData.balance}`)
      );
      operation();
    })
    .catch((err) => console.error(err));
}

function withdraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual é o nome da sua conta?",
      },
    ])
    .then((res) => {
      const accountName = res["accountName"];
      if (!checkAccount(accountName)) {
        return withdraw();
      }
      inquirer
        .prompt([
          {
            name: "amount",
            message: "Qual o valor para sacar?",
          },
        ])
        .then((res) => {
          const amount = res["amount"];
          withdrawAmount(accountName, amount);
        });
    })
    .catch((err) => console.error(err));
}

function withdrawAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(
      chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde")
    );
    return withdraw();
  }

  if (accountData.balance < amount) {
    console.log(
      chalk.bgRed.white(
        "O valor disponível na conta é insuficiente, corrija o valor"
      )
    );
    return withdraw();
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.error(err);
    }
  );

  console.log(
    chalk.bgCyan.black(`O valor de R$${amount} foi sacado de sua conta!`)
  );

  return operation();
}
