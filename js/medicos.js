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


let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
let años = [2021, 2022];


let m = new Date().getMonth();
let y = new Date().getFullYear();
if(y===2021){
    y = 0;
}
let month = document.createElement('h6');
month.innerText = `${meses[m]} ${años[y]}` ;
let monthContainer = document.getElementById('calendar-month');
monthContainer.appendChild(month)


let totalDias = new Date(años[y],(m+1),0).getDate();
for(let i = 1; i<=totalDias; i++){
    let diasDelMes = document.createElement('li');
    diasDelMes.innerText = `${i}`;
    if(i===1){
        diasDelMes.classList.add('first-day', 'dias-mes', 'in-view')
    }else{
        diasDelMes.classList.add('dias-mes', 'in-view')
    }
    diasDelMes.setAttribute('id',`${años[y]}-${m}-${i}`);
    let calendarList = document.getElementById('calendar-list');
    calendarList.appendChild(diasDelMes);
}

function daysCreate(mes, año){
    totalDias = new Date(año,(mes+1),0).getDate();
    for(let i = 1; i<=totalDias; i++){
        let diasDelMes = document.createElement('li');
        diasDelMes.innerText = `${i}`;
        if(i===1){
            diasDelMes.classList.add('first-day', 'dias-mes', 'in-view')
        }else{
            diasDelMes.classList.add('dias-mes', 'in-view')
        }
        diasDelMes.setAttribute('id',`${año}-${mes}-${i}`);
        let calendarList = document.getElementById('calendar-list');
        calendarList.appendChild(diasDelMes);
    }
}

function nextMonth(){
    m++;
    if(m===12 && y===0){
        m = 0
        y++;
    };
    if(y===1 && m===12){
        y = 1;
        m = 11;
    }else{
        month.innerText = `${meses[m]} ${años[y]}`
        month.classList.add('card-text')
    }
    daysCreate(m,años[y]);
}
function monthBefore(){
    m--;
    if(m===-1){
        m = 11
        y--;
    };
    if(y===0 && m === (new Date().getMonth()-1)){
        y = 0;
        m = 11;
    }else{
        month.innerText = `${meses[m]} ${años[y]}`
        month.classList.add('card-text')
    }
    daysCreate(m,años[y]);
}


let nextBtn = document.getElementById('next-button');
nextBtn.addEventListener('click', nextMonth);

let befBtn = document.getElementById('before-button');
befBtn.addEventListener('click', monthBefore);

// function daysCreate(mes, año){
//     let totalDias = new Date(año,(mes+1),0).getDate();
//     for(let i = 1; i<=totalDias; i++){
//         let diasDelMes = document.createElement('li');
//         diasDelMes.innerText = `${i}`;
//         if(i===1){
//             diasDelMes.classList.add('first-day', 'dias-mes', 'in-view')
//         }else{
//             diasDelMes.classList.add('dias-mes', 'in-view')
//         }
//         diasDelMes.setAttribute('id',`${año}-${mes}-${i}`);
//         let calendarList = document.getElementById('calendar-list');
//         calendarList.appendChild(diasDelMes);
//     }
// }

// function removeMonthBefore(mes,año){
//     let totalDias = new Date(año,(mes),0).getDate();
//     for(let i=1; i<=totalDias;i++){
//         document.getElementById(`${años[y]}-${m}-${i}`)
//     }
// }
