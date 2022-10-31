'use strict';


// Discos:
var discosArray = []; // Array de discos

//Funciones para validaciones

/**
 * Valida que el dato ingresado sea correcto.
 * @param {string} cadena
 * @returns
 */
function validarString(cadena) {
    /* Si lo ingresado es distinto a vacío (es decir, ingresó algo) */
    if (cadena != null){
        /* elimina los espacios en blanco en ambos extremos del string. */
        cadena = cadena.trim();
    }

    /* Si ingresa datos vacīos o clickea en cancelar sin ingresar nada */
    if (cadena == "" || cadena == null || cadena == undefined){
        /* Muestro mensaje de alerta */
        alert ("Algo salió mal, volvé a ingresar un dato. (No debe estar vacío)");
        return true;
    }
    return false;
}

/**
 * Valida que el código no esté repetido y que esté en rango.
 * @param {number} codigo
 * @returns
 */
function validarCodigo(codigo){
    let flag = false;
    /* Si tengo como mínimo un disco cargado */
    if (discosArray.length > 0){
        /* Recorro los discos */
        for (let disco of discosArray) {
            /* Si el codigo del disco ingresado es igual a algún código existente */
            if (disco.codigoDisco == codigo){
                /* Muestro mensaje de alerta */
                alert("El codigo está repetido, ingresá otro código.")
                flag = true;
            }
        }
    }

    /* Si el código no está en rango, es string o está vacīo*/
    if (codigo <= 0 || codigo > 999 || isNaN(codigo) || codigo == ""){
        /* Muestro mensaje de alerta */
        alert("Código invalido. Debe estar entre 1 y 999.");
        flag = true;
    }
    return flag;
}


/**
 * Valida que la duración esté en rango.
 * @param {number} duracion
 * @returns
 */
function validacionDuracion(duracion) {
    let flag = false;
    /* Si la duración no está entre 0 y 7200(inclusive), o no es un número */
    if (duracion < 0 || duracion > 7200 || isNaN(duracion)){
        /* Muestro mensaje de alerta */
        alert("La duracion no es válida. Debe estar entre 0 y 7200.");
        flag = true;
    }
    return flag;
}



// Función Cargar:
/**
 * Carga nuevo disco. Se llama a la función con el evento click desde el html.
 */
const Cargar = () => {

    let disco = {} //Creo el objeto disco

    /* Bucle para pedir datos del disco. */
    /* Pido ingresar datos, hasta que la función de validar que corresponda de FALSE y salga del bucle. */
    do {
        disco.nombreDisco = prompt("Ingrese el nombre del disco.");
    } while (validarString(disco.nombreDisco)) // llamar a la función, que devuelve true o false.

    do{
        disco.banda = prompt("Ingrese el nombre de la banda.");
    } while (validarString(disco.banda)) // llamar a la función, que devuelve true o false.

    do {
        disco.codigoDisco = parseInt(prompt("Ingrese código numérico del disco."));
    } while (validarCodigo(disco.codigoDisco)); // llamar a la función, que devuelve true o false.

    disco.pistasArray = [] // Creo el array de pistas adentro del objeto disco.

    /* Bucle para pedir los datos de las pistas */
    do {
        let pista = {} // Creo el objeto pista
       
        /* Pido ingresar datos, hasta que la función de validar que corresponda de FALSE y salga del bucle. */
        do {
            pista.nombreCancion = prompt("Ingrese una canción.");
        } while (validarString(pista.nombreCancion))
        do {
            pista.duracionCancion = parseInt(prompt("Ingrese la duración de la canción."));
        } while (validacionDuracion(pista.duracionCancion ));

        /* Hago un push, es decir ingreso la pista dentro del array de pistas, que es parte del objeto disco.*/
        disco.pistasArray.push(pista);

    /* Pregunto si quiere seguir cargando canciones. Si pone cancelar, da FALSE y sale del bucle. */    
    } while (confirm("¿Quiere seguir cargando canciones?"));

    /* Ingreso el disco dentro del array de discos. */
    discosArray.push(disco)
};

// Función Mostrar:
/**
 * Muestra discos. Se llama a la función con el evento click desde el html.
 */
const Mostrar = () => {

    /* Agarra el lugar del HTML donde se va a mostrar la cantidad de discos, y concatena la cantidad de discos*/
    let infoDiscos = document.getElementById ('cantidad');
    infoDiscos.innerHTML = `<div class="disk-quantity">Cantidad de discos: <span id="cantidad">${discosArray.length}</span></div>` ; //La cantidad de discos es la longitud del array de discos.

    /* Agarra el contenedor del HTML donde se va a mostrar la información de los discos y arma el HTML.*/
    let contenedor = document.getElementById('info');
   
    /* Empiezo con el contenedor vacīo.*/
    contenedor.innerHTML = '';

    /* Recorro el array de discos elemento por elemento, es decir, disco por disco, y por cada uno de ellos, muestro la información con una estructura de html.*/
    for(let disco of discosArray) {

        /* Inicializo la variable color en vacīo. Será una clase de ccs. Luego puede cambiar de valores dependiendo si quiero destacar algo. */
        let color = ""; 

        /* Inicialozo la duración del disco en 0. Luego va a ir sumándo las duraciones de cada canción. */
        let duracionDisco = 0; 

        /* Inicializo la pista de mayor duración en -1 (válido para este contexto). Variable que se va a usar para comparar y encontra la pista de mayor duración.*/
        let pistaMax = -1; 

        /* Inicializo la variable que indicará el nombre de la pista de mayor duración*/
        let nombrePistaMax = "";
        
        /* Inicializo la variable html en vacīo, que será el html que se irá creando por cada disco.*/
        let html = '';
       
       /* Por cada disco, voy a crear la estructura siguiente. Irá contactenando líneas*/
        html += '\n     <div class="disk">';
        html += '\n         <div class="disk__cover">';
        html += '\n             <div class="disk__cover-image color">';
        html += '\n                 <img src="assets/img/disk.png" alt="icono disco">';
        html += '\n             </div>';
        html += '\n             <div class="disk__code">';
        html += `\n                <span> Código ${disco.codigoDisco} </span>`; //inserta el código del disco.
        html += '\n             </div>';
        html += '\n             <div class="disk__cover-title">';
        html += `\n                 <h3>${disco.nombreDisco}</h3>`; //inserta el nombre del disco.
        html += `\n                 <h4>${disco.banda}</h4>`; //inserta la banda del disco.
        html += '\n             </div>';
        html += '\n         </div>';
        html += '\n         <div class="disk__summary">';
        html += '\n             <div class="disk__summary-songs">';
        html += `\n                 Pistas <span>${disco.pistasArray.length}</span>`; //inserta la cantidad de pistas del disco. 
        html += '\n             </div>';
        html += '\n             <div class="disk__summary-songs">';
                                    /* Creo una variable con el array de las pistas del disco. */    
                                    let pistas = disco.pistasArray; 

                                    /* Recorro el array de pistas elemento por elemento, es decir, pista por pista*/
                                    for (let pista of pistas){

                                        /* Sumo a la variable duracionDisco, la duración de cada pista.*/
                                        duracionDisco += pista.duracionCancion;
                                    }
                                    
                                    /* Inserto la duración del disco*/
        html += `\n                 Duración <span>${duracionDisco}s</span>`;
        html += '\n             </div>';
        html += '\n         </div>';
        html += '\n         <div class="disk__songs">';
        html += '\n             <ul class="disk__songs-list">';
                                
                                /* Recorro el array de pistas nuevamente, esta vez para escribir la información de cada pista. */    
                                for(let pista of pistas) {

                                    /* Si la duración de la pista es mayor a 180s*/
                                    if (pista.duracionCancion > 180) {
                                        /* La variable color cambia a rojo. En la línea 216 esta variable se inserta dentro del html para cambiarle el estilo. */
                                        color = "red";
                                    } else {
                                        /* Si no es mayor a 180, no cambia el color.*/
                                        color = "";
                                    }

                                    /* Algortimo para averiguar la pista de mayor duración dentro del disco.*/
                                    if (pista.duracionCancion > pistaMax){
                                        pistaMax = pista.duracionCancion;
                                        nombrePistaMax = pista.nombreCancion;
                                    }
                                    /* Inserta nombre y duración de la canción. */
        html += `\n                 <li class="disk__songs-list-items">
                                        <span class="disk__song-item">
                                            ${pista.nombreCancion} 
                                        </span>
                                        <span class="disk__song-duration ${color}">
                                            ${pista.duracionCancion}s
                                        </span>
                                    </li>`;
                                }
        html += '\n             </ul>';
        html += '\n         </div>';
        html += '\n         <div class="disk__summary-total">';
        html += '\n             <div class="disk__summary-total__item">';
                                    /* Calcula el promedio de duración de las pistas*/
        html += `\n                <span>Promedio de duración: </span>${(duracionDisco/(disco.pistasArray.length)).toFixed(0)}s `;
        html += '\n             </div>';
        html += '\n             <div class="disk__summary-total__item">';
                                    /* Muestra la pista con mayor duración. Usa el resultado del algoritmo de la línea 207.*/
        html += `\n               <span>  Pista con mayor duración: </span>${nombrePistaMax} - ${pistaMax}s  `;
        html += '\n             </div>';
        html += '\n         </div>';
        html += '\n     </div>';

        /* Inserta en el contenedor del html, todo lo creado anteriormente.*/
        contenedor.innerHTML += html;
    }


};


