import inquirer from "inquirer";
import chalk from "chalk";

let currentBalance = 50000;
let myPin = "salah19#@";

const pinAnswer = await inquirer.prompt([
  {
    name: "pinNumber",
    type: "any",
    message: chalk.bold.bgBlueBright("Enter your PIN here:"),
  },
]);

if (pinAnswer.pinNumber === myPin) {
  console.log(chalk.bold.bgGreenBright("You entered correct PIN."));
  const operationAns = await inquirer.prompt([
    {
      message: chalk.bold.bgYellowBright(
        "Choose any one operation you want to perform:"
      ),
      name: "whatOperation",
      type: "list",
      choices: [
        "Check Balance",
        "Withdraw Amount",
        "Deposit Amount",
        "Bill Payment",
      ],
    },
  ]);

  if (operationAns.whatOperation === "Check Balance") {
    console.log(
      chalk.bold.bgMagentaBright("Your current balance is: Rs.") +
        " " +
        currentBalance
    );
  } else if (operationAns.whatOperation === "Withdraw Amount") {
    const withDrawAmountAns = await inquirer.prompt([
      {
        message: chalk.bold.redBright("Enter withdraw amount:"),
        name: "inputWithDrawAmount",
        type: "number",
      },
    ]);

    if (withDrawAmountAns.inputWithDrawAmount > currentBalance) {
      console.log(chalk.bold.red("You can not draw amount more than your balance!"));
    } else {
      currentBalance -= withDrawAmountAns.inputWithDrawAmount;

      console.log(
        chalk.bold.green("Your balance after withdraw is now: ") +
          " " +
          currentBalance
      );
    }
  } else if (operationAns.whatOperation === "Deposit Amount") {
    const depositAmountAns = await inquirer.prompt([
      {
        message: chalk.bold.greenBright("Enter deposit amount:"),
        name: "inputDepositAmount",
        type: "number",
      },
    ]);
    currentBalance += depositAmountAns.inputDepositAmount;
    console.log(
      chalk.bold
        .magentaBright`Your balance after deposit is now ${currentBalance}`
    );
  } else if (operationAns.whatOperation === "Bill Payment") {
    const billPaymentAns = await inquirer.prompt([
      {
        message: chalk.bold.greenBright("Enter consumer account number:"),
        name: "consumerAccountNumber",
        type: "any",
      },
      {
        message: chalk.bold.greenBright("Enter Bill Amount:"),
        name: "imputBillAmount",
        type: "number",
      },
    ]);
    currentBalance -= billPaymentAns.imputBillAmount;
    console.log(
      chalk.bold.magentaBright(
        "Bill paid against  " +
          billPaymentAns.consumerAccountNumber +
          " & balance after bill payment is now: " +
          currentBalance
      )
    );
  }
} else {
  console.log(chalk.bold.bgRedBright`Sorry! You typed Incorrect PIN.`);
}
