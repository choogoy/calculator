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
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const inputs = document.querySelectorAll('input');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');

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

// записываем куку
const setCookie = (name, value, options = {}) => {

    options = {
      path: '/',
      // при необходимости добавьте другие значения по умолчанию
      ...options
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
};

// считываем куку
const getCookie = name => {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

// удаляем куку
const deleteCookie = name => {
    setCookie(name, "", {
      'max-age': -1
    });
};

// считываем localStorage
const getStorage = () => {
    const getData = JSON.parse(localStorage.getItem('calc')) || [];
    return getData;
};

// выводим на страницу из localStorage
const showStorage = () => {
    const data = getStorage();

    if (data.length === undefined) {
        document.querySelectorAll('.data input[type=text]').forEach(input => input.setAttribute("disabled", true));
        expensesAddBtn.setAttribute("disabled", true);
        incomeAddBtn.setAttribute("disabled", true);
        startBtn.style.display = 'none';
        cancelBtn.style.display = 'block';
        additionalExpensesValue.value = data.addExpenses.join(', ') || '';
        additionalIncomeValue.value = data.addIncome.join(', ') || '';
    }

    budgetMonthValue.value = data.budgetMonth || 0;
    budgetDayValue.value = data.budgetDay || 0;
    expensesMonthValue.value = data.expensesMonth || 0;

};

// записываем в localStorage
const setStorage = () => localStorage.setItem('calc', JSON.stringify(appData));

// очищаем localStorage
const clearStorage = () => localStorage.clear('calc');

// создаем куки
const createCookies = () => {
    for (let key of Object.keys(appData)) {
        if (key !== undefined) {
            setCookie(key, JSON.stringify(appData[key]));
        }
    }
    document.cookie = "isLoad=true"; //  <= зачем эта кука я так и не понял из задания =)
};

// очищаем куки
const clearCookies = () => {
    for (let key of Object.keys(appData)) {
        deleteCookie(key);
    }
    deleteCookie("isLoad");
    clearInterval(cookieInterval);
};

// проверяем что все куки на месте иначе сносим все под корень
const checkCookies = () => {
    const response = getStorage();
    
    for (let key of Object.keys(response)) {
        if (!getCookie(key)) {
            clearCookies();
            clearStorage();
            appData.reset();
        }
    }

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
        this.getAddExpInc();
        this.getInfoDeposit();
        this.getBudget();
        this.getStatusIncome();
        this.showResult();
        setStorage();
        createCookies();
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
    addExpIncBlock() {
        const selector = this.className.split(' ')[1].split('_')[0];
        const items = document.getElementsByClassName(`${selector}-items`);
        let cloneItem = items[0].cloneNode(true); 
        cloneItem.querySelectorAll('input').forEach(item => item.value = '');
        items[0].parentNode.insertBefore(cloneItem, this);
        checkInput();
        if (items.length === 3) {
            this.style.display = 'none';
        }
    }
    getExpInc() {
        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');

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
    getAddExpInc() {
        const addExpenses = additionalExpensesItem.value.split(',');
        const incomeArray = [];

        const pushArr = (array, resultArray) => {
            array.forEach(item => {
                item = item.trim();
                if (item !== '') {
                    resultArray.push(item);
                }
            });
        };
        
        additionalIncomeItem.forEach(item => incomeArray.push(item.value));

        pushArr(addExpenses, this.addExpenses);
        pushArr(incomeArray, this.addIncome);
    }
    getExpensesMonth() { // метод вычисляет сумму всех обязательных расходов за месяц
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    }
    getBudget() {  // метод возвращает Накопления за месяц (Доходы минус расходы)
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth + monthDeposit - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    getTargetMonth() {
        return (targetAmount.value / this.budgetMonth) || '0';
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
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }    
    reset() {
        const inputTextData = document.querySelectorAll('.data input[type=text]');
        const resultInputAll = document.querySelectorAll('.result input[type=text]');
    
        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');

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
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
    }
    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = +depositPercent.value;
            this.moneyDeposit = +depositAmount.value;
        }
    }
    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.value = '';
            depositPercent.style.display = 'inline-block';
            depositPercent.addEventListener('input', event => {
                if (isNumber(event.target.value) && event.target.value > 0 && event.target.value < 100) {
                    this.percentDeposit = +event.target.value;
                } else {
                    alert('Введите корректное значение в поле проценты');
                    depositPercent.value = '';
                }
            });
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
        }
    }
    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }
    eventsListeners() {
        startBtn.addEventListener('click', this.start.bind(this));
        expensesAddBtn.addEventListener('click', this.addExpIncBlock);
        incomeAddBtn.addEventListener('click', this.addExpIncBlock);
        salaryAmount.addEventListener('keyup', this.check);
        cancelBtn.addEventListener('click', () => this.reset(this));  
        periodSelect.addEventListener('input', () => periodAmount.innerHTML = periodSelect.value);
        depositCheck.addEventListener('change', this.depositHandler.bind(this));

        cancelBtn.addEventListener('click', () => {
            clearStorage();
            clearCookies();
        });
        getStorage(); // получаем данные из localStorage
        checkCookies(); // проверяем куки
        showStorage(); // выводим на страницу данные
        checkInput();
    }
}

const appData = new AppData();

// проверяем каждые 2 секунды наличие всех кук
let cookieInterval = setInterval(checkCookies, 2000);

appData.eventsListeners();