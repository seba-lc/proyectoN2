import { navbarInsert, footerInsert } from "./helpers.js";
navbarInsert();
footerInsert();


//BORRADO DE DATOS DEL ULTIMO USUARIO INGRESADO
if(localStorage.getItem('userLogged')!==null){
  localStorage.removeItem('userLogged')
}


//COMIENZO USUARIOS (base de datos fake)
class User{
  constructor(name, lastname, email, password, admin, idUser){
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.admin = admin;
    this.admin = admin;
    this.idUser = idUser;
  }
}

let users = [
  new User('Sebastian', 'Lopez Cruz', 'admin@gmail.com', 'Admin123', true, 1),
  new User('Lionel', 'Messi', 'user@gmail.com', 'User123', false, 2)
]

if(localStorage.getItem('users')===null){
  let usersJSON = JSON.stringify(users);
  localStorage.setItem('users', usersJSON);
}
//FIN USUARIO

//COMIENZO FORMULARIO DE REGISTRO
let registerFormId = document.getElementById('register-form');
registerFormId.addEventListener('submit', registerForm);
// Me falta solucionar el problema de agregar el enter como event listener

let i = 0;
function registerForm(event){
  i++;
  event.preventDefault();
  let registerName = document.getElementById('register-name').value;
  let registerLastname = document.getElementById('register-lastname').value;
  let registerEmail = document.getElementById('register-email').value;
  let registerPass = document.getElementById('register-password').value;

  let nameOk = /^[A-Z]+$/i.test(registerName);
  let lastnameOk = /^[A-Z]+$/i.test(registerLastname);
  let passOk1 = /^[A-Z](?=\w*\d)(?=\w*[a-z])\S/.test(registerPass); //Empieza con mayúscula, tiene letra, y numero
  let passOk2 = /^.{8,16}$/.test(registerPass)
  let emailOk = /^([a-z]\w+@[a-z]+\.[a-z]{2,5})/.test(registerEmail);

  console.log(nameOk);
  console.log(lastnameOk);
  console.log(emailOk);
  console.log(passOk1);
  console.log(passOk2);

  if(nameOk && passOk1 && passOk2 && lastnameOk && emailOk){
    let data = localStorage.getItem('users');
    let usersLS = JSON.parse(data);
    let idUserNumber = usersLS[usersLS.length-1].idUser + 1;
    let registerUser = new User (registerName, registerLastname, registerEmail, registerPass, false, idUserNumber);
    usersLS.push(registerUser);
    data = JSON.stringify(usersLS);
    localStorage.setItem('users', data);

    document.getElementById('exampleModal').remove();
    document.querySelector('.modal-backdrop.show').remove();
  }else if(i===1){
    let errorAlert = document.createElement('div');
    errorAlert.innerHTML = (`
    <div class="alert alert-danger" role="alert">
      Hay campos erróneos
    </div>
    `)
    let registerForm = document.getElementById('register-form');
    registerForm.appendChild(errorAlert);
    setTimeout(function(){
      registerForm.removeChild(errorAlert);
      i=0;
    },3000);
    }
  }
  //FIN FORMULARIO DE REGISTRO
  
