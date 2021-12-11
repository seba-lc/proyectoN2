export function navbarInsert() {
  let navbarSection = document.getElementById("navbar-sec");
  let navbarCont = document.createElement("div");
  navbarCont.innerHTML=`
    <nav class="navbar navbar-expand-lg navbar-light bg-light py-1 mt-0">
          <div class="container-fluid">
            <a class="navbar-brand text-light" href="#"><img src="assets/img/logo.png" id="logo-img" alt=""> Clinica Rolling</a>
            <button class="navbar-toggler border-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link text-light" aria-current="page" href="#">Iniciar Sesión</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-light" href="#">Registrarse</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    `;
  navbarCont.classList.add('box-white', 'pb-1', 'my-0', 'mx-5', 'py-0');
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

