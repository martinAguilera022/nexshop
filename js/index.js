const productos = [
    // Artículos en oferta
    {
        id: 1,
        nombre: "VANS Knu Skool",
        precio: 179900,
        imagen: "./img/articulos/vans-knu-skool.jpg",
        categoria: "zapatillas",
        oferta: true,
        popular: false,
    },
    {
        id: 2,
        nombre: "Letterman Versatile Oversized Jacket",
        precio: 92850,
        imagen: "./img/articulos/chaqueta-grisjpg.jpg",
        categoria: "buzos",
        oferta: true,
        popular: false,
    },
    {
        id: 3,
        nombre: "Remera Oversize Ikkaku Gris",
        precio: 40000,
        imagen: "./img/articulos/oversize-remera-ikkaku.jpg",
        categoria: "remeras",
        oferta: true,
        popular: false,
    },
    {
        id: 4,
        nombre: "Jean estrellado Denim",
        precio: 60000,
        imagen: "./img/articulos/jean-star.jpg",
        categoria: "pantalones",
        oferta: true,
        popular: false,
    },
    {
        id: 5,
        nombre: "Buzo Process",
        precio: 28999,
        imagen: "./img/articulos/buzos-process-gris.jpg",
        categoria: "buzos",
        oferta: true,
        popular: false,
    },
    {
        id: 6,
        nombre: "Buzo OVERSIZE Gothic Negro 153",
        precio: 40564.30,
        imagen: "./img/articulos/buzo-ocn-Oversize-unisex-gothic.jpg",
        categoria: "buzos",
        oferta: true,
        popular: false,
    },
    {
        id: 7,
        nombre: "Pantalon Ripstop Wide Cargo",
        precio: 52925,
        imagen: "./img/articulos/pantalon-cargo-marron.jpg",
        categoria: "pantalones",
        oferta: true,
        popular: false,
    },
    {
        id: 8,
        nombre: "Gorro de punto unisex bordado",
        precio: 20900,
        imagen: "./img/articulos/gorro-negro-cruz.jpg",
        categoria: "accesorios",
        oferta: true,
        popular: false,
    },
    {
        id: 9,
        nombre: "Gorra de béisbol Póker",
        precio: 15000,
        imagen: "./img/articulos/gorra.jpg",
        categoria: "accesorios",
        oferta: true,
        popular: false,
    },
    {
        id: 10,
        nombre: "Adidas Campus Gris",
        precio: 172900,
        imagen: "./img/articulos/adidas-campus-gris.jpg",
        categoria: "zapatillas",
        oferta: true,
        popular: false,
    },
    // Artículos populares
    {
        id: 11,
        nombre: "Remera Verde Oversize",
        precio: 24999,
        imagen: "./img/articulos/remera-verde.jpg",
        categoria: "remeras",
        oferta: false,
        popular: true,
    },
    {
        id: 12,
        nombre: "Remera Blanca con estampado",
        precio: 26000,
        imagen: "./img/articulos/remera-blanca.jpg",
        categoria: "remeras",
        oferta: false,
        popular: true,
    },
    {
        id: 13,
        nombre: "Adidas Forum low",
        precio: 175999,
        imagen: "./img/articulos/zapatilla.jpg",
        categoria: "zapatillas",
        oferta: false,
        popular: true,
    },
    {
        id: 14,
        nombre: "Buzo Oversize Blanco",
        precio: 42999,
        imagen: "./img/articulos/buzo-oversize.jpg",
        categoria: "buzos",
        oferta: false,
        popular: true,
    },
    {
        id: 15,
        nombre: "Riñonera Negra Cierre Gris",
        precio: 31999,
        imagen: "./img/articulos/rinionera-negra.jpg",
        categoria: "accesorios",
        oferta: false,
        popular: true,
    },
    {
        id: 16,
        nombre: "Jean cargo Denim",
        precio: 40999,
        imagen: "./img/articulos/jean-cargo.jpg",
        categoria: "pantalones",
        oferta: false,
        popular: true,
    },
];



let botonesAgregar ;

function mostrarProductosPopulares(){
    let contenedorPopulares = document.querySelector('.articulosPopularesIndex');
    contenedorPopulares.innerHTML='';

    const productPopular = productos.filter(producto => producto.popular);

    productPopular.forEach(producto =>{
        const articulo = document.createElement('a');
        
        articulo.innerHTML = `
         <div class="articulo art1">
                <img class="img-populares" src="${producto.imagen}" alt="${producto.nombre}">
                <p>${producto.nombre}</p>
                <p>$${producto.precio.toLocaleString('es-AR')},00</p>
                <button class="buttonCarrito" id = "${producto.id}">Añadir al carrito</button>
            </div>
        `
        contenedorPopulares.appendChild(articulo);
    })
    actualizarBotonesCarrito();
    console.log(botonesAgregar);
}

function mostrarOfertas(){
    let contenedorOfertas = document.querySelector('.articulosOfertasIndex');
    contenedorOfertas.innerHTML= '';


    const productosEnOferta = productos.filter(producto => producto.oferta);
    
    productosEnOferta.forEach(producto => {
        const articulo = document.createElement('a');
        
        articulo.innerHTML = `
            <div class="articulo">
                        <img class="img-populares" src="${producto.imagen}">
                        <div class="articuloP">
                            <p class="tituloOfertas">${producto.nombre}</p>
                            <p class="tituloOfertas">$${producto.precio.toLocaleString('es-AR')},00</p>

                        </div>
                        <div class="btonCarrito">
                            <button class="buttonCarrito" id="${producto.id}"  aria-label="Añadir al carrito">
                                <img src="./icons/online-store-cart.png" alt="Carrito">
                            </button>
                        </div>
                        <button class="aniadirCarrito buttonCarrito"  id="${producto.id}">Añadir al carrito</button>
                    </div> 
        `
        contenedorOfertas.appendChild(articulo);
    });
    actualizarBotonesCarrito();
    console.log(botonesAgregar)
}







function actualizarBotonesCarrito(){
    botonesAgregar = document.querySelectorAll('.buttonCarrito');

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click" , agregarAlCarrito);
    })
}



let carrito ;
const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

if(productosEnCarrito){
    carrito = productosEnCarrito
}else{
    carrito = []
}



function agregarAlCarrito(e){
    const idBoton = Number(e.currentTarget.id);
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    
    if(carrito.some(producto => producto.id === idBoton)){
        productoAgregado.cantidad =productoAgregado.cantidad + 1;
    }else{
    productoAgregado.cantidad = 1;
    carrito.push(productoAgregado);
    }

    
    localStorage.setItem('productos-en-carrito',JSON.stringify(carrito))

} 

mostrarProductosPopulares();
mostrarOfertas();





