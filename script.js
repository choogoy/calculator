'use strict';

const week = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

for (let i = 0; i < week.length; i++) {
  let div = document.createElement('div');
  div.innerHTML = week[i];

  if (week[i] === 'суббота' || week[i] === 'воскресенье') {
    div.style.fontStyle = 'italic';
  }

  if (new Date().getDay() === i) {
    div.style.fontWeight = 'bold';
  }

  document.body.append(div);
}