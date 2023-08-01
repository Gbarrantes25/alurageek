import { accionesCliente } from "./cliente-service.js";

(function () {
    const url = new URL (window.location);
    const urlId = url.searchParams.get("id");

    // Validamos si existe el id en el servidor, de ser así procede a eliminar
    accionesCliente.getProducto(urlId).then((data) =>{
        if(data.id == urlId){
            if(confirm("¿Desea eliminar producto?") == true){
                accionesCliente.deleteProducto(data.id);
                alert("Producto eliminado con éxito...");
                window.location.href = "productos.html";
            } else {
                window.location.href = "productos.html";
            };
        } else {
            window.location.href = "productos.html";
        };
    });
})();