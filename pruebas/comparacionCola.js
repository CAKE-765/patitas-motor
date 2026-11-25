// Importa la cola enlazada que se comparará con un arreglo.
const Cola = require("../src/cola");

// Cantidad de veces que agregaremos y quitaremos un turno.
const cantidad = 100000;
// Reutilizamos un turno para medir la estructura y no el tiempo de crear datos.
const turno = {
    mascota: "Luna",
    tutor: "Ana",
    horaLlegada: "09:00",
    motivo: "Consulta"
};

const cola = new Cola();

// Mide cuánto tarda la cola en agregar los 100.000 turnos.
console.time("Cola - encolar");
for (let i = 0; i < cantidad; i++) {
    cola.encolar(turno);
}
console.timeEnd("Cola - encolar");

// Mide cuánto tarda la cola en atenderlos todos.
console.time("Cola - desencolar");
while (cola.tamanio() > 0) {
    cola.desencolar();
}
console.timeEnd("Cola - desencolar");

const arreglo = [];

// Mide cuánto tarda un arreglo en agregar los mismos turnos con push.
console.time("Arreglo - push");
for (let i = 0; i < cantidad; i++) {
    arreglo.push(turno);
}
console.timeEnd("Arreglo - push");

// Mide cuánto tarda en quitarlos del inicio con shift.
console.time("Arreglo - shift");
while (arreglo.length > 0) {
    arreglo.shift();
}
console.timeEnd("Arreglo - shift");
