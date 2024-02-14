const listaCarrito = document.querySelector(".productoCarrito");
const totalPrecio = document.querySelector("#totalCarritonav");
const totalPrecio2 = document.querySelector("#totalCarrito");
const subtotalPrecio = document.querySelector("#subtotalCarrito");
const cantidadCarrito = document.querySelector("#cantidadCarrido")

function calcularTotalCarrito() {
    let total = carrito.reduce((subtotal, carrito) => subtotal + carrito.precio, 0)
    return total
}
let carrito = JSON.parse(localStorage.getItem("miCarrito")) ?? []


function armarCarritoHTML(producto) {
    return `   
  

    <div class="productoCarrito">
        <img src="${producto.img}" class="w-100 foto">
        
         <div class="nombre">
              <h6 class="font-cormorant mb-0">${producto.nombre}</h6>
        </div>
             <p class="price d-none d-md-block">$${producto.precio}</p>
            <button data-id="${producto.id_producto}" class="btnErase">X</button>
     </div>
    `;
}



function eliminarDelCarrito(prodAEliminar) {
    let productoAEliminar = prodAEliminar;
    const indice = carrito.findIndex((producto) => producto.id_producto === parseInt(productoAEliminar));
    indice != -1 ? (
        mensaje(' se elimino del carrito', 'darkred'),
        carrito.splice(indice, 1),
        localStorage.setItem("miCarrito", JSON.stringify(carrito))) : null;

    renderizarCarrito();
    if (carrito.length === 0) {
        listaCarrito.innerHTML = `
        <div class="container">
             <div class="row justify-content-center">
                 <div class="col-12 col-md-6"
                     <p class="text-center">El Carrito se encuentra Vacio.</p>
                 </div>
             </div>
             <div class="row justify-content-center">
                <div class="col-12 col-md-6">
                 <img src="img/carrito_vacio.png">
                 </div>
             </div>
        </div>
      `}
}

function renderizarCarrito() {
    
    listaCarrito.innerHTML = ""
    carrito.forEach((producto) => {
        listaCarrito.innerHTML += armarCarritoHTML(producto);
    });

    totalPrecio.textContent = calcularTotalCarrito();
    subtotalPrecio.textContent = calcularTotalCarrito();
    totalPrecio2.textContent = "$ " + parseInt(calcularTotalCarrito());
    cantidadCarrito.textContent = carrito.length
}

document.addEventListener("click", (event) => {

    event.target.classList.contains("btnErase") ? eliminarDelCarrito(event.target.getAttribute("data-id")) : null;

});

// Renderiza el carrito al cargar la página
renderizarCarrito();

function calcularCantidadCarrito() {
    if (carrito.length > 0) {
        cantidadCarrito.forEach((elemento) => {
            if (elemento) {
                elemento.textContent = carrito.length;
            }
            const totalCarrito = document.querySelector("#totalCarrito");
            totalCarrito ? totalPrecio2.textContent = "$ " + parseInt(calcularTotalCarrito()) : null;

        });
    } else {
        //carrito vacio
    }
}
function barra() {
    let value = 0;
    const progress = document.querySelector("#progress")
    setInterval(() => {
        if (value > 10) {
            progress.value = 0
            value = 0
        } else {
            progress.value = value
            value++
        }
    }, 1000);
}


function emailCompra() {

    Swal.fire({
        title: "Por favor llenar el formulario para finalizar la compra",
        html: `
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <form id="formularioCompra" class="form-control">
                        <input type="text" name="nombre" value="" placeholder="Nombre" id="formNombre" class="form-control mb-2">
                        <input type="text" name="direccion" value="" placeholder="Domicilio" class="form-control mb-2" id="formDomicilio">
                        <input type="email" name="email" value="" placeholder="Email" class="form-control mb-2" id="formEmail">
                    </form>
                </div>
            </div>
        </div>
        `,
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Finalizar Compra"
    }).then((result) => {
        if (result.isConfirmed) {
            const nombre = document.querySelector("#formNombre").value;
            const domicilio = document.querySelector("#formDomicilio").value;
            const email = document.querySelector("#formEmail").value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Por favor ingresa un correo electrónico válido.',
                });
            } else if (nombre.trim() === '' || domicilio.trim() === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Por favor completa todos los campos del formulario.',
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Procesando",
                    html: `
                    <div>
                        <h5>Hola ${nombre} Estamos procesando su compra!!!</h5>
                        <h5>Le enviaremos un email a ${email} !!!</h5>
                        <div><progress id="progress" value="0" min="0" max="10"></progress></div>

                    </div>`,

                    showConfirmButton: false

                });
                barra()
                setTimeout(() => {
                    window.location.href = "compra.html";
                }, 11000); // Redirigir después de 11 segundos
            }
        }
    });
}



const finalizarCompra = document.querySelector("#finalizarCompra");
finalizarCompra.addEventListener("click", () => {
    if (carrito.length > 0) {
        emailCompra()

    } else {
        mensaje('No hay productos en el carrito', 'darkred');
    }
});

function mensaje(mensaje, estilo) {
    Toastify({
        text: mensaje,
        duration: 3000,
        style: {
            background: estilo,
        },
    }).showToast();
}

