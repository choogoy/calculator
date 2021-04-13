'use strict';

const week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']; // вспомогательный массив с днями недели
const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']; // вспомогательный массив с месяцами

// вспомогательный объект из массивов с возможными окончаниями слов
const endings = {
    hours:    ['час', 'часа', 'часов'],
    minutes:  ['минута', 'минуты', 'минут'],
    seconds:  ['секунда', 'секунды', 'секунд'],
};

// создаем 2 новых элемента
const dateLong = document.createElement('div');
const date = document.createElement('div');

// 2) Для вывода в формате (а) напишите функцию, которая будет менять склонение слов в зависимости от числа, "час, часов, часа"
// функция изменяет окончание слова в зависимости от числа
const ending = function(num, arr) {
  return arr[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
};

// 3) Для вывода в формате (б) напишите функцию, которая будет добавлять 0 перед значениями которые состоят из одной цифры (из 9:5:3  1.6.2019 сделает 09:05:03 01.06.2019)
// функция добавляет "0" если число меньше 10
const addZero = function(num) {
  if (num < 10) {
    return '0' + num;
  } else {
    return num;
  }
};

// добавляем атрибут data элементам
dateLong.setAttribute('data', 'длинная дата');
date.setAttribute('data', 'короткая дата');

//добавляем 2 созданных элемента на страницу
document.body.append(dateLong);
document.body.append(date);

// 1) Выведите на страницу текущую дату и время в 2-х форматах: 
// a) 'Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды'  
// б) '04.02.2020 - 21:05:33'

// функция выводит на страницу текущую дату и время в двух форматах
const timer = function() {
  let currentDate = new Date();
  dateLong.innerHTML = `а) Сегодня ${week[currentDate.getDay()]}, ${currentDate.getDate()} ${month[currentDate.getMonth()]} ${currentDate.getUTCFullYear()} года,
                          ${currentDate.getHours()} ${ending(currentDate.getHours(), endings.hours)}
                          ${currentDate.getMinutes()} ${ending((currentDate.getMinutes()), endings.minutes)}
                          ${currentDate.getSeconds()} ${ending(currentDate.getSeconds(), endings.seconds)}`;

  date.innerHTML =    `б) ${addZero(currentDate.getDate())}.${addZero(currentDate.getMonth()+1)}.${currentDate.getUTCFullYear()} -
                          ${addZero(currentDate.getHours())}:${addZero(currentDate.getMinutes())}:${addZero(currentDate.getSeconds())}`;
};

timer();

// 4) С помощью функции setInterval, реализуйте обновление даты и времени каждую секунду 
//запускаем таймер
setInterval(timer, 1000);