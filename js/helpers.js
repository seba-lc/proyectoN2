export function navbarInsert() {
  let navbarSection = document.getElementById("navbar-sec");
  let navbarCont = document.createElement("div");
  navbarCont.innerHTML=`
    <nav class="navbar navbar-expand-lg navbar-light bg-light py-1 mt-0">
          <div class="container">
            <a class="navbar-brand text-light" href="#"><img src="assets/img/logo.png" id="logo-img" alt=""> Clinica Rolling</a>
            <button class="navbar-toggler border-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <div class="nav-link text-light" aria-current="page" id="sesion-init">Iniciar Sesión</div>
                </li>
                <li class="nav-item">
                  <button id="boton-registro" class="btn-withoutstyle nav-link text-light" data-bs-toggle="modal" data-bs-target="#exampleModal" type="button">Registrarse</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    `;
  navbarCont.classList.add('box-white', 'pb-1', 'my-0', 'py-0');
  navbarSection.appendChild(navbarCont);
  let sesionInit = document.getElementById('sesion-init');
  sesionInit.style.cursor = 'pointer';
  sesionInit.addEventListener('click',initSession)

  let k = 0;
  function initSession() {
    k = 1;
    let formFrame = document.createElement("div");
    formFrame.innerHTML=(`
    <form class="p-4 text-white" id="init-form">
      <div class="mb-3">
        <label for="init-email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="init-email" aria-describedby="emailHelp" required>
      </div>
      <div class="mb-3">
        <label for="init-pass" class="form-label">Password</label>
        <input type="password" class="form-control" id="init-pass" required>
      </div>
      <div class="d-flex flex-column align-items-center justify-content-center">
        <button class="btn-withoutstyle text-info mb-1">
          ¿Olvidaste tu contraseña?
        </button>
      </div>
      <div class="d-flex justify-content-center">
        <button class="btn btn-primary mt-4" id="sesion-inside">Iniciar Sesion</button>
      </div>
    </form>
    `);
    let container = document.querySelector('#body-container');
    formFrame.setAttribute('id', 'form-frame')
    container.appendChild(formFrame);
    let initBtn = document.getElementById('sesion-inside');
    initBtn.addEventListener('click', inside);
    let backInit = document.createElement('div');
    backInit.setAttribute('id', 'back-block');
    container.appendChild(backInit);
    document.addEventListener('keydown', alternativa);
    document.addEventListener('keydown', closeInit);
  }

  function alternativa(event){
    if(event.keyCode === 13){
      event.preventDefault();
      inside();
    }
  }
  function closeInit(event){
    if(k===1){
      if(event.keyCode === 27){
        let container = document.querySelector('#body-container');
        let formFrame = document.getElementById('form-frame');
        let backInit = document.getElementById('back-block')
        container.removeChild(formFrame);
        container.removeChild(backInit);
        k = 0;
        document.removeEventListener('keydown', closeInit)
        document.removeEventListener('keydown', alternativa);
      }
    }
  }
  
  let j = 0;
  function inside(){
    j++;
    // console.log(event.keyCode);
    // console.log(event.target);
    // event.preventDefault();
    let users = JSON.parse(localStorage.getItem('users'));
    let initEmail = document.getElementById('init-email').value;
    let initPass = document.getElementById('init-pass').value;
    let userLogged = users.find(user => user.email === initEmail);
    if(userLogged && userLogged.password === initPass){
      window.location.assign(window.location.origin + '/login.html')
    }else{
      if(j===1){
        let errorAlert = document.createElement('div');
        errorAlert.innerHTML = (`
        <div class="alert alert-danger mt-4 text-center px-1" id="init-alert" role="alert">
        usuario y/o contraseña incorrecto/s
        </div>
        `)
        let initForm = document.getElementById('init-form');
        initForm.appendChild(errorAlert)
        setTimeout(function(){
          initForm.removeChild(errorAlert)
          j=0;
        },2000);
        
      }
    }
    
  }


  let clearId = document.getElementById('clear-btn');
  clearId.addEventListener('click', clearForm);
  function clearForm(event){
    event.preventDefault();
    document.getElementById('register-form').reset();
  }

}



export function navbarInsert2() {
  let navbarSection = document.getElementById("navbar-sec");
  let navbarCont = document.createElement("div");
  navbarCont.innerHTML=`
  <nav class="navbar navbar-expand-lg navbar-light bg-light py-1 mt-0">
  <div class="container">
    <a class="navbar-brand text-light" href="#"><img src="assets/img/logo.png" id="logo-img" alt=""> Clinica Rolling</a>
    <button class="navbar-toggler border-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link text-light" aria-current="page" href="#">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-light" href="#">Mis turnos</a>
        </li>
        <li class="nav-item">
          <form class="d-flex">
            <input class="form-control me-2 search-form" type="search" placeholder="Buscador de médicos" aria-label="Search">
            <button class="btn btn-outline-light" type="submit">Buscar</button>
          </form>
        </li>
        <li class="nav-item">
          <a class="nav-link text-light" href="#">Cerrar sesión</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  `;
  navbarCont.classList.add('box-white', 'pb-1', 'my-0', 'py-0');
  navbarSection.appendChild(navbarCont);
}

export function footerInsert(){
  let footSection = document.getElementById('footer-sec');
  let footCont = document.createElement('div');
  footCont.innerHTML = `
  <div class="row align-items-center">
    <div class="col-12 col-md-4 text-center">© 2021 Clinica Rolling</div>
    <div class="col-12 col-md-4 text-center">
      <p class="my-2">CLINICA ROLLING</p>
      <p class="my-2"><a href="https://www.google.com/maps/place/Hilton+Garden+Inn+Tucuman,+Miguel+Lillo+365,+T4000+San+Miguel+de+Tucum%C3%A1n,+Tucum%C3%A1n/@-26.8328032,-65.2224328,17z/data=!4m2!3m1!1s0x94225c6ef372d485:0x5364a96acedda853" target="_blank">Miguel Lillo 365, S.M. de Tucumán, Argentina</a></p>
      <p class="my-2"><a href="error404.html"><img src="/assets/img/logos_wsp.png" alt=""> (381) 345-9546</a></p>
    </div>
    <div class="col-12 col-md-4 text-center d-flex flex-column align-items-center">
      <a href="#"><img src="/assets/img/logos_fb.png" alt=""></a>
      <a href="#"><img src="/assets/img/logos_ig.png" class="my-2" alt=""></a>
      <a href="#"><img src="assets/img/logos_tw.png" alt=""></a>
    </div>
  </div>
  `;
  footCont.classList.add('container-fluid');
  footSection.appendChild(footCont);
}

