'use strict';

const startBtn = document.getElementById('start'); // Кнопку "Рассчитать" через id
const cancelBtn = document.getElementById('cancel');
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

const AppData = function() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {}; // дополнительные доходы
    this.incomeMonth = 0;
    this.addIncome = []; // перечисляем дополнительные доходы
    this.expenses = {}; // дополнительные расходы
    this.expensesMonth = 0;
    this.addExpenses = []; // перечисляем возможные расходы
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.check = function() {
    if (salaryAmount.value !== '') {
        startBtn.removeAttribute("disabled");
    }
};

AppData.prototype.start = function() {
    if (salaryAmount.value === '' || !isNumber(salaryAmount.value) || salaryAmount.value <= 0) {
        startBtn.removeAttribute("disabled", true);
        return;
    }

    document.querySelectorAll('.data input[type=text]').forEach (input => input.setAttribute("disabled", true));

    expensesAddBtn.setAttribute("disabled", true);
    incomeAddBtn.setAttribute("disabled", true);
    startBtn.style.display = 'none';
    cancelBtn.style.display = 'block';

    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.getInfoDeposit();
    this.getStatusIncome();
    this.showResult();
};

AppData.prototype.showResult = function() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    
    periodSelect.addEventListener('input', function() {
        incomePeriodValue.value = _this.calcPeriod();
    });
};

AppData.prototype.addExpensesBlock = function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelectorAll('input').forEach(item => item.value = '');
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddBtn);
    checkInput();
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        expensesAddBtn.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(function(item){
        const itemExpenses = item.querySelector('.expenses-title').value;
        const cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = +cashExpenses;
        }
    });
};

AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelectorAll('input').forEach(item => item.value = '');
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddBtn);
    checkInput();
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        incomeAddBtn.style.display = 'none';
    }
};

AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems.forEach(function(item){
        const itemIncome = item.querySelector('.income-title').value;
        const cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = +cashIncome;
        }
    });
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};

AppData.prototype.getAddExpenses = function() {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getAddIncome = function() {
    const _this = this;
    additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.getExpensesMonth = function() { // метод вычисляет сумму всех обязательных расходов за месяц
    for (let key in this.expenses) {
        this.expensesMonth += this.expenses[key];
    }
};

AppData.prototype.getBudget = function() {  // метод возвращает Накопления за месяц (Доходы минус расходы)
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function() {
    return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function() { // метод возвращает уровень дохода
    if (this.budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >=600 && this.budgetDay < 1200) {
        return ('У вас средний уровень дохода');
    } else if (this.budgetDay >=0 && this.budgetDay < 600) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return ('Что-то пошло не так');
    }
};

AppData.prototype.getInfoDeposit = function() {
    if (this.deposit) {
        do {
            this.percentDeposit = +prompt('Какой годовой процент?', 10);
        } while (!isNumber(this.percentDeposit));

        do {
            this.moneyDeposit = +prompt('Какая сумма заложена?', 100000);
        } while (!isNumber(this.moneyDeposit));
    }
};

AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.reset = function() {
    
    const inputTextData = document.querySelectorAll('.data input[type=text]');
    const resultInputAll = document.querySelectorAll('.result input[type=text]');

    inputTextData.forEach(function(elem) {
        elem.value = '';
        elem.removeAttribute("disabled");
        periodSelect.value = '0';
        periodAmount.innerHTML = periodSelect.value;
    });

    resultInputAll.forEach(function(elem) {
        elem.value = '';
    });

    for (let i = 1; i < incomeItems.length; i++) {
        incomeItems[i].parentNode.removeChild(incomeItems[i]);
        incomeAddBtn.style.display = 'block';
    }

    for (let i = 1; i < expensesItems.length; i++) {
        expensesItems[i].parentNode.removeChild(expensesItems[i]);
        expensesAddBtn.style.display = 'block';
    }

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {}; // дополнительные доходы
    this.incomeMonth = 0;
    this.addIncome = []; // перечисляем дополнительные доходы
    this.expenses = {}; // дополнительные расходы
    this.expensesMonth = 0;
    this.addExpenses = []; // перечисляем возможные расходы
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;

    cancelBtn.style.display = 'none';
    startBtn.style.display = 'block';
    expensesAddBtn.removeAttribute("disabled");
    incomeAddBtn.removeAttribute("disabled");
    depositCheck.checked = false;
};

AppData.prototype.eventsListeners = function() {
    startBtn.addEventListener('click', this.start.bind(this));
    expensesAddBtn.addEventListener('click', this.addExpensesBlock);
    incomeAddBtn.addEventListener('click', this.addIncomeBlock);
    salaryAmount.addEventListener('keyup', this.check);
    cancelBtn.addEventListener('click', this.reset.bind(this));
    
    periodSelect.addEventListener('input', function() {
        periodAmount.innerHTML = periodSelect.value;
    });

    checkInput();
};

const appData = new AppData();

appData.eventsListeners();