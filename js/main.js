'use strict';

let money = +prompt('Ваш месячный доход?', '80000'),
  income = 'freelance',
  deposit = confirm('Есть ли у вас депозит в банке?'),
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.', 'Квартплата, проездной, кредит'),
  mission = 100000,
  period = 3;

console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев' + '\nЦель заработать ' + mission + ' рублей/долларов/гривен/юани');
console.log(addExpenses.toLowerCase().split(', '));

let showTypeOf = function (data) {
  console.log(data, typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses1 = prompt('Введите обязательную статью расходов?', 'Бензин'),
  amount1 = +prompt('Во сколько это обойдется?', '20000'),
  expenses2 = prompt('Введите обязательную статью расходов?', 'Кредит'),
  amount2 = +prompt('Во сколько это обойдется?', '25370');

let getExpensesMonth = function (a, b) {
  return a + b;
};

let expensesMonth = getExpensesMonth(amount1, amount2);
console.log('обязательных расходов за месяц ', expensesMonth);

let getAccumulatedMonth = function (a, b) {
  return a - b;
};

let accumulatedMonth = getAccumulatedMonth(money, expensesMonth);
console.log('Накопления за месяц ', accumulatedMonth);

let getTargetMonth = function (a, b) {
  return Math.ceil(a / b);
};

console.log('Цель будет достигнута за: ' + getTargetMonth(mission, accumulatedMonth) + ' месяцев');

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ', budgetDay);

function getStatusIncome() {
  if (budgetDay > 1200) {
    return 'У вас высокий уровень дохода!';
  } else if (budgetDay > 600 && budgetDay <= 1200) {
    return 'У вас средний уровень дохода.';
  } else if (budgetDay <= 600 && budgetDay >= 0) {
    return 'К сожалению у вас уровень дохода ниже среднего.';
  } else {
    return 'Что то пошло не так...';
  }
}
console.log(getStatusIncome());