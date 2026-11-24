const Cola = require("../src/cola");

const cantidad = 100000;
const turno = {
    mascota: "Luna",
    tutor: "Ana",
    horaLlegada: "09:00",
    motivo: "Consulta"
};

const cola = new Cola();

console.time("Cola - encolar");
for (let i = 0; i < cantidad; i++) {
    cola.encolar(turno);
}
console.timeEnd("Cola - encolar");

console.time("Cola - desencolar");
while (cola.tamanio() > 0) {
    cola.desencolar();
}
console.timeEnd("Cola - desencolar");

const arreglo = [];

console.time("Arreglo - push");
for (let i = 0; i < cantidad; i++) {
    arreglo.push(turno);
}
console.timeEnd("Arreglo - push");

console.time("Arreglo - shift");
while (arreglo.length > 0) {
    arreglo.shift();
}
console.timeEnd("Arreglo - shift");
