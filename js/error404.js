let goBack = document.getElementById('go-back');

if(localStorage.getItem('userLogged') === null){
    goBack.setAttribute('href', `http://127.0.0.1:5500/index.html`);
}else{
    let userLogged = JSON.parse(localStorage.getItem('userLogged'))
    goBack.setAttribute('href', `http://127.0.0.1:5500/login.html#${userLogged.idUser}`);
}