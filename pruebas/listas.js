const ListasEnlazadas = require("../src/ListaEnlazada");
const lola = require("../src/RegistroCliente");

const listalola = new ListaEnlazada();

lola.forEach((atencion) => {
    listalola.agregarAlFinal(atencion);
});

console.log(listalola.aArreglo());

listalola.recorrer((atencion) => {
    console.log(`${atencion.fecha} - ${atencion.motivo} - ${atencion.veterinario} - ${atencion.costo}`)
});
