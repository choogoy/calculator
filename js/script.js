'use strict';

const startBtn = document.getElementById('start'); // Кнопку "Рассчитать" через id
const cancelBtn = document.getElementById('cancel');
const incomeAddBtn = document.getElementsByTagName('button')[0]; // Кнопки “+” (плюс) через Tag, каждую в своей переменной.
const expensesAddBtn = document.getElementsByTagName('button')[1];  // Кнопки “+” (плюс) через Tag, каждую в своей переменной.
const depositCheck = document.querySelector('#deposit-check'); // Чекбокс по id через querySelector
const additionalIncomeItem = document.querySelectorAll('.additional_income-item'); // Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll
const budgetMonthValue = document.getElementsByClassName('result-total')[0];
const budgetDayValue = document.getElementsByClassName('result-total')[1];
const expensesMonthValue = document.getElementsByClassName('result-total')[2];
const additionalIncomeValue = document.getElementsByClassName('result-total')[3];
const additionalExpensesValue = document.getElementsByClassName('result-total')[4];
const incomePeriodValue = document.getElementsByClassName('result-total')[5];
const targetMonthValue = document.getElementsByClassName('result-total')[6];
const salaryAmount = document.querySelector('.salary-amount');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select'); // <= range :)
const periodAmount = document.querySelector('.period-amount');
const inputs = document.querySelectorAll('input');

let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');

const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);

const checkInput = () => {
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

class AppData {
    constructor() {
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
    }
    check() {
        if (salaryAmount.value !== '') {
            startBtn.removeAttribute("disabled");
        }
    }
    start() {
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
    
        this.getExpInc();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.getInfoDeposit();
        this.getStatusIncome();
        this.showResult();
    }
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        
        periodSelect.addEventListener('input', () => incomePeriodValue.value = this.calcPeriod());
    }
    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelectorAll('input').forEach(item => item.value = '');
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddBtn);
        checkInput();
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesAddBtn.style.display = 'none';
        }
    } 
    addIncomeBlock() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input').forEach(item => item.value = '');
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddBtn);
        checkInput();
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomeAddBtn.style.display = 'none';
        }
    }
    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const cashAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && cashAmount !== '') {
                this[startStr][itemTitle] = +cashAmount;
            }
        };
    
        incomeItems.forEach(count);
        expensesItems.forEach(count);
    
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }
    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }
    getAddIncome() {
        additionalIncomeItem.forEach(item => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }
    getExpensesMonth() { // метод вычисляет сумму всех обязательных расходов за месяц
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    }
    getBudget() {  // метод возвращает Накопления за месяц (Доходы минус расходы)
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }
    getStatusIncome() { // метод возвращает уровень дохода
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay >=600 && this.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay >=0 && this.budgetDay < 600) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что-то пошло не так');
        }
    }
    getInfoDeposit() {
        if (this.deposit) {
            do {
                this.percentDeposit = +prompt('Какой годовой процент?', 10);
            } while (!isNumber(this.percentDeposit));
    
            do {
                this.moneyDeposit = +prompt('Какая сумма заложена?', 100000);
            } while (!isNumber(this.moneyDeposit));
        }
    }
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }    
    reset() {
        const inputTextData = document.querySelectorAll('.data input[type=text]');
        const resultInputAll = document.querySelectorAll('.result input[type=text]');
    
        inputTextData.forEach(elem => {
            elem.value = '';
            elem.removeAttribute("disabled");
            periodSelect.value = '0';
            periodAmount.innerHTML = periodSelect.value;
        });
    
        resultInputAll.forEach(elem => elem.value = '');
    
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
    }
    eventsListeners() {
        startBtn.addEventListener('click', this.start.bind(this));
        expensesAddBtn.addEventListener('click', this.addExpensesBlock);
        incomeAddBtn.addEventListener('click', this.addIncomeBlock);
        salaryAmount.addEventListener('keyup', this.check);
        cancelBtn.addEventListener('click', this.reset.bind(this));  
        periodSelect.addEventListener('input', () => periodAmount.innerHTML = periodSelect.value);
        
        checkInput();
    }
}

const appData = new AppData();

appData.eventsListeners();