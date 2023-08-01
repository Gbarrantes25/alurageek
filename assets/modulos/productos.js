import { accionesCliente } from "./cliente-service.js";

(function () {
    const $productoContainer = document.querySelector(".addproducto__container")
    let $template = document.getElementById("template").content;
    let $fragmento = document.createDocumentFragment();
    const $searchBar = document.querySelector(".cabecera__buscador-input");
    const $mensajeBusquedaError = document.createElement("div");
    $mensajeBusquedaError.classList.add("addproducto__mensajeErrorBusqueda");
    $mensajeBusquedaError.innerHTML = "<p>No se encontró ningún producto</p>"




    // Obtener todos los productos y agregarlos al DOM
    accionesCliente.getAll().then((data) =>{
        try{
            data.forEach(element => {
                $template.querySelector(".addproducto__articulo-img").setAttribute("src", element.urlimagen);
                $template.querySelector(".addproducto__acciones-enlace-editar").setAttribute("href", `editar-productos.html?id=${element.id}`);
                $template.querySelector(".addproducto__acciones-enlace-eliminar").setAttribute("href", `eliminar-producto.html?id=${element.id}`);
                $template.querySelector(".addproducto__texto-nombre").textContent = element.nombre;
                $template.querySelector(".addproducto__texto-precio").textContent = `$ ${element.precio}`;
                $template.querySelector(".addproducto__texto-codigo").textContent = `#${element.codigo}`;
                
                let $clone = document.importNode($template, true);
                $fragmento.appendChild($clone);
            });

            $productoContainer.appendChild($fragmento)
            
            
        } catch (error) {
            alert(error || "Ocurrió un error");
        }
    });


    // Barra de búsqueda
    $searchBar.addEventListener("keyup", () => {
        let barraBusqueda = $searchBar.value.toLowerCase();
        let nombreProducto = $productoContainer.getElementsByClassName("addproducto__texto-nombre");
        const articuloOculto = document.getElementsByClassName("addproducto__articulo-hidden");

        for (let i = 0; i < nombreProducto.length; i++) {
            if(!nombreProducto[i].innerHTML.toLocaleLowerCase().includes(barraBusqueda)){
                nombreProducto[i].parentElement.classList.replace("addproducto__articulo", "addproducto__articulo-hidden");
            } else {
                nombreProducto[i].parentElement.classList.replace("addproducto__articulo-hidden", "addproducto__articulo");
            };
        };

        if(nombreProducto.length == articuloOculto.length){
            $mensajeBusquedaError.style.display = "block";
            $productoContainer.prepend($mensajeBusquedaError);
        } else {
            $mensajeBusquedaError.style.display = "none";
        };
    });
})();