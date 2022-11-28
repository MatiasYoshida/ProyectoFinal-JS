import { Producto } from "./producto.js";

//GetElementById
let ventas = document.getElementById("ventas");
let inputProducto = document.getElementById("productoElegido");
let btnSumarCarrito = document.getElementById("btnSumarCarrito");
let btnComprar = document.getElementById("btnComprar");

//Arrays inicializados
let productos = [];
let carrito = [];


init()

//EventListener



btnSumarCarrito.addEventListener("click", () =>{
    let idProducto = inputProducto.value;
    let productoEncontrado = encontrarProducto(idProducto,productos);
    
    if (productoEncontrado){
        carrito = sumarAlCarrito(productoEncontrado,carrito)
        //agregarCarritoDocument(carrito)
        GenerarListaStock(carrito,document.getElementById("carrito"))
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontro el producto',
          })
    }
})

btnComprar.addEventListener("click" ,() =>{
    let total = sumarPrecios(carrito);
    let totalMasIva = sumarIva(total);
    Swal.fire({
        title: `Total =  ${total} \nTotal mas iva = ${totalMasIva}`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Comprar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Gracias por su compra!', '', 'Aceptar')
          limpiarCarrito();
        } 
      })
    //alert(`El total es ${total} \nEl total mas iva es ${totalMasIva}`)
})


//Funciones de ventas


function init (){
    generarInventario();       
}

function generarInventario(){
    const URL = "../BD/Productos.JSON"
    let product
    fetch(URL)
    .then(result => result.json())
    .then(data =>{
        data.articulos.forEach((d)=>{
            product = new Producto(d.id,d.nombre,d.tipo,d.marca,d.precio,d.stock)
            productos.push(product)  
        })
        GenerarListaStock(productos,document.getElementById("productos"));   
    })
} 

function GenerarListaStock(listaStock,nodo) {
    //let nodoCarrito = document.getElementById("productos");
    let nodoCarrito = nodo;
    nodoCarrito.innerHTML="" 
    
    let nodoTr = document.createElement('tr')
    let nodo1 = document.createElement("th");
    let nodo2 = document.createElement("th");
    let nodo3 = document.createElement("th");
    
    nodo1.innerText = "id";
    nodo2.innerText = "nombre";
    nodo3.innerText = "precio";

    nodoTr.appendChild(nodo1)
    nodoTr.appendChild(nodo2)
    nodoTr.appendChild(nodo3)

    nodoCarrito.appendChild(nodoTr);
    listaStock.forEach((producto)=>{
        
        let nodoTrP = document.createElement('tr')

        let nodo1P = document.createElement("th");
        let nodo2P = document.createElement("th");
        let nodo3P = document.createElement("th");
      
        nodo1P.innerText = producto.id;
        nodo2P.innerText = producto.nombre;
        nodo3P.innerText = producto.precio;
      
        nodoTrP.appendChild(nodo1P)
        nodoTrP.appendChild(nodo2P)
        nodoTrP.appendChild(nodo3P)

        nodoCarrito.appendChild(nodoTrP);
      //nodo.innerText = producto.id + " " + producto.nombre + "  " + producto.precio + " " ;
      
    })
  }


function agregarCarritoDocument(listaCarrito) {
    let nodoCarrito = document.getElementById("carrito");
    nodoCarrito.innerHTML="" 
    listaCarrito.forEach((producto)=>{
      let nodo = document.createElement("p");
      nodo.innerText = producto.id + " " + producto.nombre + "  " + producto.precio + " " ;
      nodoCarrito.appendChild(nodo);
    })
}

function encontrarProducto(id,productosStock){
    let productoEncontrado = '';
    productosStock.forEach((prod) =>{
        if (prod.id == id){
            productoEncontrado = prod;
        }
    })
    return productoEncontrado;
   
}

function sumarAlCarrito(producto,carrito){
    carrito.push(producto);
    return carrito;
}

function sumarPrecios(carrito){
    let total = 0;
    carrito.forEach((prod)=>{
        total = total + prod.precio;
    })
    return total;
}

function sumarIva(total){
    return total = total * 1.21
}

function limpiarCarrito(){
    let nodoCarrito = document.getElementById("carrito");
    nodoCarrito.innerHTML="" 
}