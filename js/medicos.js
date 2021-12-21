import { navbarInsert2, footerInsert } from "./helpers.js";
navbarInsert2();
footerInsert();

let userLogged = JSON.parse(localStorage.getItem('userLogged'));

//COMIENZO MEDICO

let medicos = JSON.parse(localStorage.getItem('medicos'));

let idMedico = window.location.hash.slice(1);
let medicoDesc = medicos.find(medico => medico.id == idMedico)

let medicoInfo = document.createElement('div');
medicoInfo.innerHTML = `
<div class="medico-img d-flex justify-content-center pt-5">
  <img src="/assets/img/${medicoDesc.foto}" alt="foto-medico">
</div>
<h4 class="card-title mt-2 text-center">${medicoDesc.nombre} - Especialidad: ${medicoDesc.especialidad}</h5>
<p class="card-text mx-5 text-center my-3">"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi illum nemo, modi quis libero repudiandae! A hic itaque veniam dolor neque, excepturi qui quaerat, alias possimus laboriosam sequi, iure explicabo!"</p>
<h5 class="card-title mt-2">DISPONIBILIDAD DE TURNOS</h5>
`;
medicoInfo.classList.add('d-flex', 'flex-column', 'align-items-center');
let infoContainer = document.getElementById('medico-id');
infoContainer.appendChild(medicoInfo);


//FIN MEDICO

//COMIENZO CALENDARIO

let meses = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

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
    calendarDays.style.cursor = 'pointer';
    calendarDays.addEventListener('click', verTurnos);
    let calendarList = document.getElementById(`calendar-list-${this.mes}-${this.año}`);
    calendarList.appendChild(calendarDays);
  }
  }

}

//DIA DE HOY
function today(){
  let todayYear = new Date().getFullYear();
  let todayMonth = new Date().getMonth();
  let todayDay  = new Date().getDate();
  let todayBgColor = document.getElementById(`${todayDay}-${todayMonth}-${todayYear}`);
  todayBgColor.classList.add('bg-success', 'rounded-circle');
}
//FIN DIA DE HOY

//PRIMER MES correpondiente al día de hoy
let todayYear = new Date().getFullYear();
let todayMonth = new Date().getMonth();

let firstMonth = new Month(todayYear, todayMonth, daysOfMonth(todayMonth, todayYear), firstDayMonth(todayMonth, todayYear));
mesesRestantes.push(firstMonth);
//FIN DEL PRIMER MES

//GENERACIÓN DE LOS PROXIMOS 12 MESES, para mas de 12 meses le debería cambiar el valor a i
for (let i = 0; i<12; i++){
  todayMonth++;
  if(todayMonth === 12){
    todayMonth = 0;
    todayYear++;
  }
  mesesRestantes.push(new Month(todayYear, todayMonth, daysOfMonth(todayMonth, todayYear), firstDayMonth(todayMonth, todayYear)))
}
//FIN DE GENERACION DE LOS 12 MESES (PARA EL ARRAY)

//CREACIÓN DE LOS MESES EN LA PANTALLA
for (let i = 0; i<13; i++){
  mesesRestantes[i].createCalendarMonth();
}

today(); //Señal del día de hoy


//PERMITIR QUE SE VEA UNICAMENTE EL MES DE HOY-COMIENZO
for (let i = 0; i<13; i++){
  if(i===0){
    let todayMonth = document.getElementById(`${mesesRestantes[0].mes}-${mesesRestantes[0].año}`);
    todayMonth.classList.add('in-view');
  }else{
    let todayMonth = document.getElementById(`${mesesRestantes[i].mes}-${mesesRestantes[i].año}`);
    todayMonth.classList.add('not-in-view');
  }
}
//FIN

//GENERACION DEL BOTON Y DINAMISMO PARA PASAR DE MES A MES
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
    let elementId = document.getElementById(`${btnId}`);
    elementId.classList.replace('in-view', 'not-in-view');
    j--;
    k--;
    let beforeId = `${mesesRestantes[k].mes}-${mesesRestantes[k].año}`;
    let beforeElementId = document.getElementById(`${beforeId}`);
    beforeElementId.classList.replace('not-in-view', 'in-view');
  }
}
//FIN DE GENERACION DEL BOTON Y DINAMISMO PARA PASAR DE MES A MES



//COMIENZO DE TURNOS
let turnos = [];

class Turno{
  constructor(dia, mes, año, hora, motivo, userId){
    this.dia = dia;
    this.mes = mes;
    this.año = año;
    this.hora = hora;
    this.motivo = motivo;
    this.medicoId = idMedico;
    this.userId = userId;
    this.id = turnos.length;
  }
}

let horasTurnos = ['08','09','10','11','12','15','16','17','18'];



//COMIENZO GENERACION DE AGENDA
//se Hizo con la idea de que se genere la agenda y se busque la información
//cada vez que se reproduce la función, a diferencia del calendario que tiene los
//meses ocultos
let userTurn;
function verTurnos(event){ //se reproduce cuando toco un día del calendario
  //info previa
  let day = event.target.innerText;
  let monthYear = event.target.parentElement.id.substring(14);
  let month;
  if(monthYear.length===7){
    month = monthYear.substring(0,2);
  }else{
    month = monthYear.substring(0,1)
  }
  let year = monthYear.substring(monthYear.length-4);
  //fin info previa

  //comienzo de borrado y creacion del contenedor que va a recibir la agenda 
  let turnContainer2R = document.getElementById('turn-container2');
  let turnContainerR = document.getElementById('turn-container');
  if(turnContainer2R !== undefined){
    turnContainerR.removeChild(turnContainer2R);
    let turnContainerRep = document.createElement('div');
    turnContainerRep.innerHTML = `
    <div id="y-${year}">
      <div id="m-${month}">
        <div id="d-${day}">
          <h5 class="card-title text-center mb-5">Día ${day} del mes de ${meses[month]} del año ${year}.</h6>
        </div>
      </div>
    </div>
    `;
    turnContainerRep.setAttribute('id', 'turn-container2')
    turnContainerR.appendChild(turnContainerRep);
  }else{
    let turnContainerRep = document.createElement('div');
    turnContainerRep.innerHTML = `
    <div id="y-${year}">
      <div id="m-${month}">
        <div id="d-${day}">
          <h5 class="card-title text-center mb-5">Día ${day} del mes de ${meses[month]} del año ${year}.</h6>
        </div>
      </div>
    </div>
    `;
    turnContainerRep.setAttribute('id', 'turn-container2')
    turnContainerR.appendChild(turnContainerRep);
  }
  //fin de borrado y creacion del contenedor que va a recibir la agenda 

  //Comienzo de creacion de los turnos del día y la fecha especificada, con el input
  for(let i=0; i<horasTurnos.length; i++){
    userTurn = document.createElement('div');
    userTurn.innerHTML = `
    <div class="col-2 col-md-1 mt-1"><h6 class="card-title mx-1">${horasTurnos[i]}.00hs</h6></div>
    <div class="col-10 card-text">
      <form class="d-flex align-items-center">
        <div class="mb-3">
          <input type="text" placeholder="Escriba el motivo de su consulta" class="form-control ms-1 border-top-0 border-start-0 border-end-0 input-turno mx-1" id="m${horasTurnos[i]}">
        </div>
        <div id="b${horasTurnos[i]}" class="agendar ms-4 border rounded bg-light px-2 py-1 position-relative">&#10004</div>
        <div id="t${horasTurnos[i]}" class="agendar ms-2 border rounded bg-danger px-2 py-1 not-in-view mb-3 text-light">X</div>
      </form>
    </div>
    `;
    userTurn.classList.add('row', 'py-0', 'my-2', 'd-flex', 'align-items-center')
    let turnContainerDay = document.getElementById(`d-${day}`);
    turnContainerDay.appendChild(userTurn);
    document.getElementById(`b${horasTurnos[i]}`).addEventListener('click', agendarTurno);
    document.getElementById(`t${horasTurnos[i]}`).addEventListener('click', borrarTurno);
  }
  //fin de los turnos del dia y fecha especificada

  //comienzo turnos del día agotados (guardados en el local storage)
  if(localStorage.getItem('turnos') !== null){
    turnos = JSON.parse(localStorage.getItem('turnos'));
    
    let turnosFiltrados = turnos.filter(turno => turno.año == year && turno.mes == month && turno.dia == day && turno.medicoId == idMedico);
    for(let i=0; i<turnosFiltrados.length; i++){
      let inputId = document.getElementById(`m${turnosFiltrados[i].hora}`);
      inputId.setAttribute('value', 'TURNO OCUPADO');
      inputId.classList.add('text-center');
      inputId.setAttribute('disabled','');
      let btnId = document.getElementById(`b${turnosFiltrados[i].hora}`);
      let btnTrashId = document.getElementById(`t${turnosFiltrados[i].hora}`);
      btnId.classList.add('not-in-view');
      if(turnosFiltrados[i].userId === userLogged.idUser){
        btnTrashId.classList.replace('not-in-view', 'in-view');
      }
    }
  }
  //fin turnos del día agotados
}
//FIN GENERACION DE AGENDA


//COMIENZO AGENDANDO TURNOS Y MANDANDOLOS AL LOCAL STORAGE
function agendarTurno(event){
  if(localStorage.getItem('turnos') !== null){
    turnos = JSON.parse(localStorage.getItem('turnos'));
  }
  let horaId = event.target.id.substring(1); //hora
  let diaId = event.target.parentElement.parentElement.parentElement.parentElement.id.substring(2); //dia
  let mesId = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id.substring(2); //mes
  let añoId = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id.substring(2); //año
  let motivoContainer = document.getElementById(`m${horaId}`).value;

  let newAppoint = new Turno(diaId, mesId, añoId, horaId, motivoContainer, userLogged.idUser);
  turnos.push(newAppoint);
  let turnosJson = JSON.stringify(turnos);
  localStorage.setItem('turnos', turnosJson);
  let inputId = document.getElementById(`m${horaId}`);
  inputId.setAttribute('value', 'TURNO OCUPADO');
  inputId.classList.add('text-center')
  inputId.setAttribute('disabled','')
  let btnId = document.getElementById(`b${horaId}`);
  btnId.classList.add('not-in-view');
  let btnTrashId = document.getElementById(`t${horaId}`);
  btnTrashId.classList.replace('not-in-view', 'in-view');
}
// FIN AGENDANDO TURNOS Y MANDANDOLOS AL LOCAL STORAGE

//BORRADO DE TURNOS
function borrarTurno(event){
  let answer = window.confirm('¿Seguro desea borrar el turno?');
  if(answer){
    let numberId = event.target.id.substring(1);
    let inputId = `m${numberId}`;
    let input = document.getElementById(inputId);
    input.removeAttribute('value');
    input.removeAttribute('disabled');
    input.classList.remove('text-center')
    let trashBtn = document.getElementById(`t${numberId}`);
    let confirmBtn = document.getElementById(`b${numberId}`);
    confirmBtn.classList.replace('not-in-view', 'in-view');
    trashBtn.classList.replace('in-view', 'not-in-view');
    let turnos = JSON.parse(localStorage.getItem('turnos'));
    let horaTurno = event.target.id.substring(1);
    let diaTurno = event.target.parentElement.parentElement.parentElement.parentElement.id.substring(2);
    let mesTurno = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id.substring(2);
    let añoTurno = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id.substring(2);
    let idMedico = window.location.hash.substring(1);
    let turnoBorrado = turnos.find(turno => turno.hora == horaTurno && turno.dia == diaTurno && turno.mes == mesTurno && turno.año == añoTurno && turno.medicoId == idMedico);
    turnos.splice(turnos.indexOf(turnoBorrado),1);
    let turnosJSON = JSON.stringify(turnos);
    localStorage.setItem('turnos', turnosJSON)
  }
}




//BUSCADOR DE MEDICOS
let m = 0;
let searchInput = document.getElementById('search-input');
let searchForm = document.getElementById('searching-form');
let searchDiv = document.getElementById('search-div')
searchForm.addEventListener('submit', search);
let especificidad = 0;

//FUNCION DEL BOTON SEARCH (O DE APRETAR ENTER EN EL FORMULARIO POR DEFECTO)
function search(event){
  especificidad = 0;
  m++;
  event.preventDefault();
  let searchInputValue = searchInput.value.toUpperCase();
  let specialFilter = medicos.filter(medico => medico.especialidad.toUpperCase().includes(searchInputValue));
  let especialidad;

  //BUSCO ESPECIFICIDAD EN LA BUSQUEDA PARA QUE SE MUESTREN LOS MEDICOS
  //DE SOLO UNA ESPECIALIDAD
  if(specialFilter.length == 0){
    especificidad = 1;
  }else{

    for(let i=0; i<specialFilter.length; i++){
      if(i===specialFilter.length-1){
        especialidad = specialFilter[0].especialidad;
      }else{
        if(specialFilter[i+1].especialidad !== specialFilter[i].especialidad){
          especificidad = 1;
        }else{
          especialidad = specialFilter[0].especialidad;
        }
      }
    }
  }
  let specialContainer = document.createElement('div');
  if(especificidad === 1){
    specialContainer.innerText = 'Sea más específico';
    specialContainer.classList.add('position-absolute', 'search-helper1', 'text-decoration-underline');
    searchDiv.appendChild(specialContainer);
  }else{
  specialContainer.innerText = `${especialidad}`;
  specialContainer.classList.add('position-absolute', 'search-helper1', 'text-decoration-underline');
  searchDiv.appendChild(specialContainer);
  let j = 0;
  specialFilter.forEach(medico => {
    j++;
    let medicoContainer = document.createElement('div');
    medicoContainer.innerText = `${medico.nombre}`;
    medicoContainer.classList.add('position-absolute', 'search-helper2');
    medicoContainer.style.top = `${73+(j-1)*35}px`
    //redireccion a la página de cada médico
    medicoContainer.addEventListener('click', redirection2)
    searchDiv.appendChild(medicoContainer);

    function redirection2(){
      let pressId = medico.id;
      window.location.assign(window.location.origin + `/medicos.html#${pressId}`);
      window.location.reload();
    }
  });
  }

// Para que cuando se trabaje en el buscador se activen estás opciones de 
//cerrado
  if(m===1){
    document.addEventListener('keydown', closeSearch);
    document.addEventListener('click', clickClose)
  }
  }
  
  function closeSearch(event){
    if(event.keyCode === 27){
      let specialContainer = document.querySelector('.search-helper1');
      let medicoContainer = document.querySelectorAll('.search-helper2');
      searchDiv.removeChild(specialContainer);
      for(let l=0; l<medicoContainer.length; l++){
        searchDiv.removeChild(medicoContainer[l])
      }
      document.removeEventListener('keydown', closeSearch);
      document.removeEventListener('click', clickClose);
      m--;
    }
  }

  //click fuera de la ventanta
  function clickClose(event){
    let medicoContainer = document.querySelectorAll('.search-helper2');
    let specialityContainer = document.querySelector('.search-helper1')
    let limitX1 = searchDiv.getBoundingClientRect().left;
    let limitX2 = searchDiv.getBoundingClientRect().right;
    let limitY1 = searchDiv.getBoundingClientRect().top;
    let lastBox;
    if(especificidad===0){
      lastBox = medicoContainer[medicoContainer.length-1];
    }else{
      lastBox = specialityContainer;
    }
    let limitY2 = lastBox.getBoundingClientRect().bottom;
    if(event.x < limitX1 || event.x > limitX2 || event.y < limitY1 || event.y > limitY2){
      let specialContainer = document.querySelector('.search-helper1');
      let medicoContainer = document.querySelectorAll('.search-helper2');
      searchDiv.removeChild(specialContainer);
      for(let l=0; l<medicoContainer.length; l++){
        searchDiv.removeChild(medicoContainer[l])
      }
      m--;
      document.removeEventListener('click', clickClose);
      document.removeEventListener('keydown', closeSearch);
    }
    // console.log(searchDiv.getBoundingClientRect().top);
    // console.log(searchDiv.getBoundingClientRect().right);
    // console.log(lastBox.getBoundingClientRect().bottom);
    // console.log(searchDiv.getBoundingClientRect().left);
    // console.log(event.x);
    // console.log(event.y);
  }
  
  //FIN BUSCADOR DE MEDICO POR ESPECIALIDAD

