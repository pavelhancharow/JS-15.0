'use strict';

let calc = document.getElementById('start'),
  btnPlus = document.getElementsByTagName('button'),
  addIncomeBtn = btnPlus[0],
  addExpensesBtn = btnPlus[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  additionalIncomeItemOne = additionalIncomeItem[0],
  additionalIncomeItemTwo = additionalIncomeItem[1],
  resultTotal = document.querySelectorAll('[class$=-value]'),
  budgetMonthValue = resultTotal[0],
  budgetDayValue = resultTotal[1],
  expensesMonthValue = resultTotal[2],
  additionalIncomeValue = resultTotal[3],
  additionalExpensesValue = resultTotal[4],
  incomePeriodValue = resultTotal[5],
  targetMonthValue = resultTotal[6],
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  incomeAmount = document.querySelector('.income-amount'),
  expensesTitle = document.querySelector('.expenses-title'),
  expensesAmount = document.querySelector('.expenses-amount'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('[type=range]');

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  start = function () {
    do {
      money = prompt('Ваш месячный доход?', '80000');
    } while (!isNumber(money));
  };

// start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 150000,
  period: 3,
  asking: function () {
    if (confirm('Если у вас дополнительный источник заработка?')) {
      let itemIncome,
        cashIncome;
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
      } while (isNumber(itemIncome) || itemIncome === null);
      do {
        cashIncome = +prompt('Сколько в месц вы на этом зарабатываете?', 10000);
      } while (!isNumber(cashIncome) || cashIncome === 0);
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.', 'Квартплата, проездной, кредит');
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    for (let i = 0; i < appData.addExpenses.length; i++) {
      appData.addExpenses[i] = appData.addExpenses[i].trim();
      appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1);
    }
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    for (let i = 0; i < 2; i++) {
      let num,
        expenses;
      do {
        expenses = prompt('Введите обязательную статью расходов?', 'Квартплата');
      } while (isNumber(expenses) || expenses === null);
      do {
        num = +prompt('Во сколько это обойдется?', '2000');
      } while (!isNumber(num) || num === 0);
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
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = +prompt('Какой годовой процент?', '10');
      } while (!isNumber(appData.percentDeposit) || appData.percentDeposit === 0);
      do {
        appData.moneyDeposit = +prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(appData.moneyDeposit) || appData.moneyDeposit === 0);
    }
  },
  calcSavedMonth: function () {
    return appData.budgetMonth * appData.period;
  }
};

// appData.asking();
// appData.getExpensesMonth();
// appData.getBudget();
// appData.getTargetMonth();
// appData.getStatusIncome();
// appData.getInfoDeposit();
// appData.calcSavedMonth();
// for (let key in appData) {
//   console.log(`Наша программа включает в себя данные: ${key} = ${appData[key]}`);
// }
// console.log(appData.addExpenses.join(', '));
