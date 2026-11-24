const Cola = require("../src/cola");

const turnos = [
    { mascota: "Luna", tutor: "Ana", horaLlegada: "09:00", motivo: "Vacunación" },
    { mascota: "Max", tutor: "Carlos", horaLlegada: "09:15", motivo: "Control" },
    { mascota: "Milo", tutor: "Sofía", horaLlegada: "09:30", motivo: "Consulta" },
    { mascota: "Nina", tutor: "Jorge", horaLlegada: "09:45", motivo: "Desparasitación" },
    { mascota: "Toby", tutor: "Lucía", horaLlegada: "10:00", motivo: "Revisión" }
];

const cola = new Cola();

turnos.forEach((turno) => cola.encolar(turno));

console.log("Turno al frente:", cola.verFrente());

console.log("\nAtendiendo turnos:");

while (cola.tamanio() > 0) {
    const turno = cola.desencolar();
    console.log(`${turno.horaLlegada} - ${turno.mascota} (${turno.tutor}): ${turno.motivo}`);
}