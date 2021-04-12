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

dateLong.setAttribute('data', 'длинная дата');
date.setAttribute('data', 'короткая дата');

//добавляем 2 созданных элемента на страницу
document.body.append(dateLong);
document.body.append(date);

// функция изменяет окончание слова в зависимости от числа
const ending = function(num, arr) {
  return arr[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
};

// функция добавляет "0" если число меньше 10
const addZero = function(num) {
  if (num < 10) {
    return '0' + num;
  } else {
    return num;
  }
};

// функция выводит на страницу текущую дату и время в двух форматах
const timer = function() {
  const currentDate = new Date();
  let timerStr = '';
  let timerStrLong = '';

  // формируем строку с развернутой датой
  timerStrLong = `а) Сегодня ${week[currentDate.getDay()]}, ${currentDate.getDate()} ${month[currentDate.getMonth()]} ${currentDate.getUTCFullYear()} года,
    ${currentDate.getHours()} ${ending(currentDate.getHours(), endings.hours)}
    ${currentDate.getMinutes()} ${ending(currentDate.getMinutes(), endings.minutes)}
    ${currentDate.getSeconds()} ${ending(currentDate.getSeconds(), endings.seconds)}`;
  
  // формируем строку с короткой датой
  timerStr = `б) ${addZero(currentDate.getDate())}.${addZero(currentDate.getMonth()+1)}.${currentDate.getUTCFullYear()} -
    ${addZero(currentDate.getHours())}:${addZero(currentDate.getMinutes())}:${addZero(currentDate.getSeconds())}`;
  
  dateLong.innerHTML = timerStrLong;
  date.innerHTML = timerStr;
};

// запускаем таймер
setInterval(timer, 1000);