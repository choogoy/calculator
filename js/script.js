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
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select'); // <= range :)

let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');
let inputs = document.querySelectorAll('input');

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const checkInput = function() {
    const summInputs = document.querySelectorAll('input[placeholder="Сумма"]');
    const nameInputs = document.querySelectorAll('input[placeholder="Наименование"]');

    console.log(summInputs);
    console.log(nameInputs);

    summInputs.forEach(input => {
        input.addEventListener('input', event => {
            event.target.value = event.target.value.replace (/\D/, '');
        });
    });

    nameInputs.forEach(input => {
        input.addEventListener('input', event => {
            event.target.value = event.target.value.replace(/[a-zA-Z0-9-]/, '');
        });
    });


    
};

const appData = {
    budget: 0,
    income: {}, // дополнительные доходы
    incomeMonth: 0,
    addIncome: [], // перечисляем дополнительные доходы
    expenses: {}, // дополнительные расходы
    addExpenses: [], // перечисляем возможные расходы
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function() {
        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
       
        periodSelect.addEventListener('input', function(event) {
            periodAmount.textContent = event.target.value;
            incomePeriodValue.value = appData.calcPeriod();
        });
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelectorAll('input').forEach(item => item.value = '');
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddBtn);
        checkInput();
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesAddBtn.style.display = 'none';
        }
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input').forEach(item => item.value = '');
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddBtn);
        checkInput();
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomeAddBtn.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    getIncome: function() {
        incomeItems.forEach(function(item){
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
            }
        });
 
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function() { // метод вычисляет сумму всех обязательных расходов за месяц
        for (let key in appData.expenses) {
           appData.expensesMonth += appData.expenses[key];
        }
    },
    getBudget: function() {  // метод возвращает Накопления за месяц (Доходы минус расходы)
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return targetAmount.value / appData.budgetMonth;
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
    calcPeriod: function() {
        return appData.budgetMonth * periodSelect.value;
    },
};

checkInput();

startBtn.addEventListener('click', function() {
    if (!isNumber(salaryAmount.value) || salaryAmount.value <= 0) {
        return;
    } else {
        appData.start();
    }
});

expensesAddBtn.addEventListener('click', appData.addExpensesBlock);
incomeAddBtn.addEventListener('click', appData.addIncomeBlock);