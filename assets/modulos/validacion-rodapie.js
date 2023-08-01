
// Función anónima autoejecutable
(function () {

    // Declarando variables que vamos a trabajar seguido
    const formRodapie = document.querySelector(".rodapie__formulario");
    const inputRodapieNombre = document.querySelector(".rodapie__formulario-nombre");
    const inputRodapieMensaje = document.querySelector(".rodapie__formulario-mensaje");

    // Función para validar regexp al soltar la tecla
    const validarInputsRodapie = () => {

        inputRodapieNombre.addEventListener("keyup", () => {
            let regexNombre = /[a-zA-Z][a-zA-Z0-9]{1,20}/g;
            let mensajeErrorNombre = document.querySelector(".rodapie__error--nombre");
            mensajeErrorNombre.innerHTML = "";
    
            if(!regexNombre.test(inputRodapieNombre.value) || inputRodapieNombre.value == ""){
                mensajeErrorNombre.innerHTML = "Mínimo 2 dígitos.";
            };
        });
    
        inputRodapieMensaje.addEventListener("keyup", () => {
            let regexMensaje = /[a-zA-Z][a-zA-Z0-9]{9,500}/g;
            let mensajeErrorMensaje = document.querySelector(".rodapie__error--mensaje");
            mensajeErrorMensaje.innerHTML = "";
    
            if(!regexMensaje.test(inputRodapieMensaje.value) || inputRodapieMensaje.value == ""){
                mensajeErrorMensaje.innerHTML = "Mínimo 10 dígitos.";
            };
        });

    };

    // Llamando a validar inputs
    validarInputsRodapie();
    
    // Función para validar el evento submit
    const validarEnvioContacto = () => {
        formRodapie.addEventListener("submit", evento => {
            evento.preventDefault();
            if(inputRodapieMensaje.value != "" && inputRodapieNombre.value !="" ){
                window.location.href = `mailto:gbarrantes250689@gmail.com?subject=Contacto&body=Nombre%3A${inputRodapieNombre.value}%0Amensaje%3A%20${inputRodapieMensaje.value}`
            };
        });
    };

    // Llamando a validar envio de contacto
    validarEnvioContacto();
    
})();

