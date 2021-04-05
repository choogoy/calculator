'use strict';

let money = +prompt('Ваш месячный доход?'), // Доход за месяц
    income = 50000, // дополнительный доходод
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'), // дополнительные расходы
    deposit = confirm('Есть ли у вас депозит в банке?'), // наличие депозита 
    mission = 300000, // сумма, которую надо накопить 
    expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1 = +prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2 = +prompt('Во сколько это обойдется?'),
    budgetMonth = money - amount1 - amount2,
    period = Math.ceil(mission / budgetMonth), // срок накопления в месяцах
    budgetDay = Math.floor(budgetMonth / 30); // дневной бюджет

console.log('тип данных money: ', typeof money);
console.log('тип данных income: ', typeof income);
console.log('тип данных deposit: ', typeof deposit);
console.log('длина строки addExpenses: ', addExpenses.length);
console.log(`Цель заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase().split(', '));
console.log('Бюджет на месяц: ', budgetMonth);
console.log(`Цель будет достигнута за ${period} месяцев(-а)`);
console.log('Бюджет на день: ', budgetDay);

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay >=600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay >=0 && budgetDay < 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что-то пошло не так');
}