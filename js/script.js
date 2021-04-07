'use strict';

const income = 50000, // дополнительный доходод
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'бензин, книги'), // дополнительные расходы
    deposit = confirm('Есть ли у вас депозит в банке?'), // наличие депозита 
    mission = 300000, // сумма, которую надо накопить 
    expenses = [];

let money;

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const start = function() {

    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));

    // money = prompt('Ваш месячный доход?');
    // while (!isNumber(money)) {
    //     money = prompt('Ваш месячный доход?');
    // }

};

start();

// Функция возвращает сумму всех обязательных расходов за месяц
const getExpensesMonth = function() {
    let sum = 0;
    let amount;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?', 'коммуналка');

        do {
            amount = prompt('Во сколько это обойдется?', 15000);
        } while (!isNumber(amount));
            sum += +amount;

    }
    return sum;
};

const expensesAmount = getExpensesMonth();

// Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = function() {
    return (+money - expensesAmount);
};

// результат месячного накопления
const accumulatedMonth = getAccumulatedMonth();

// Функция Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления (accumulatedMonth) и возвращает результат
const getTargetMonth = function() {
    let period = Math.ceil(mission / accumulatedMonth);
    if (period < 0) {
        return (`Цель не будет достигнута`);
    } else {
        return (`Цель будет достигнута за ${period} месяцев(-а)`);
    }
};

// дневной бюджет
const budgetDay = Math.floor(accumulatedMonth / 30);

// Функция возвращает уровень дохода
const getStatusIncome = function() {
    if (budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (budgetDay >=600 && budgetDay < 1200) {
        return ('У вас средний уровень дохода');
    } else if (budgetDay >=0 && budgetDay < 600) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return ('Что-то пошло не так');
    }
};

// Функция возвращает тип данных
const showTypeOf = function(data) {
    return typeof data;
};

console.log('тип данных money:', showTypeOf(+money));
console.log('тип данных income:', showTypeOf(income));
console.log('тип данных deposit:', showTypeOf(deposit));
console.log('расходы за месяц составят:', expensesAmount);
console.log(addExpenses.toLowerCase().split(', '));
console.log(getTargetMonth());
console.log('Бюджет на день:', budgetDay);
console.log(getStatusIncome());