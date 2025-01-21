const chalk = require("chalk");

const messages = {
  welcome: chalk.bold.greenBright("Seja bem-vindo ao Accounts!"),
  options: chalk.blue("O que deseja fazer?"),
  createAccount: chalk.bgGreen.black("Parabéns por escolher o nosso banco!"),
  accountName: chalk.green("Informe seu nome:"),
  invalidAccountName: chalk.bgRed.white("O nome é obrigatório, favor informar"),
  accountNameSuccess: (name) =>
    chalk.green(`Olá ${name}, seja bem-vindo ao Accounts!`),
  generateAccountNumber: chalk.white("Gerando o número de sua conta"),
  success: chalk.bgGreen("Sucesso!"),
  accountNumber: (name, number) =>
    chalk.bgWhite.black(`${name}, o número de sua conta é: ${number}.`),
  accountPassword: chalk.green("Informe uma senha para sua conta:"),
  invalidAccountPassword: chalk.green('Senha é obrigatória! Cancelando operação...'),
  creatingAccount: chalk.white("Criando a sua conta"),
  creatingAccountSuccess: (name, number) =>
    chalk.bgGreen.black(
      `${name}, parabéns, a sua conta ${number} já está criada e disponível para uso!`
    ),
};

module.exports = messages;
