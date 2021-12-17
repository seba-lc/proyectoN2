import { navbarInsert2, footerInsert } from "./helpers.js";
navbarInsert2();
footerInsert();

//La pagina no me en el (0,0)
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
() => {window.scrollTo(0,0)};

//PARA QUE SOLO SE PUEDA VER LA PÁGINA SI SE INGRESÓ COMO UN USUARIO
if(window.location.hash == ''|| localStorage.getItem('userLogged') == null){
  console.log('entre');
  let navbar = document.getElementById('navbar-sec');
  let body = document.getElementById('speciality-container');
  navbar.classList.add('not-in-view');
  body.classList.add('not-in-view');
  setTimeout(()=>window.location.assign(window.location.origin + '/index.html'),2000);
}else{ //EL RESTO DEL CODIGO

let userLogged = JSON.parse(localStorage.getItem('userLogged'));
let userWelcome = document.getElementById('user-welcome');
userWelcome.innerText = `Bienvenido ${userLogged.name} :)`;


//MOLDE PARA LA CREACION DE LAS CARDS
class Especialidad {
  constructor(titulo, imagen, medicos, id) {
    this.titulo = titulo;
    this.imagen = imagen;
    this.medicos = medicos;
    this.id = id;
  }
}


//MOLDE PARA LA BASE DE DATOS DE LOS MÉDICOS
class Medico {
  constructor(nombre, foto, especialidad, id){
    this.nombre = nombre;
    this.foto = foto;
    this.especialidad = especialidad;
    this.id = id;
  }
}

let medicos = [
  new Medico('Dr. Rolling 1', 'avatar-medico.png', 'Odontología', 10),
  new Medico('Dr. Rolling 2', 'avatar-medico.png', 'Odontología', 11),
  new Medico('Dr. Rolling 3', 'avatar-medico.png', 'Odontología', 12),
  new Medico('Dr. Rolling 4', 'avatar-medico.png', 'Odontología', 13),
  new Medico('Dr. Rolling 5', 'avatar-medico.png', 'Cirugía', 20),
  new Medico('Dr. Rolling 6', 'avatar-medico.png', 'Cirugía', 21),
  new Medico('Dr. Rolling 7', 'avatar-medico.png', 'Cirugía', 22),
  new Medico('Dr. Rolling 8', 'avatar-medico.png', 'Cirugía', 23),
  new Medico('Dr. Rolling 9', 'avatar-medico.png', 'Pediatría', 30),
  new Medico('Dr. Rolling 10', 'avatar-medico.png', 'Pediatría', 31),
  new Medico('Dr. Rolling 11', 'avatar-medico.png', 'Pediatría', 32),
  new Medico('Dr. Rolling 12', 'avatar-medico.png', 'Pediatría', 33),
  new Medico('Dr. Rolling 13', 'avatar-medico.png', 'Traumatología', 40),
  new Medico('Dr. Rolling 14', 'avatar-medico.png', 'Traumatología', 41),
  new Medico('Dr. Rolling 15', 'avatar-medico.png', 'Traumatología', 42),
  new Medico('Dr. Rolling 16', 'avatar-medico.png', 'Traumatología', 43),
]

let medicosJSON = JSON.stringify(medicos);
localStorage.setItem('medicos', medicosJSON);

//DIFERENCIACIÓN DE MEDICOS SEGÚN ESPECIALIDAD
let odontologia = medicos.filter(medico => medico.especialidad == 'Odontología');
let medicosOdontologia = [];
for(let i = 0; i<odontologia.length; i++){
  medicosOdontologia.push(odontologia[i].nombre);
}
let cirugia = medicos.filter(medico => medico.especialidad == 'Cirugía');
let medicosCirugia = [];
for(let i = 0; i<cirugia.length; i++){
  medicosCirugia.push(cirugia[i].nombre);
}
let pediatria = medicos.filter(medico => medico.especialidad == 'Pediatría');
let medicosPediatria = [];
for(let i = 0; i<pediatria.length; i++){
  medicosPediatria.push(pediatria[i].nombre);
}
let traumatologia = medicos.filter(medico => medico.especialidad == 'Traumatología');
let medicosTraumatologia = [];
for(let i = 0; i<traumatologia.length; i++){
  medicosTraumatologia.push(traumatologia[i].nombre);
}

//DATOS DE LAS CARDS DE LAS DISTINTAS ESPECIALIDADES
let especialidades = [
  new Especialidad("Odontología", "odontologia.png", medicosOdontologia, 1),
  new Especialidad("Cirugía", "cirugia.jpg", medicosCirugia, 2),
  new Especialidad("Pediatría", "pediatria.png", medicosPediatria, 3),
  new Especialidad("Traumatología", "traumatologia.png", medicosTraumatologia, 4),
];

//CREACION DE LAS DIFERENTES CARDS
especialidades.forEach(especialidad => {
  let especialidadCard = document.createElement('div');
  especialidadCard.innerHTML = `
  <div class="card mt-4 p-3" id="${especialidad.id}" style="width: 18rem;">
    <h4 class="card-title text-center mb-3">${especialidad.titulo}</h5>
    <img src="/assets/img/${especialidad.imagen}" class="img-fluid" alt="${especialidad.titulo}-img">
    <div class="card-body">
      <div class="card-text">
        <h5 class="card-text">Medicos:</h3>
        <div id="lista-medicos-${especialidad.id}"></div>
      </div>
    </div>
  </div>
  `;
  especialidadCard.classList.add('col-12', 'col-md-6', 'col-xl-4', 'justify-content-center', 'd-flex');
  let specialityContainer = document.getElementById('speciality-container');
  specialityContainer.appendChild(especialidadCard);
  medicosList(especialidad)
});

//LISTA DE MEDICOS CON REDIRECCIONAMIENTO HACIA SU PAGINA Y AGENDA DE TURNOS
function medicosList(especialidad){
  for(let i=0; i<especialidad.medicos.length; i++){
    let divMedicos = document.createElement('div');
    divMedicos.innerHTML =`
    <div class="medicos-page my-1 d-inline-block" id="${especialidad.titulo.substring(0,3)}-${i}">- ${especialidad.medicos[i]}</div>
    `;
    divMedicos.addEventListener('click', redirection)
    let medicosList = document.getElementById(`lista-medicos-${especialidad.id}`);
    medicosList.appendChild(divMedicos);
    }
}

function redirection(event){
  let id1 = (event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id);
  let id2 = event.target.id.substring(4);
  let pressId = id1+id2;
  console.log(pressId);
  window.location.assign(window.location.origin + `/medicos.html#${pressId}`);
}




}// FIN DEL ELSE DEL PRINCIPIO DE LA PAGINA
