'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  income = 'freelance',
  deposit = confirm('Есть ли у вас депозит в банке?'),
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.', 'Квартплата, проездной, кредит'),
  mission = 1000000,
  period = 3;

let start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
};

start();

let showTypeOf = function (data) {
  console.log(data, typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLowerCase().split(', '));

let expenses = [];

let getExpensesMonth = function () {
  let sum,
    a = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');
    sum = +prompt('Во сколько это обойдется?');
    while (!isNumber(sum) || sum === 0) {
      sum = +prompt('Во сколько это обойдется? введите число***');
    }
    a += +sum;
  }
  return a;
};

let expensesAmount = getExpensesMonth();
console.log('обязательных расходов за месяц ', expensesAmount);

let getAccumulatedMonth = function () {
  return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();
console.log('Накопления за месяц ', accumulatedMonth);

let getTargetMonth = function () {
  return Math.ceil(mission / accumulatedMonth);
};

if (getTargetMonth() > 0) {
  console.log('Цель будет достигнута за: ' + getTargetMonth() + ' месяцев');
} else {
  console.log('Цель не будет достигнута!');
}

let budgetDay = Math.floor(accumulatedMonth / 30);
if (budgetDay > 0) {
  console.log('Бюджет на день: ', budgetDay);
}

function getStatusIncome() {
  if (budgetDay > 1200) {
    return 'У вас высокий уровень дохода!';
  } else if (budgetDay > 600 && budgetDay <= 1200) {
    return 'У вас средний уровень дохода.';
  } else if (budgetDay <= 600 && budgetDay >= 1) {
    return 'К сожалению у вас уровень дохода ниже среднего.';
  }
}
console.log(getStatusIncome());