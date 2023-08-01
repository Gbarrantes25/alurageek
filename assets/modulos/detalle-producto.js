import { accionesCliente } from "./cliente-service.js";

(function(){

    // Declaramos variables
    let url = new URL (window.location);
    let urlId = url.searchParams.get("id");
    let limite = 6;
    const $similaresContainer = document.querySelector(".similares__container");
    const $templateSimilares = document.querySelector(".template-similares").content;
    const $fragmento = document.createDocumentFragment();

    // Obteniendo el detalle del producto y sus similares.
    accionesCliente.getProducto(urlId).then((data) =>{
        if(data.id == urlId){
            document.querySelector(".detalle__img").setAttribute("src", data.urlimagen)
            document.querySelector(".detalle__titulo").textContent = data.nombre;
            document.querySelector(".detalle__precio").textContent = `$ ${data.precio}`;
            document.querySelector(".detalle__descripcion").textContent = data.descripcion;

            accionesCliente.getCategoria(data.categoria).then((similares) => {
                if(limite > similares.length){
                    for(let i = 0; i < similares.length; i++){
                        $templateSimilares.querySelector(".similares__img").setAttribute("src", similares[i].urlimagen);
                        $templateSimilares.querySelector(".similares__nombre").textContent = similares[i].nombre;
                        $templateSimilares.querySelector(".similares__precio").textContent = `$ ${similares[i].precio}`;
                        $templateSimilares.querySelector(".similares__ver").setAttribute("href", `detalle-producto.html?id=${similares[i].id}`);
                        let $clone = document.importNode($templateSimilares, true);
                        $fragmento.appendChild($clone);
                    };
                } else if(limite <= similares.length){
                    for(let i = 0; i < limite; i++){
                        $templateSimilares.querySelector(".similares__img").setAttribute("src", similares[i].urlimagen);
                        $templateSimilares.querySelector(".similares__nombre").textContent = similares[i].nombre;
                        $templateSimilares.querySelector(".similares__precio").textContent = `$ ${similares[i].precio}`;
                        $templateSimilares.querySelector(".similares__ver").setAttribute("href", `detalle-producto.html?id=${similares[i].id}`);
                        let $clone = document.importNode($templateSimilares, true);
                        $fragmento.appendChild($clone);
                    };
                };
                $similaresContainer.appendChild($fragmento);
            });
        } else {
            window.location.href = "index.html";
        };
    });

})();
