'use strict';

const money = 500;
const income = 'freelance';
const addExpenses = 'Internet, Food, Pay for housing payments';
const deposit = true;
const mission = 1500;
const period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев' + '\nЦель заработать ' + mission + ' долларов');
console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);
