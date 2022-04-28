document.addEventListener("DOMContentLoaded", () => {
    fetchData()
})

const fetchData = async () => {
    try {
        const res = await fetch("api.json")
        const data = await res.json()

        //console.log(data);

        pintarProductos(data)
        detectarBotones(data)

    } catch (error) {
        //console.log(error);
    }
}

const contenedorProductos = document.querySelector("#novedades-contenedor")
const pintarProductos = (data) => {
    const template = document.querySelector("#template-productos").content
    const fragment = document.createDocumentFragment()
    //console.log(template);

    data.forEach(producto => {
        template.querySelector("img").setAttribute("src", producto.image)
        template.querySelector("h3").textContent = producto.title
        template.querySelector("h4").textContent = producto.description
        template.querySelector("span").textContent = (producto.price)
        template.querySelector("button").dataset.id = producto.id
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })
    contenedorProductos.appendChild(fragment)
}

let carrito = {}

const detectarBotones = (data) => {
    const botones = document.querySelectorAll(".item button")

    botones.forEach(btn => {
        btn.addEventListener("click", () =>{
            const producto = data.find(item => item.id === parseInt(btn.dataset.id)) 
            producto.cantidad = 1
            if(carrito.hasOwnProperty(producto.id)){
                producto.cantidad = carrito[producto.id].cantidad +1
            }
            Toastify({

                text: "Producto agregado al carrito",
                
                duration: 3000
                
                }).showToast();
            carrito [producto.id] = {...producto}
            //console.log(carrito);
            pintarCarrito()
        })

    })
} 
const items = document.querySelector("#items")

    

const pintarCarrito = () => {

    footer.innerHTML = ""
    items.innerHTML = ""

    if(Object.keys(carrito).length === 0) {
        footer.innerHTML = ` <th scope="row" colspan="5">Carrito vacío</th>`
        return
    }

    const template = document.querySelector("#template-carrito").content
    const fragment = document.createDocumentFragment()
    
    Object.values(carrito).forEach(producto => {
        //console.log("producto", producto);
        template.querySelector("th").textContent = producto.id
        template.querySelectorAll("td")[0].textContent = producto.title
        template.querySelectorAll("td")[1].textContent = producto.cantidad
        template.querySelector("span").textContent = producto.price * producto.cantidad

        //botones
        template.querySelector(".btn-info").dataset.id  = producto.id
        template.querySelector(".btn-danger").dataset.id  = producto.id

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)

        
    })

    items.appendChild(fragment)
    
    pintarFooter()
    accionBotones()
}

const  footer = document.querySelector("#footer-carrito")
const pintarFooter = () => {

    const template = document.querySelector("#template-footer").content
    const fragment = document.createDocumentFragment()

    //sumar cantidad y totales 
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, price}) => acc + cantidad * price, 0)
    
    //console.log(nPrecio);
    //console.log(nCantidad);
    template.querySelectorAll("td")[0].textContent = nCantidad
    template.querySelector("span").textContent = nPrecio

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const comprar = document.querySelector("#comprar-productos")
    comprar.addEventListener("click", () => {
        carrito = {}
        pintarCarrito()
        swal({
            title: "Estas seguro?",
            text: "Tu compra imaginaria se esta por realizar!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Hecho! Tu compra se realizo correctamente!", {
                icon: "success",
              });
            } else {
              swal("Tu compra se ha cancelado");
            }
          });
    })
    const boton = document.querySelector("#vaciar-carrito")
    boton.addEventListener("click", () => {
        carrito = {}
        pintarCarrito()
        Toastify({
            text: "Carrito vaciado",
            className: "info",
            style: {
              background: "linear-gradient(to right, #FF5733, #B72000)",
            }
          }).showToast();
    })
}

const accionBotones = () => {
    const botonesAgregar = document.querySelectorAll("#items .btn-info")
    const botonesEliminar = document.querySelectorAll("#items .btn-danger")



    botonesAgregar.forEach(btn => {
        btn.addEventListener("click", () => {
            const producto = carrito[btn.dataset.id]
            producto.cantidad ++
            carrito[btn.dataset.id] = {...producto} 
            pintarCarrito()
            
            
        })
        
    })


    botonesEliminar.forEach(btn => {
        btn.addEventListener("click", () => {
            const producto = carrito[btn.dataset.id]
            producto.cantidad --
            if(producto.cantidad === 0){
                delete carrito[btn.dataset.id]
                
            }else{
                carrito[btn.dataset.id] = {...producto} 
                
            }
            pintarCarrito()
        })
        
    })
}