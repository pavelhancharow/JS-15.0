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
  incomeItems = document.querySelectorAll('.income-items'),
  expensesAmount = document.querySelector('.expenses-amount'),
  placeholderTitle = document.querySelectorAll('[placeholder="Наименование"]'),
  placeholderAmount = document.querySelectorAll('[placeholder="Сумма"]'),
  data = document.querySelector('.data'),
  cancel = document.getElementById('cancel');

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

start.disabled = true;

placeholderTitle.forEach(function (item) {
  item.addEventListener('input', function () {
    item.value = item.value.replace(/[a-zA-Z0-9]/, '');
  });
});

placeholderAmount.forEach(function (item) {
  item.addEventListener('input', function () {
    item.value = item.value.replace(/[^0-9]/, '');
  });
});

class AppData {
  constructor() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
  }


  allowEntry() {
    start.disabled = (salaryAmount.value !== '' && isNumber(salaryAmount.value)) ? false : true;
  }

  start() {
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
    this.changeBtn();
  }

  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMonth();
    periodSelect.addEventListener('input', this.updateIncomePeriodValue);
  }
  addExpensesBlock() {
    let div = document.createElement('div');
    div.classList.add('expenses-items');
    div.innerHTML = `
            <input type="text" class="expenses-title" placeholder="Наименование">
            <input type="text" class="expenses-amount" placeholder="Сумма">
    `;

    expensesPlus.before(div);

    expensesItems = document.querySelectorAll('.expenses-items');
    placeholderTitle = document.querySelectorAll('[placeholder="Наименование"]');
    placeholderAmount = document.querySelectorAll('[placeholder="Сумма"]');

    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }

    placeholderTitle.forEach(function (item) {
      item.addEventListener('input', function () {
        item.value = item.value.replace(/[a-zA-Z0-9]/, '');
      });
    });

    placeholderAmount.forEach(function (item) {
      item.addEventListener('input', function () {
        item.value = item.value.replace(/[^0-9]/, '');
      });
    });
  }
  addIncomeBlock() {
    let div = document.createElement('div');
    div.classList.add('income-items');
    div.innerHTML = `
            <input type="text" class="income-title" placeholder="Наименование">
            <input type="text" class="income-amount" placeholder="Сумма">
    `;

    incomePlus.before(div);

    incomeItems = document.querySelectorAll('.income-items');
    placeholderTitle = document.querySelectorAll('[placeholder="Наименование"]');
    placeholderAmount = document.querySelectorAll('[placeholder="Сумма"]');

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }

    placeholderTitle.forEach(function (item) {
      item.addEventListener('input', function () {
        item.value = item.value.replace(/[a-zA-Z0-9]/, '');
      });
    });

    placeholderAmount.forEach(function (item) {
      item.addEventListener('input', function () {
        item.value = item.value.replace(/[^0-9]/, '');
      });
    });
  }
  getExpenses() {
    const _this = this;
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        _this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }
  getIncome() {
    const _this = this;
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        _this.income[itemIncome] = +cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  getAddExpenses() {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        _this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    const _this = this;
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        _this.addIncome.push(itemValue);
      }
    });
  }
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  }
  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }
  calcSavedMonth() {
    return this.budgetMonth * periodSelect.value;
  }
  updateRangeValue() {
    let periodAmount = document.querySelector('.period-amount');
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = this.calcSavedMonth();
  }
  resetRangeValue() {
    periodSelect.value = '1';
    let periodAmount = document.querySelector('.period-amount');
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = this.calcSavedMonth();
  }
  reset() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;

    this.changeBtn();
    this.resetRangeValue();
    this.resetResult();
    this.allowEntry();
  }
  changeBtn() {
    let inputAll = data.querySelectorAll('[type=text]');

    inputAll.forEach((item) => {
      if (item.disabled === false) {
        item.disabled = true;
        start.style.display = "none";
        cancel.style.display = "inline-block";
        incomePlus.disabled = true;
        expensesPlus.disabled = true;
      } else {
        item.disabled = false;
        incomePlus.disabled = false;
        expensesPlus.disabled = false;
        start.style.display = "inline-block";
        cancel.style.display = "none";
        salaryAmount.value = '';
        item.value = '';
        this.removeExpensesBlock();
        this.removeIncomeBlock();
      }
    });
  }
  removeExpensesBlock() {
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'block';
    }
    while (expensesItems.length !== 1) {
      expensesItems[0].remove();
      expensesItems = document.querySelectorAll('.expenses-items');
    }
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
  }
  removeIncomeBlock() {
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'block';
    }
    while (incomeItems.length !== 1) {
      incomeItems[0].remove();
      incomeItems = document.querySelectorAll('.income-items');
    }
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
  }
  resetResult() {
    budgetMonthValue.value = '';
    budgetDayValue.value = '';
    expensesMonthValue.value = '';
    additionalExpensesValue.value = '';
    additionalIncomeValue.value = '';
    targetMonthValue.value = '';
    incomePeriodValue.value = '';
  }

  eventsListener() {
    salaryAmount.addEventListener('change', this.allowEntry.bind(this));
    periodSelect.addEventListener('input', this.updateRangeValue.bind(this));
    expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
    incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
  }

}

const appData = new AppData();

appData.eventsListener();

  // for (let key in appData) {
  //   console.log(`Наша программа включает в себя данные: ${key} = ${appData[key]}`);
  // }
  // console.log(appData.addExpenses.join(', '));