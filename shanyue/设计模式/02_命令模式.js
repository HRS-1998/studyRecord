class BankAccount {
    constructor(balance = 0) {
        this.balance = balance;
    }

    deposit(amount) {
        this.balance += amount;
        console.log(`账户存入：${amount}，余额为：${this.balance}`);
    }

    withdraw(amount) {
        if (this.balance - amount >= BankAccount.overdraftLimit) {
            this.balance -= amount;
            console.log(`账户提现：${amount}，余额为：${this.balance}`);
        }
    }

    toString() {
        return `余额为 ${this.balance}`;
    }
}
BankAccount.overdraftLimit = -100;  // 假设可以透支 100

const Action = Object.freeze({
    deposit: 1,
    withdraw: 2,
});

class BankAccountCommand {
    constructor(account, action, amount) {
        this.account = account;
        this.action = action;
        this.amount = amount;
    }

    call() {
        const callHandler = {};
        callHandler[Action.deposit] = (amount) => this.account.deposit(amount);
        callHandler[Action.withdraw] = (amount) =>
            this.account.withdraw(amount);
        callHandler[this.action](this.amount);
    }

    undo() {
        const callHandler = {};
        callHandler[Action.deposit] = (amount) => this.account.withdraw(amount);
        callHandler[Action.withdraw] = (amount) => this.account.deposit(amount);
        callHandler[this.action](this.amount);
    }
}

// 
const bankAccount = new BankAccount(100);
const cmd = new BankAccountCommand(bankAccount, Action.deposit, 50);
cmd.call(); // 账户存入：50，余额为：150

console.log(bankAccount.toString()); // 余额为 150

cmd.undo(); // 账户提现：50，余额为：100
console.log(bankAccount.toString()); // 余额为 100