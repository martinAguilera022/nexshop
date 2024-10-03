const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));
const carritoProductos = document.querySelector("#carrito");
const textoCarritoVacio = document.querySelector("#carrito-vacio");
const totalCompra = document.querySelector("#totalCompra");
const totalCompraMovil = document.querySelector("#totalCompraMovil");
const totalProductosElement = document.querySelector("#total-productos"); 

// Definir totalDeCompra antes de usarla
let totalDeCompra = 0; // Inicializar la variable

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
            <p class = "totalTit">Total</p>
            <p class="precioArt precioTotal">$${producto.precio.toLocaleString('es-AR')}</p>
            <p class="precioArt precioUnidad" id="precio-${index}">$${precioTotalProducto.toLocaleString('es-AR')}</p>
            <p class="cuotas" id="cuotas-${index}">${cantidadCuotas} cuotas de $${valorCuota.toLocaleString('es-AR')}</p>

            <div class="botonesArticulo">
               
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

        // Evento para eliminar
        div.querySelector(".eliminar").addEventListener('click', () => {
            eliminarProductoDelCarrito(index);
        });

        totalDeCompra += precioTotalProducto; // Acumular el total de compra
        carritoProductos.append(div);
    });

    // Actualizar el total de la compra
    totalCompra.innerHTML = `$${totalDeCompra.toLocaleString('es-AR')}`;
    totalCompraMovil.innerHTML = `$${totalDeCompra.toLocaleString('es-AR')}`;
    
    // Actualizar el total de productos
    totalProductosElement.innerHTML = contarTotalProductos();

} else {
    textoCarritoVacio.classList.remove("disabled");
}

function actualizarCarrito(index) {
    const producto = productosEnCarrito[index];
    const cantidadCuotas = 6;

    // Actualizar precio y cuotas
    const precioTotalProducto = producto.precio * producto.cantidad;
    const valorCuota = (precioTotalProducto / cantidadCuotas).toFixed(2);

    // Actualizar en el DOM
    document.querySelector(`#precio-${index}`).innerHTML = `$${precioTotalProducto.toLocaleString('es-AR')}`;
    document.querySelector(`#cuotas-${index}`).innerHTML = `${cantidadCuotas} cuotas de $${valorCuota.toLocaleString('es-AR')}`;
    document.querySelector(`#cantidad-${index}`).innerHTML = producto.cantidad;

    // Recalcular el total de la compra
    totalDeCompra = productosEnCarrito.reduce((total, prod) => total + (prod.precio * prod.cantidad), 0);
    totalCompra.innerHTML = `$${totalDeCompra.toLocaleString('es-AR')}`;
    totalCompraMovil.innerHTML = `$${totalDeCompra.toLocaleString('es-AR')}`;

    // Actualizar el total de productos
    totalProductosElement.innerHTML = contarTotalProductos();

    // Guardar en localStorage
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function eliminarProductoDelCarrito(index) {
    productosEnCarrito.splice(index, 1); // Elimina el producto del array
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); // Actualiza el localStorage

    // Limpiar el contenido del carrito
    carritoProductos.innerHTML = '';
    totalDeCompra = 0;

    // Volver a renderizar el carrito si quedan productos
    if (productosEnCarrito.length > 0) {
        productosEnCarrito.forEach((producto, index) => {
            const cantidadCuotas = 6;
            const precioTotalProducto = producto.precio * producto.cantidad;
            const valorCuota = (precioTotalProducto / cantidadCuotas).toFixed(2);

            const div = document.createElement("div");
            div.classList.add("articuloEnCarrito");
            div.innerHTML = `
                <img class="imgComprado" src=".${producto.imagen}" alt="${producto.nombre}">
                <p class="tituloArticulo">${producto.nombre}</p>
                <p class = "totalTit">Total</p>
                <p class="precioArt precioUnidad">$${producto.precio.toLocaleString('es-AR')}</p>
                <p class="precioArt" id="precio-${index}">$${precioTotalProducto.toLocaleString('es-AR')}</p>
                <p class="cuotas" id="cuotas-${index}">${cantidadCuotas} cuotas de $${valorCuota.toLocaleString('es-AR')}</p>

                <div class="botonesArticulo">
                
                    <button class="eliminar">Eliminar del carrito</button>
                    <div>
                        <button class="masMenos" id="mas-${index}">+</button>
                        <p id="cantidad-${index}">${producto.cantidad}</p>
                        <button class="masMenos" id="menos-${index}">-</button>
                    </div>
                </div>
            `;

            div.querySelector(`#mas-${index}`).addEventListener('click', () => {
                producto.cantidad++;
                actualizarCarrito(index);
            });

            div.querySelector(`#menos-${index}`).addEventListener('click', () => {
                if (producto.cantidad > 1) {
                    producto.cantidad--;
                    actualizarCarrito(index);
                }
            });

            div.querySelector(".eliminar").addEventListener('click', () => {
                eliminarProductoDelCarrito(index);
            });

            carritoProductos.append(div);

            totalDeCompra += precioTotalProducto;
        });

        totalCompra.innerHTML = `$${totalDeCompra.toLocaleString('es-AR')}`;
        totalCompraMovil.innerHTML = `$${totalDeCompra.toLocaleString('es-AR')}`;
    } else {
        textoCarritoVacio.classList.remove("disabled");
        totalCompra.innerHTML = `$0`;
        totalCompraMovil.innerHTML = `$0`;
    }

    // Actualizar el total de productos
    totalProductosElement.innerHTML = contarTotalProductos();
}

function contarTotalProductos() {
    const totalProductos = productosEnCarrito.reduce((total, producto) => total + producto.cantidad, 0);
    return totalProductos;
}
