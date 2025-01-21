const messages = require("../utils/messageUtils.js");
const prompts = require("../views/prompts.js");
const accountController = require("../controllers/accountController.js");

function operation() {
  prompts
    .getAction()
    .then(async (res) => {
      const action = res.action;

      switch (action) {
        case "Criar conta":
          await accountController.accountCreator();
          break;

        case "Sair":
          console.log(messages.exit);
          process.exit();
      }

      operation();
    })
    .catch((err) => console.error(err));
}

module.exports = operation;
