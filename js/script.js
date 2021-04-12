'use strict';

const startBtn = document.getElementById('start'); // Кнопку "Рассчитать" через id
const incomeAddBtn = document.getElementsByTagName('button')[0]; // Кнопки “+” (плюс) через Tag, каждую в своей переменной.
const expensesAddBtn = document.getElementsByTagName('button')[1];  // Кнопки “+” (плюс) через Tag, каждую в своей переменной.
const depositCheck = document.querySelector('#deposit-check'); // Чекбокс по id через querySelector
const additionalIncomeItem = document.querySelectorAll('.additional_income-item'); // Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll

// Каждый элемент в правой части программы через класс(не через querySelector), которые имеют в имени класса "-value", начиная с class="budget_day-value" и заканчивая class="target_month-value">
const budgetMonthValue = document.getElementsByClassName('result-total')[0];
const budgetDayValue = document.getElementsByClassName('result-total')[1];
const expensesMonthValue = document.getElementsByClassName('result-total')[2];
const additionalIncomeValue = document.getElementsByClassName('result-total')[3];
const additionalExpensesValue = document.getElementsByClassName('result-total')[4];
const incomePeriodValue = document.getElementsByClassName('result-total')[5];
const targetMonthValue = document.getElementsByClassName('result-total')[6];

// Оставшиеся поля через querySelector каждый в отдельную переменную: поля ввода (input) с левой стороны и не забудьте про range.
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select'); // <= range :)

let money;

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
};

// start();

const appData = {
    budget: +money,
    income: {}, // дополнительные доходы
    addIncome: [], // перечисляем дополнительные доходы
    expenses: {}, // дополнительные расходы
    addExpenses: [], // перечисляем возможные расходы
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 300000,
    period: 3,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome, cashIncome;
            do {
                itemIncome = prompt('Какой у вас есть дополнительный заработок', 'фриланс');
            } while (!isNaN(itemIncome));

            do {
                cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 25000);
            } while (!isNumber(cashIncome));

            appData.income[itemIncome] = +cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'бензин, книги');
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            let question, amount;
            do {
                question = prompt('Введите обязательную статью расходов?', 'коммуналка');
            } while (!isNaN(question));

            do {
                amount = prompt('Во сколько это обойдется?', 15000);
            } while (!isNumber(amount));
                appData.expenses[question] = +amount;
        }
    },
    getExpensesMonth: function() { // метод возвращает сумму всех обязательных расходов за месяц
        for (let amount in appData.expenses) {
           appData.expensesMonth += appData.expenses[amount];
        }
    },
    getBudget: function() {  // метод возвращает Накопления за месяц (Доходы минус расходы)
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return Math.ceil(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: function() { // метод возвращает уровень дохода
        if (appData.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (appData.budgetDay >=600 && appData.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (appData.budgetDay >=0 && appData.budgetDay < 600) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что-то пошло не так');
        }
    },
    getInfoDeposit: function() {
        if (appData.deposit) {
            do {
                appData.percentDeposit = +prompt('Какой годовой процент?', 10);
            } while (!isNumber(appData.percentDeposit));

            do {
                appData.moneyDeposit = +prompt('Какая сумма заложена?', 100000);
            } while (!isNumber(appData.moneyDeposit));
        }
    },
    calcSaveMoney: function() {
        return appData.budgetMonth * appData.period;
    },
};

// appData.asking();
// appData.getExpensesMonth();
// appData.getBudget();

if (appData.getTargetMonth() > 0) {
    console.log (`Цель будет достигнута за ${appData.getTargetMonth()} месяцев(-а)`);
} else {
    console.log (`Цель не будет достигнута`);
}

console.log('расходы за месяц составят:', appData.expensesMonth);
console.log(appData.getStatusIncome()); // уровень дохода

console.log('Наша программа включает в себя данные: ');

// for (let key in appData) {
//     console.log('свойство: ' + key);
//     console.log('значение: ' + appData[key]);
// }

appData.getInfoDeposit();
console.log(appData.calcSaveMoney());

for (let i = 0; i < appData.addExpenses.length; i++) {
    appData.addExpenses.splice(i, 1, appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1));
}

console.log(appData.addExpenses.join(', '));