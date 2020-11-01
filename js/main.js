'use strict';

let isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

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
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),
  data = document.querySelector('.data'),
  cancel = document.getElementById('cancel');

start.disabled = true;

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
  validInputs() {
    const placeholderTitle = document.querySelectorAll('[placeholder="Наименование"]'),
      placeholderAmount = document.querySelectorAll('[placeholder="Сумма"]');

    placeholderTitle.forEach((item) => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[a-zA-Z0-9]/, '');
      });
    });

    placeholderAmount.forEach((item) => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^0-9]/, '');
      });
    });
  }
  allowEntry() {
    start.disabled = (salaryAmount.value !== '' && isNumber(salaryAmount.value)) ? false : true;
  }
  start() {
    start.disabled = (depositPercent.value !== '') ? false : true;
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
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
    const div = document.createElement('div');
    div.classList.add('expenses-items');
    div.innerHTML = `
            <input type="text" class="expenses-title" placeholder="Наименование">
            <input type="text" class="expenses-amount" placeholder="Сумма">
    `;

    expensesPlus.before(div);

    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }

    this.validInputs();
  }
  addIncomeBlock() {
    const div = document.createElement('div');
    div.classList.add('income-items');
    div.innerHTML = `
            <input type="text" class="income-title" placeholder="Наименование">
            <input type="text" class="income-amount" placeholder="Сумма">
    `;

    incomePlus.before(div);

    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }

    this.validInputs();
  }
  getExpenses() {
    const _this = this;
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title').value,
        cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        _this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }
  getIncome() {
    const _this = this;
    incomeItems.forEach(function (item) {
      const itemIncome = item.querySelector('.income-title').value,
        cashIncome = item.querySelector('.income-amount').value;
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
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        _this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    const _this = this;
    additionalIncomeItem.forEach((item) => {
      const itemValue = item.value.trim();
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
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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
  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
      depositPercent.value = '';
      start.disabled = true;
    } else {
      depositPercent.style.display = 'none';
      depositPercent.value = valueSelect;
    }
  }
  validPercent() {
    if (depositPercent.value <= 0 || depositPercent.value >= 100 || !isNumber(depositPercent.value)) {
      start.disabled = true;
      depositPercent.value = '';
      alert('Введите корректное значение в поле проценты');
    } else {
      start.disabled = false;
    }
  }
  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }
  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      depositPercent.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }
  resetDepositHandler() {
    depositCheck.checked = false;
    depositBank.value = '';

    depositPercent.style.display = 'none';
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
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
    this.moneyDeposit = 0;
    this.percentDeposit = 0;
    this.deposit = false;

    this.changeBtn();
    this.resetDepositHandler();
    this.resetRangeValue();
    this.resetResult();
    this.allowEntry();
  }
  changeBtn() {
    const inputAll = data.querySelectorAll('[type=text]');

    inputAll.forEach((item) => {
      if (item.disabled === false) {
        item.disabled = true;
        start.style.display = "none";
        cancel.style.display = "inline-block";
        incomePlus.disabled = true;
        expensesPlus.disabled = true;
        depositBank.disabled = true;
      } else {
        item.disabled = false;
        incomePlus.disabled = false;
        expensesPlus.disabled = false;
        start.style.display = "inline-block";
        cancel.style.display = "none";
        salaryAmount.value = '';
        item.value = '';
        depositBank.disabled = false;

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
    depositPercent.addEventListener('change', this.validPercent.bind(this));
    periodSelect.addEventListener('input', this.updateRangeValue.bind(this));
    expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
    incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
  }
}

const appData = new AppData();

appData.validInputs();
appData.eventsListener();