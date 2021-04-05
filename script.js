// 1 задание
let lang = prompt('Введите язык ru или en ?');

//a
if (lang === 'ru') {
  console.log('метод if: ', 'понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
} else if (lang === 'en') {
  console.log('метод if: ', 'monday, tuesday, wednesday, thursday, friday, saturday, sunday');
}

//b
switch(lang) {
  case 'ru':
    console.log('метод switch-case: ', 'понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
    break;
  case 'en':
    console.log('метод switch-case: ', 'monday, tuesday, wednesday, thursday, friday, saturday, sunday');
    break;
}

//c
const obj = {
  "ru": ['понедельник, вторник, среда, четверг, пятница, суббота, воскресенье'],
  "en": ['monday, tuesday, wednesday, thursday, friday, saturday, sunday'],
};

const arr = [];
arr.ru = ['понедельник, вторник, среда, четверг, пятница, суббота, воскресенье'];
arr.en = ['monday, tuesday, wednesday, thursday, friday, saturday, sunday'];

console.log('с помощью объекта: ', obj[lang]);
console.log('с помощью многомерного массива: ', arr[lang]);

// 2 задание
let namePerson = prompt('Введите имя');

namePerson === 'Артем' ? console.log('директор') : namePerson === 'Максим' ? console.log('преподаватель') : console.log('студент');