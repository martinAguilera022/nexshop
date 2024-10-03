const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));
const carritoProductos = document.querySelector("#carrito");
const textoCarritoVacio = document.querySelector("#carrito-vacio");
const totalCompra = document.querySelector("#totalCompra");
const totalCompraMovil = document.querySelector("#totalCompraMovil");

let totalDeCompra = 0;

if (productosEnCarrito) {
    textoCarritoVacio.classList.add("disabled");

    productosEnCarrito.forEach((producto, index) => {
        const div = document.createElement("div");
        const cantidadCuotas = 6; // Cantidad de cuotas
        const precioTotalProducto = producto.precio * producto.cantidad; // Precio ajustado por cantidad
        const valorCuota = (precioTotalProducto / cantidadCuotas).toFixed(2); // Calcula el valor de cada cuota

        div.classList.add("articuloEnCarrito");
        div.innerHTML = `
            <img class="imgComprado" src=".${producto.imagen}" alt="${producto.nombre}">
            <p class="tituloArticulo">${producto.nombre}</p>
            
            <p class="precioArt" id="precio-${index}">$${precioTotalProducto.toLocaleString('es-AR')}</p>
            <p class="cuotas" id="cuotas-${index}">${cantidadCuotas} cuotas de $${valorCuota.toLocaleString('es-AR')}</p>

            <div class="botonesArticulo">
                <button class="btonAzul" id="comprar">Comprar ahora</button>
                <button class="eliminar">Eliminar del carrito</button>
                <div>
                    <button class="masMenos" id="mas-${index}">+</button>
                    <p id="cantidad-${index}">${producto.cantidad}</p>
                    <button class="masMenos" id="menos-${index}">-</button>
                </div>
            </div>
        `;

        // Evento para botón +
        div.querySelector(`#mas-${index}`).addEventListener('click', () => {
            producto.cantidad++;
            actualizarCarrito(index);
        });

        // Evento para botón -
        div.querySelector(`#menos-${index}`).addEventListener('click', () => {
            if (producto.cantidad > 1) {
                producto.cantidad--;
                actualizarCarrito(index);
            }
        });

        totalDeCompra += precioTotalProducto;
        carritoProductos.append(div);
    });

    // Actualiza el total en la vista
    totalCompra.innerHTML = `$${totalDeCompra.toLocaleString('es-AR')}`;
    totalCompraMovil.innerHTML = `$${totalDeCompra.toLocaleString('es-AR')}`;
    
} else {
    textoCarritoVacio.classList.remove("disabled");
}

// Función para actualizar el carrito
function actualizarCarrito(index) {
    // Recalcular precio total del producto
    const producto = productosEnCarrito[index];
    const cantidadCuotas = 6;
    const precioTotalProducto = producto.precio * producto.cantidad;
    const valorCuota = (precioTotalProducto / cantidadCuotas).toFixed(2);

    // Actualizar DOM
    document.querySelector(`#precio-${index}`).innerHTML = `$${precioTotalProducto.toLocaleString('es-AR')}`;
    document.querySelector(`#cuotas-${index}`).innerHTML = `${cantidadCuotas} cuotas de $${valorCuota.toLocaleString('es-AR')}`;
    document.querySelector(`#cantidad-${index}`).innerHTML = producto.cantidad;

    // Actualizar el total de la compra
    totalDeCompra = productosEnCarrito.reduce((total, prod) => total + (prod.precio * prod.cantidad), 0);
    totalCompra.innerHTML = `$${totalDeCompra.toLocaleString('es-AR')}`;
    totalCompraMovil.innerHTML = `$${totalDeCompra.toLocaleString('es-AR')}`;

    // Actualizar el localStorage
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}
