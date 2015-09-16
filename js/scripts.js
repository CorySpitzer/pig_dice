function BankAccount(memberName,initialDeposit) {
  this.memberName = memberName;
  this.initialDeposit = initialDeposit;
}

BankAccount.prototype.depositWithdraw = function(deposit, withdraw) {
  // if (withdraw == "") {
  //   withdraw = 0;
  // } else if (deposit == "") {
  //   deposit = 0;
  // }
  this.initialDeposit = this.initialDeposit + deposit - withdraw;

}

// BankAccount.prototype.withdraw = function(amount) {
//   this.initialDeposit = this.initialDeposit - amount;
// }

$(document).ready(function() {
  var newBankAccount;
  $("form#new-account").submit(function(event) {
    // $("span.balance").val("");
    var inputtedUserName = $("input#new-user-name").val();
    var inputtedInitialBalance = parseInt($("input#initial-balance").val());
    newBankAccount = new BankAccount(inputtedUserName, inputtedInitialBalance);
    $("span.balance").text(newBankAccount.initialDeposit);
    // $("span.balance").text(newBankAccount.balance);
    event.preventDefault();
    // $("input").val("");

  });
  $("form#deposit-withdraw").submit(function(event) {
    event.preventDefault();
    var inputtedDeposit;
    debugger;
    if ($("input#deposit").val() == "") {
      inputtedDeposit = 0;
    } else {
      inputtedDeposit = parseInt($("input#deposit").val());
    }
    var inputtedWithdrawal;

    if ($("input#withdrawal").val() == "") {
      inputtedWithdrawal = 0;
    } else {
      inputtedWithdrawal = parseInt($("input#withdrawal").val());
    }

    newBankAccount.depositWithdraw(inputtedDeposit, inputtedWithdrawal);
    // newBankAccount.withdraw(inputtedWithdrawal);
    $("span.balance").text(newBankAccount.initialDeposit);
  });
});
