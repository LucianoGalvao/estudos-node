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
      if (action === "Criar Conta") {
        createAccount();
      } else if (action === "Depositar") {
        deposit();
      } else if (action === "Consultar Saldo") {
        getAccountBalance();
      } else if (action === "Sacar") {
        withdraw();
      } else if (action === "Sair") {
        console.log(chalk.bgCyan.black("Obrigado por usar o Accounts!"));
        process.exit();
      }
    })
    .catch((err) => console.error(err));
}

// Criando conta
function createAccount() {
  console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco!"));
  console.log(chalk.green("Defina as opções de conta a seguir"));
  buildAccount();
}

// Verifica o nome e cria de fato a conta
function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para a sua conta:",
      },
    ])
    .then((res) => {
      const accountName = res["accountName"];

      console.info(accountName);

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }
      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black("Esta conta já existe, escolha outro nome!")
        );
        buildAccount();
        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{ "balance": 0 }',
        function (err) {
          console.error(err);
        }
      );

      console.log(chalk.green("Parabéns, sua conta foi criada com sucesso!"));
      operation();
    })
    .catch((err) => console.error(err));
}

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
          operation();
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
