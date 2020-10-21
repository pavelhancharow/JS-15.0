'use strict';

let book = document.querySelectorAll('.book'),
  books = document.querySelector('.books');

book[0].before(book[1]);
book[3].before(book[4]);
books.append(book[2]);

document.body.style.backgroundImage = "url(../image/you-dont-know-js.jpg)";

let titleBook3 = book[4].querySelector('h2'),
  link = titleBook3.querySelector('a');
link.textContent = 'Книга 3. this и Прототипы Объектов';

let adv = document.querySelector('.adv');
adv.remove();

let listBook2 = book[0].querySelector('ul'),
  itemBook2 = listBook2.querySelectorAll('li');
listBook2.append(itemBook2[2]);
itemBook2[2].after(itemBook2[10]);
itemBook2[7].before(itemBook2[8]);
itemBook2[3].after(itemBook2[8]);
itemBook2[8].before(itemBook2[6]);

let listBook5 = book[5].querySelector('ul'),
  itemBook5 = listBook5.querySelectorAll('li');
itemBook5[1].after(itemBook5[9]);
itemBook5[4].after(itemBook5[2]);
itemBook5[7].after(itemBook5[5]);

let listBook6 = book[2].querySelector('ul');
listBook6.insertAdjacentHTML('beforeend', `<li>Глава 8: За пределами ES6</li>`);
let itemBook6 = listBook6.querySelectorAll('li');
itemBook6[9].before(itemBook6[10]);