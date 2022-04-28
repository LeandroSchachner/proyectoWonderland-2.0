 /* GUARDAR DATOS STORAGE */
function guardarDatos(storage) {
    let user = document.getElementById('emailAddres').value;
    let pass = document.getElementById('password').value;

    const usuario = {
        'user': user,
        'pass': pass
    };

    if (storage === 'sessionStorage') {
        sessionStorage.setItem('user', JSON.stringify(usuario));
    }

    if (storage === 'localStorage') {
        localStorage.setItem('user', JSON.stringify(usuario));
    }
}

function borrarDatos(storage){
    storage.clear();
}
/* BOTONES */
let recordar = document.getElementById("recordarme");
let btnLogin = document.getElementById("btnLogin");
let btnVaciarLocalStorage = document.getElementById('btnVaciarLocalStorage');
let btnVaciarSessionStorage = document.getElementById('btnVaciarSessionStorage');

btnLogin.addEventListener("click", () => {
    if (recordar.checked) {
        guardarDatos("localStorage");
    } else {
        guardarDatos("sessionStorage");
    }
   // console.log(btnLogin);
});

btnVaciarLocalStorage.addEventListener('click', () => {
    borrarDatos(localStorage);

});

btnVaciarSessionStorage.addEventListener('click', () => {
    borrarDatos(sessionStorage);
});

fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))




