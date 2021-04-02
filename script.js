'use strict';

const num = 266219; // исходное число
const numLength = num.toString().length; // приводим число к строке и находим ее длину
let result = 1; // начальное значение произведения цифр числа num

// перебираем все элементы строки и приводим их к типу данных number
for (let i = 1; i < numLength; i++) {
  result *= +num.toString()[i];
}

/*  возводим в степень 3 (ES7), приводим значение к типу данных string,
    выводим первые две цифры и унарным плюсом приводим к типу данных number */
console.log(+(result ** 3).toString().substr(0,2)); 