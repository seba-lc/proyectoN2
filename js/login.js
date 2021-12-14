import { navbarInsert2, footerInsert } from "./helpers.js";
navbarInsert2();
footerInsert();

class Especialidad {
  constructor(titulo, imagen, medicos, id) {
    this.titulo = titulo;
    this.imagen = imagen;
    this.medicos = medicos;
    this.id = id;
  }
}

let especialidades = [
  new Especialidad("Odontología", "odontologia.png", ['Dr. Rolling 1', 'Dr. Rolling 2', 'Dr. Rolling 3', 'Dr. Rolling 4'], 1),
  new Especialidad("Cirugía", "cirugia.jpg", ['Dr. Rolling 5', 'Dr. Rolling 6', 'Dr. Rolling 7', 'Dr. Rolling 8'], 2),
  new Especialidad("Pediatría", "pediatria.png", ['Dr. Rolling 9', 'Dr. Rolling 10', 'Dr. Rolling 11', 'Dr. Rolling 12'], 3),
  new Especialidad("Traumatología", "traumatologia.png", ['Dr. Rolling 13', 'Dr. Rolling 14', 'Dr. Rolling 15', 'Dr. Rolling 16'], 4),
];

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

function medicosList(especialidad){
  for(let i=0; i<especialidad.medicos.length; i++){
    let divMedicos = document.createElement('div');
    divMedicos.innerHTML =`
    <a href="#" target="_blank" class="medicos-page">- ${especialidad.medicos[i]}</a>
    `;
    // divMedicos.classList.add('position-relative');
    let medicosList = document.getElementById(`lista-medicos-${especialidad.id}`);
    medicosList.appendChild(divMedicos);
    }
}


