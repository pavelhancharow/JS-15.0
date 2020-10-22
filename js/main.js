'use strict';

let start = document.getElementById('start'),
  btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
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
  expensesTitle = document.querySelector('.expenses-title'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  incomeItem = document.querySelectorAll('.income-items');

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function () {

    if (salaryAmount.value === '') {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      return;
    }

    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
    // appData.getTargetMonth();
    // appData.getStatusIncome();
    // appData.getInfoDeposit();
    // appData.calcSavedMonth();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcSavedMonth();
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.append(cloneExpensesItem);
    expensesPlus.before(cloneExpensesItem);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  getIncome: function () {
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

    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
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
    return appData.budgetMonth * periodSelect.value;
  }
};

start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);

// for (let key in appData) {
//   console.log(`Наша программа включает в себя данные: ${key} = ${appData[key]}`);
// }
// console.log(appData.addExpenses.join(', '));
