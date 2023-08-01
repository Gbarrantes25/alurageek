import { accionesCliente } from "./cliente-service.js";

(function () {
    // Variables para barra de búsqueda del index
    const $searchBar = document.querySelector(".cabecera__buscador-input");
    const $templateTodos = document.querySelector(".template-todos").content;
    const $articulosTodos = document.querySelector(".productos__articulos-container--busqueda");
    const $mensajeBusqueda = document.createElement("p");
    $mensajeBusqueda.classList.add("productos__articulo-mensaje");
    $mensajeBusqueda.innerHTML = "No se encontraron productos";


    // Variables para productos por categoría del index
    const $articulosStarwars = document.querySelector(".productos__articulos-container--starwars");
    const $articulosConsolas = document.querySelector(".productos__articulos-container--consolas");
    const $articulosDiversos = document.querySelector(".productos__articulos-container--diversos");
    let $templateStarwars = document.querySelector(".template-starwars").content;
    let $templateConsolas = document.querySelector(".template-consolas").content;
    let $templateDiversos = document.querySelector(".template-diversos").content;
    let $fragmento = document.createDocumentFragment();
    let categorias = ["starwars", "consolas", "diversos"];
    const limiteProducto = 6;

    // Mostrando categoría Starwars
    accionesCliente.getCategoria(categorias[0]).then((data) =>{
        try{
            if(limiteProducto > data.length){
                for (let i = 0; i < data.length; i++) {
                    $templateStarwars.querySelector(".productos__articulo-nombre").textContent = `${data[i].nombre}`;
                    $templateStarwars.querySelector(".productos__articulo-precio").textContent = `$ ${data[i].precio}`;
                    $templateStarwars.querySelector(".productos__articulo-img").setAttribute("src", data[i].urlimagen);
                    $templateStarwars.querySelector(".productos__articulo-codigo").textContent = `#${data[i].codigo}`;
                    $templateStarwars.querySelector(".productos__articulo-ver").setAttribute("href", `detalle-producto.html?id=${data[i].id}`);
                    let $clone = document.importNode($templateStarwars, true);
                    $fragmento.appendChild($clone);
                };
            } else if (limiteProducto <= data.length) {
                for (let i = 0; i < limiteProducto; i++) {
                    $templateStarwars.querySelector(".productos__articulo-nombre").textContent = `${data[i].nombre}`;
                    $templateStarwars.querySelector(".productos__articulo-precio").textContent = `$ ${data[i].precio}`;
                    $templateStarwars.querySelector(".productos__articulo-img").setAttribute("src", data[i].urlimagen);
                    $templateStarwars.querySelector(".productos__articulo-codigo").textContent = `#${data[i].codigo}`;
                    $templateStarwars.querySelector(".productos__articulo-ver").setAttribute("href", `detalle-producto.html?id=${data[i].id}`);
                    let $clone = document.importNode($templateStarwars, true);
                    $fragmento.appendChild($clone);
                };
            };
            
            $articulosStarwars.appendChild($fragmento);

        } catch (error) {
            alert(error || "Ocurrió un error");
        };
    });

    // Mostrando categoría Consolas
    accionesCliente.getCategoria(categorias[1]).then((data) =>{
        try{
            if(limiteProducto > data.length){
                for (let i = 0; i < data.length; i++) {
                    $templateConsolas.querySelector(".productos__articulo-nombre").textContent = `${data[i].nombre}`;
                    $templateConsolas.querySelector(".productos__articulo-precio").textContent = `$ ${data[i].precio}`;
                    $templateConsolas.querySelector(".productos__articulo-img").setAttribute("src", data[i].urlimagen);
                    $templateConsolas.querySelector(".productos__articulo-codigo").textContent = `#${data[i].codigo}`;
                    $templateConsolas.querySelector(".productos__articulo-ver").setAttribute("href", `detalle-producto.html?id=${data[i].id}`);
                    let $clone = document.importNode($templateConsolas, true);
                    $fragmento.appendChild($clone);
                };
            } else if (limiteProducto <= data.length) {
                for (let i = 0; i < limiteProducto; i++) {
                    $templateConsolas.querySelector(".productos__articulo-nombre").textContent = `${data[i].nombre}`;
                    $templateConsolas.querySelector(".productos__articulo-precio").textContent = `$ ${data[i].precio}`;
                    $templateConsolas.querySelector(".productos__articulo-img").setAttribute("src", data[i].urlimagen);
                    $templateConsolas.querySelector(".productos__articulo-codigo").textContent = `#${data[i].codigo}`;
                    $templateConsolas.querySelector(".productos__articulo-ver").setAttribute("href", `detalle-producto.html?id=${data[i].id}`);
                    let $clone = document.importNode($templateConsolas, true);
                    $fragmento.appendChild($clone);
                };
            };
            

            $articulosConsolas.appendChild($fragmento);

        } catch (error) {
            alert(error || "Ocurrió un error");
        };
    });

    // Mostrando categoría Diversos
    accionesCliente.getCategoria(categorias[2]).then((data) =>{
        try{
            if(limiteProducto > data.length){
                for (let i = 0; i < data.length; i++) {
                    $templateDiversos.querySelector(".productos__articulo-nombre").textContent = `${data[i].nombre}`;
                    $templateDiversos.querySelector(".productos__articulo-precio").textContent = `$ ${data[i].precio}`;
                    $templateDiversos.querySelector(".productos__articulo-img").setAttribute("src", data[i].urlimagen);
                    $templateDiversos.querySelector(".productos__articulo-codigo").textContent = `#${data[i].codigo}`;
                    $templateDiversos.querySelector(".productos__articulo-ver").setAttribute("href", `detalle-producto.html?id=${data[i].id}`);
                    let $clone = document.importNode($templateDiversos, true);
                    $fragmento.appendChild($clone);
                };
            } else if (limiteProducto <= data.length) {
                for (let i = 0; i < limiteProducto; i++) {
                    $templateDiversos.querySelector(".productos__articulo-nombre").textContent = `${data[i].nombre}`;
                    $templateDiversos.querySelector(".productos__articulo-precio").textContent = `$ ${data[i].precio}`;
                    $templateDiversos.querySelector(".productos__articulo-img").setAttribute("src", data[i].urlimagen);
                    $templateDiversos.querySelector(".productos__articulo-codigo").textContent = `#${data[i].codigo}`;
                    $templateDiversos.querySelector(".productos__articulo-ver").setAttribute("href", `detalle-producto.html?id=${data[i].id}`);
                    let $clone = document.importNode($templateDiversos, true);
                    $fragmento.appendChild($clone);
                };
            };
            $articulosDiversos.appendChild($fragmento);

        } catch (error) {
            alert(error || "Ocurrió un error");
        };
    });



    // Función para obtener productos solo cuando se activa la barra de búsqueda
    const obtenerBusqueda = () => {
        accionesCliente.getAll().then((data) => {
            try{
                data.forEach(element => {
                    $templateTodos.querySelector(".productos__articulo-img").setAttribute("src", element.urlimagen);
                    $templateTodos.querySelector(".productos__articulo-nombre").textContent = element.nombre;
                    $templateTodos.querySelector(".productos__articulo-precio").textContent = `$ ${element.precio}`;
                    $templateTodos.querySelector(".productos__articulo-codigo").textContent = `#${element.codigo}`;
                    $templateTodos.querySelector(".productos__articulo-ver").setAttribute("href", `detalle-producto.html?id=${element.id}`)
                    let $clone = document.importNode($templateTodos, true);
                    $fragmento.appendChild($clone);
                });
        
                $articulosTodos.appendChild($fragmento)
                                
            } catch (error) {
                alert(error || "Ocurrió un error");
            }
        });
    };

    // Llamada función obtener búsqueda
    obtenerBusqueda();

    // Función para buscar producto mientras se tecla en la barra de búsqueda
    $searchBar.addEventListener("keyup", () =>{
        const $nombreProducto = $articulosTodos.getElementsByClassName("productos__articulo-nombre");
        const $articuloOculto = $articulosTodos.getElementsByClassName("productos__articulo-hidden");
        const $barraBusqueda = $searchBar.value.toLowerCase();

        if($barraBusqueda != ""){
            document.getElementById("banner").style.display = "none";
            document.querySelector(".productos__container--busqueda").style.display = "flex";
            document.querySelector(".productos__container--starwars").style.display = "none";
            document.querySelector(".productos__container--consolas").style.display = "none";
            document.querySelector(".productos__container--diversos").style.display = "none";

            for (let i = 0; i < $nombreProducto.length; i++) {
                if(!$nombreProducto[i].innerHTML.toLocaleLowerCase().includes($barraBusqueda)){
                    $nombreProducto[i].parentElement.classList.replace("productos__articulo", "productos__articulo-hidden");
                } else {
                    $nombreProducto[i].parentElement.classList.replace("productos__articulo-hidden", "productos__articulo");
                };
            };

        } else{
            document.getElementById("banner").style.display = "block";
            document.querySelector(".productos__container--busqueda").style.display = "none";
            document.querySelector(".productos__container--starwars").style.display = "flex";
            document.querySelector(".productos__container--consolas").style.display = "flex";
            document.querySelector(".productos__container--diversos").style.display = "flex";
        };

        if($nombreProducto.length == $articuloOculto.length){
            $mensajeBusqueda.style.display = "block";
            $articulosTodos.prepend($mensajeBusqueda);
        } else {
            $mensajeBusqueda.style.display = "none";
        }
    });
})();