// Importa la clase para crear nodos enlazados.
const Nodo = require("../src/Nodo");

// Cada nodo guarda una atención clínica.
const n1 = new Nodo({ fecha: "02/02", motivo: "vacunación", veterinario: "Dra. Ríos", costo: 85000 });
const n2 = new Nodo({ fecha: "15/03", motivo: "control de peso", veterinario: "Dr. Gómez", costo: 40000 });
const n3 = new Nodo({ fecha: "20/05", motivo: "limpieza dental", veterinario: "Dra. Ríos", costo: 150000 });

// Conecta los nodos: n1 lleva a n2 y n2 lleva a n3.
n1.siguiente = n2;
n2.siguiente = n3;
// n3 es el último, por eso no apunta a otro nodo.
n3.siguiente = null;
// cabeza señala dónde empieza la cadena.
const cabeza = n1;


// Recorre la cadena desde la cabeza y muestra cada atención.
let actual = cabeza;

while (actual !== null) {
    console.log(actual.dato);
    actual = actual.siguiente;
}

// Vuelve al inicio para sumar el costo de todas las atenciones.
let total = 0;
actual = cabeza;

while (actual !== null) {
    total += actual.dato.costo;
    actual = actual.siguiente;
}

// Muestra la suma de los costos.
console.log(`Costo total: $${total}`);