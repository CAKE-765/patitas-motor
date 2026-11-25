// Importa la cola que queremos probar.
const Cola = require("../src/cola");

// Cinco turnos de ejemplo; cada uno tiene los datos de una cita.
const turnos = [
    { mascota: "Luna", tutor: "Ana", horaLlegada: "09:00", motivo: "Vacunación" },
    { mascota: "Max", tutor: "Carlos", horaLlegada: "09:15", motivo: "Control" },
    { mascota: "Milo", tutor: "Sofía", horaLlegada: "09:30", motivo: "Consulta" },
    { mascota: "Nina", tutor: "Jorge", horaLlegada: "09:45", motivo: "Desparasitación" },
    { mascota: "Toby", tutor: "Lucía", horaLlegada: "10:00", motivo: "Revisión" }
];

// Crea una fila vacía.
const cola = new Cola();

// Agrega los turnos en el orden en que llegaron.
turnos.forEach((turno) => cola.encolar(turno));

// Ver el frente no saca el turno de la fila.
console.log("Turno al frente:", cola.verFrente());

console.log("\nAtendiendo turnos:");

// Atiende uno por uno hasta que ya no quede nadie esperando.
while (cola.tamanio() > 0) {
    const turno = cola.desencolar();
    console.log(`${turno.horaLlegada} - ${turno.mascota} (${turno.tutor}): ${turno.motivo}`);
}