// Importa la clase que permite guardar atenciones en una lista enlazada.
const { ListaEnlazada } = require("../src/ListaEnlazada");
// Importa las atenciones de ejemplo de Lola.
const lola = require("../src/RegistroCliente");

// Crea una lista vacía para guardar esas atenciones.
const listalola = new ListaEnlazada();

// Agrega cada atención al final, respetando el orden del arreglo.
lola.forEach((atencion) => {
    listalola.agregarAlFinal(atencion);
});

// Muestra todas las atenciones juntas como un arreglo.
console.log(listalola.aArreglo());

// Recorre la lista y muestra cada atención con sus datos principales.
listalola.recorrer((atencion) => {
    console.log(`${atencion.fecha} - ${atencion.motivo} - ${atencion.veterinario} - ${atencion.costo}`)
});
