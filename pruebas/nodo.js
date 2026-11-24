const Nodo = require("../src/Nodo");

const n1 = new Nodo({ fecha: "02/02", motivo: "vacunación", veterinario: "Dra. Ríos", costo: 85000 });
const n2 = new Nodo({ fecha: "15/03", motivo: "control de peso", veterinario: "Dr. Gómez", costo: 40000 });
const n3 = new Nodo({ fecha: "20/05", motivo: "limpieza dental", veterinario: "Dra. Ríos", costo: 150000 });

n1.siguiente = n2;
n2.siguiente = n3;
n3.siguiente = null;
const cabeza = n1;


let actual = cabeza;

while (actual !== null) {
    console.log(actual.dato);
    actual = actual.siguiente;
}

let total = 0;
actual = cabeza;

while (actual !== null) {
    total += actual.dato.costo;
    actual = actual.siguiente;
}

console.log(`Costo total: $${total}`);