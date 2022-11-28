import { Subscriptor } from "./subscriptor.js";

const inputUser = document.getElementById("Usuario");
const inputPass = document.getElementById("Pass");
const btnIngresar = document.getElementById("ingresar");

let subscriptores = [];
let subscriptoresJson = obtenerSubscriptores();

btnIngresar.addEventListener("click", () => {
  let user = inputUser.value;
  let password = inputPass.value;
  gestionarUsuario(subscriptoresJson, user, password);
});

init();
//Funciones usuario

function gestionarUsuario(subscriptoresJson, user, password) {
 
    
    subscriptores = convertirSubscriptor(subscriptoresJson);
    
    let usuarioEncontrado = devolverUsuario(user, subscriptores);

    if (usuarioEncontrado != undefined){

      validarUsuario(usuarioEncontrado, user, password);
    }else{
      cargarSubscriptor(user, password, subscriptores);
      Swal.fire(`${user} registrado con exito`);
    }
    
    
    //setTimeout(window.open("http://127.0.0.1:5500/pages/index.html"),2000)
    //setTimeout(window.close(),2000)
  
}



function validarUsuario(usuarioEncontrado, user, pass) {
  
    if (usuarioEncontrado.pass == pass) {
      Swal.fire(`bienvenido ${usuarioEncontrado.user}`); 
    } else {
      Swal.fire(`Error en las credenciales`);
    }
  }


function devolverUsuario(user, subscriptores) {
  const sub = subscriptores.find((element) => element.user == user);
  return sub;
}

function obtenerSubscriptores() {
  let subsAlmacenados = JSON.parse(localStorage.getItem("ListadoSubscriptores"));
  return subsAlmacenados;
}

function convertirSubscriptor(subscriptores) {
  let objetoSubscriptor = [];
  subscriptores.forEach((subs) => {
    objetoSubscriptor.push(new Subscriptor(subs));
  });
  return objetoSubscriptor;
}

function cargarSubscriptor(user, pass, subscriptores) {
  let objGenerico = { user: user, pass: pass };
  subscriptores.push(new Subscriptor(objGenerico));
  localStorage.setItem("ListadoSubscriptores", JSON.stringify(subscriptores));
}

function init() {

  if (!localStorage.getItem("ListadoSubscriptores")){
    console.log("se")
    localStorage.setItem(
      "ListadoSubscriptores",
      JSON.stringify([new Subscriptor({ user: "mati", pass: "1234" })])
    );
  }
  
}
