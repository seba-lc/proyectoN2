import { navbarInsert2, footerInsert } from "./helpers.js";
navbarInsert2();
footerInsert();

// console.log('1-   '+Date());
// console.log('2-   '+new Date().getDay());
// console.log('3-   '+new Date().getDate());
// console.log('4-   '+new Date().getMonth());
// console.log('5-   '+new Date().getFullYear());
// console.log('6-   '+new Date().getHours());
// console.log('7-   '+new Date().getMinutes());
// console.log('8-   '+new Date().getSeconds());
// console.log('9-   '+new Date().toDateString());
// console.log('10-   '+new Date().toLocaleDateString());
// console.log('11-   '+new Date().toLocaleString());
// console.log('12-   '+new Date().toLocaleTimeString());// Da la hora del meridiano 0
// console.log('13-   '+new Date().getUTCDate());
// console.log('14-   '+Date.now()); //Cuantos segundos pasaron desde el 1enero de 1870

//momentojs.com librería para manejar el tiempo en nuestras páginas

// console.log(new Date(2021,11,1).getDay());
// console.log(new Date(2021,12,0).getDate());// el 0 es el último día del mes pasado!!!

let meses = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
let años = [2021, 2022];
let dias = [ "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

function daysOfMonth(mes, año) {
  return new Date(año, mes + 1, 0).getDate();
}

function firstDayMonth(mes, año){
  return new Date (año, mes, 1).getDay();
}

let mesesRestantes = [];

class Month{
  constructor(año, mes, dias, firstDay){
    this.año = año;
    this.mes = mes;
    this.dias = dias;
    this.firstDay = firstDay;
  }

  createCalendarMonth(){
  let calendarMonth = document.createElement('div');
  calendarMonth.innerHTML = `
  <div class="d-flex justify-content-between pt-3">
    <div class="ms-3" id="before-button-${this.mes}-${this.año}"><i class="fas fa-chevron-left"></i></div>
    <div id="calendar-month">${meses[this.mes]} ${this.año}</div>
    <div class="me-3" id="next-button-${this.mes}-${this.año}"><i class="fas fa-chevron-right"></i></div>
  </div>
  <ol class="calendar p-0" id="calendar-list-${this.mes}-${this.año}">
    <li class="day-name">Lun</li>
    <li class="day-name">Mar</li>
    <li class="day-name">Mier</li>
    <li class="day-name">Jue</li>
    <li class="day-name">Vie</li>
    <li class="day-name">Sab</li>
    <li class="day-name">Dom</li>
  </ol>
  `;
  calendarMonth.setAttribute('id', `${this.mes}-${this.año}`)
  let calendarContainer = document.getElementById('calendar-container');
  calendarContainer.appendChild(calendarMonth);
  
  for(let i = 1; i<=this.dias; i++){
    let calendarDays = document.createElement('li');
    calendarDays.innerText = `${i}`;
    if(i===1){
      calendarDays.style.gridColumnStart = `${this.firstDay}`
    }
    calendarDays.classList.add('dias-mes');
    calendarDays.setAttribute('id',`${i}-${this.mes}-${this.año}`);
    let calendarList = document.getElementById(`calendar-list-${this.mes}-${this.año}`);
    calendarList.appendChild(calendarDays);
  }
  }

}

function today(){
  let todayYear = new Date().getFullYear();
  let todayMonth = new Date().getMonth();
  let todayDay  = new Date().getDate();
  let todayBgColor = document.getElementById(`${todayDay}-${todayMonth}-${todayYear}`);
  todayBgColor.classList.add('bg-success', 'rounded-circle');
}



let todayYear = new Date().getFullYear();
let todayMonth = new Date().getMonth();

let firstMonth = new Month(todayYear, todayMonth, daysOfMonth(todayMonth, todayYear), firstDayMonth(todayMonth, todayYear));
mesesRestantes.push(firstMonth);


for (let i = 0; i<12; i++){ //Para generar 12 meses a partir del mes que estoy parado
  todayMonth++;
  if(todayMonth === 12){
    todayMonth = 0;
    todayYear++;
  }
  mesesRestantes.push(new Month(todayYear, todayMonth, daysOfMonth(todayMonth, todayYear), firstDayMonth(todayMonth, todayYear)))
}

for (let i = 0; i<13; i++){
  mesesRestantes[i].createCalendarMonth();
}

today();

console.log(mesesRestantes);

for (let i = 0; i<13; i++){
  if(i===0){
    let todayMonth = document.getElementById(`${mesesRestantes[0].mes}-${mesesRestantes[0].año}`);
    todayMonth.classList.add('in-view');
  }else{
    let todayMonth = document.getElementById(`${mesesRestantes[i].mes}-${mesesRestantes[i].año}`);
    todayMonth.classList.add('not-in-view');
  }
}

for(let i=0; i<13; i++){
  let nextBtn = document.getElementById(`next-button-${mesesRestantes[i].mes}-${mesesRestantes[i].año}`)
  nextBtn.addEventListener('click', nextMonth);
}

let k = 0;
let j = 0;
function nextMonth(event){
  if(j<12){
    let btnId = event.target.parentElement.parentElement.parentElement.id;
    let elementId = document.getElementById(`${btnId}`);
    elementId.classList.replace('in-view', 'not-in-view');
    j++;
    k++;
    let nextId = `${mesesRestantes[j].mes}-${mesesRestantes[j].año}`;
    let nextElementId = document.getElementById(`${nextId}`);
    nextElementId.classList.replace('not-in-view', 'in-view');
  }
}

for(let i=0; i<13; i++){
  let beforeBtn = document.getElementById(`before-button-${mesesRestantes[i].mes}-${mesesRestantes[i].año}`)
  beforeBtn.addEventListener('click', beforeMonth);
}

function beforeMonth(event){
  if(k>0){
    let btnId = event.target.parentElement.parentElement.parentElement.id;
    // console.log(btnId);
    let elementId = document.getElementById(`${btnId}`);
    elementId.classList.replace('in-view', 'not-in-view');
    j--;
    k--;
    let beforeId = `${mesesRestantes[k].mes}-${mesesRestantes[k].año}`;
    let beforeElementId = document.getElementById(`${beforeId}`);
    beforeElementId.classList.replace('not-in-view', 'in-view');
  }
}


