'use strict';

let money = 90000, // Доход за месяц
    income = 50000, // дополнительный доходод
    addExpenses = 'Продукты, бензин, книги', // дополнительные расходы
    deposit = true, // наличие депозита 
    mission = 300000, // сумма, которую надо накопить 
    period = 12, // срок накопления в месяцах
    budgetDay = money / 30; // дневной бюджет

console.log('тип данных money: ', typeof money);
console.log('тип данных income: ', typeof income);
console.log('тип данных deposit: ', typeof deposit);
console.log('длина строки addExpenses: ', addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase().split(', '));
console.log('budgetDay: ', budgetDay);