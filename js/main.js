'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  start = function () {
    do {
      money = prompt('Ваш месячный доход?', '80000');
    } while (!isNumber(money));
  };

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 150000,
  period: 3,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.', 'Квартплата, проездной, кредит');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    for (let i = 0; i < 2; i++) {
      let num,
        expenses = prompt('Введите обязательную статью расходов?', 'Квартплата');
      num = +prompt('Во сколько это обойдется?', '2000');
      while (!isNumber(num) || num === 0) {
        num = +prompt('Во сколько это обойдется? введите число***');
      }
      appData.expenses[expenses] = num;
    }
  },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
    console.log('Обязательных расходов за месяц ', appData.expensesMonth);
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    appData.getTargetMonth = Math.ceil(appData.mission / appData.budgetMonth);
    if (appData.getTargetMonth > 0) {
      console.log('Цель будет достигнута за: ' + appData.getTargetMonth + ' месяцев');
    } else {
      console.log('Цель не будет достигнута!');
    }
  },
  getStatusIncome: function () {
    if (appData.budgetDay > 1200) {
      console.log('У вас высокий уровень дохода!');
    } else if (appData.budgetDay > 600 && appData.budgetDay <= 1200) {
      console.log('У вас средний уровень дохода.');
    } else if (appData.budgetDay <= 600 && appData.budgetDay >= 1) {
      console.log('К сожалению у вас уровень дохода ниже среднего.');
    }
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
for (let key in appData) {
  console.log(`Наша программа включает в себя данные: ${key} = ${appData[key]}`);
}