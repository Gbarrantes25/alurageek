
const servidor = `https://64bec3ee5ee688b6250ce722.mockapi.io/productos/articulos`;



// GET - todos los productos
const getAll = async () =>{
    try{
        const respuesta = await fetch (servidor);
        const jsonRespuesta = await respuesta.json();
        return jsonRespuesta;
    } catch (error){
        return error || "Ocurrió un problema"
    };
    
};


// GET Categoria - Todos los productos por categoria
const getCategoria = async (categoria) =>{
    try{
        const respuesta = await fetch (`${servidor}?categoria=${categoria}`);
        const jsonRespuesta = await respuesta.json();
        return jsonRespuesta;
    } catch (error){
        return error || "Ocurrió un problema"
    }
    
};


// GET Producto - Obtener un solo producto para editar
const getProducto = async (id) =>{
    try{
        const respuesta = await fetch (`${servidor}/${id}`);
        const jsonRespuesta = await respuesta.json();
        return jsonRespuesta;
    } catch (error){
        return error || "Ocurrió un problema"
    };
    
};


// CREATE - Crea producto
const postProducto = async (datosNuevoUsuario) => {
    try{
        const respuesta = await fetch(`${servidor}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(datosNuevoUsuario)
        })
    } catch (error) {
        alert(error || "Ocurrió un error");
    };
};


// PUT - editar producto
const editProducto = async (id, datosNuevoUsuario) => {
    try{
        const respuesta = await fetch(`${servidor}/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(datosNuevoUsuario)
        });

    
    } catch (error) {
        return error || "Ocurrió un error";
    };
};


// DELETE - Un producto
const deleteProducto = async (id) =>{
    
    try{
        return fetch (`${servidor}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        });
    } catch (error){
        return error || "Ocurrió un problema"
    };
};

// Bloque de funciones a exportar
export const accionesCliente = {
    getAll,
    getCategoria,
    getProducto,
    postProducto,
    editProducto,
    deleteProducto
};





