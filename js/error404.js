let userLogged = JSON.parse(localStorage.getItem('userLogged'))

let goBack = document.getElementById('go-back');
goBack.setAttribute('href', `http://127.0.0.1:5500/login.html#${userLogged.idUser}`);