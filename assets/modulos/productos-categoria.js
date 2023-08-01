import { accionesCliente } from "./cliente-service.js";

(function (){
    const url = new URL (window.location);
    const categoria = url.searchParams.get("categoria");
    const $containerProducto = document.querySelector(".addproducto__container");
    const $tituloCategoria = document.querySelector(".addproducto__titulo");
    const $templateCategoria = document.querySelector(".template-categoria").content;
    const $fragmento = document.createDocumentFragment();

    if((categoria == "starwars" || categoria == "consolas") || categoria == "diversos"){
        $tituloCategoria.innerHTML = categoria[0].toUpperCase() + categoria.slice(1);
        accionesCliente.getCategoria(categoria).then((data) => {
            data.forEach(element => {
                $templateCategoria.querySelector(".addproducto__articulo-img").setAttribute("src", element.urlimagen);
                $templateCategoria.querySelector(".addproducto__texto-nombre").textContent = element.nombre;
                $templateCategoria.querySelector(".addproducto__texto-precio").textContent = `$ ${element.precio}`;
                $templateCategoria.querySelector(".addproducto__texto-codigo").textContent = `#${element.codigo}`;
                $templateCategoria.querySelector(".addproducto__texto-enlace").setAttribute("href", `detalle-producto.html?id=${element.id}`);
        
                let $clone = document.importNode($templateCategoria, true);
                $fragmento.appendChild($clone);
            });
        
            $containerProducto.prepend($fragmento)
        });
    } else if (categoria == "") {
        window.location.href = "index.html";
    } else{
        window.location.href = "index.html";
    };
})();
