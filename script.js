'use strict';

// 1
let arr = [];

arr = ['24', '45', '54', '100', '782', '219', '8973'];

for (let i = 0; i < arr.length; i++) {
  if (arr[i][0] === '2' || arr[i][0] === '4') {
    console.log(arr[i]);
  }
}

// 2

//функция возвращает количество делителей числа num
const checkDividers = function(num) {
  let dividersCount = 0;
  
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      dividersCount++;
    }
  }

  return dividersCount;
};

// циклом проверяем каждое число, которое удовлетворяет условию простого числа, т.е. имеет только 2 делителя, и выводим в консоль
for (let i = 1; i <= 100; i++) {
  if (checkDividers(i) === 2) {
    console.log(`${i} (делители этого числа: 1 и ${i})`);
  }
}