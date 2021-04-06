'use strict';

const money = +prompt('Ваш месячный доход?', 60000), // Доход за месяц
    income = 50000, // дополнительный доходод
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'бензин, книги'), // дополнительные расходы
    deposit = confirm('Есть ли у вас депозит в банке?'), // наличие депозита 
    mission = 300000, // сумма, которую надо накопить 
    expenses1 = prompt('Введите обязательную статью расходов?', 'коммуналка'),
    amount1 = +prompt('Во сколько это обойдется?', 15000),
    expenses2 = prompt('Введите обязательную статью расходов?', 'продукты'),
    amount2 = +prompt('Во сколько это обойдется?', 20000);

// Функция возвращает сумму всех обязательных расходов за месяц
const getExpensesMonth = function() {
    return (amount1 + amount2);
};

// Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = function() {
    return (money - getExpensesMonth());
};

// результат месячного накопления
const accumulatedMonth = getAccumulatedMonth();

// Функция Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления (accumulatedMonth) и возвращает результат
const getTargetMonth = function() {
    return (Math.ceil(mission / accumulatedMonth));
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

console.log('тип данных money:', showTypeOf(money));
console.log('тип данных income:', showTypeOf(income));
console.log('тип данных deposit:', showTypeOf(deposit));
console.log('расходы за месяц составят:', getExpensesMonth());
console.log(addExpenses.toLowerCase().split(', '));
console.log(`Цель будет достигнута за ${getTargetMonth()} месяцев(-а)`);
console.log('Бюджет на день:', budgetDay);
console.log(getStatusIncome());