'use strict';

const num = 5; // не строка
const str = ' короткая строка   ';
const longStr = '   длинная строка больше 30 символов ';

const checkString = function(argument) {
  if (typeof argument === 'string') {
    const argumentLength = argument.trim().length; // длина строки без пробелов в начале и в конце
    if (argumentLength > 30) {
      return (argument.trim().substring(0, 30) + '...');
    } else {
      return (argument.trim());
    }
  } else {
    return ('в качестве аргумента передана не строка');
  }
};

console.log(checkString(num));
console.log(checkString(str));
console.log(checkString(longStr));