'use strict';

let money = prompt('Ваш месячный доход?', '');
console.log(typeof money);
const income = 'freelance';
console.log(typeof income);
const deposit = confirm('Есть ли у вас депозит в банке?');
console.log(typeof deposit);
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую. Пример: "Квартплата, проездной, кредит"', '');

let mission = 1000000;
const period = 12;
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев' + '\nЦель заработать ' + mission + ' рублей/долларов/гривен/юани');
console.log(addExpenses.toLowerCase().split(', '));

let expenses1 = prompt('Введите обязательную статью расходов?', ''),
  amount1 = prompt('Во сколько это обойдется?', ''),
  expenses2 = prompt('Введите обязательную статью расходов?', ''),
  amount2 = prompt('Во сколько это обойдется?', '');

let budgetMonth = (+money - amount1 - amount2);
console.log('Бюджет на месяц ', budgetMonth);

let target = Math.ceil(mission / budgetMonth);
console.log('Цель будет достигнута за: ' + target + ' месяцев');

let budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день: ', budgetDay);

if (budgetDay > 1200) {
  console.log('У вас высокий уровень дохода!');
} else if (budgetDay > 600 && budgetDay <= 1200) {
  console.log('У вас средний уровень дохода.');
} else if (budgetDay <= 600 && budgetDay >= 0) {
  console.log('К сожалению у вас уровень дохода ниже среднего.');
} else {
  console.log('Что то пошло не так...');
}