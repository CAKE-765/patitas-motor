const Recepcion = require("./Recepcion");

const citas = new Map([
    ["mascotas", [
        { hora: "8:00", mascota: "Toby", tipo: "General", motivo: "Control de vacunas" },
        { hora: "8:05", mascota: "Max", tipo: "General", motivo: "Revisión de piel" },
        { hora: "8:10", mascota: "Luna", tipo: "Urgencia", motivo: "Intoxicación" },
        { hora: "8:20", mascota: "Simón", tipo: "General", motivo: "Corte de uñas" },
        { hora: "8:25", mascota: "Kira", tipo: "Urgencia", motivo: "Herida en pata" },
        { hora: "8:40", mascota: "Nala", tipo: "General", motivo: "Desparasitación" },
        { hora: "9:00", mascota: "Rocky", tipo: "Urgencia", motivo: "Dificultad para respirar" }
    ]]
]);

const recepcion = new Recepcion();
const turnos = citas.get("mascotas");
const atenciones = [];
let indice = 0;
let tiempoActual = 0;

while (true) {
    while (
        indice < turnos.length &&
        minutos(turnos[indice].hora) <= tiempoActual
    ) {
        recepcion.registrarLlegada(turnos[indice]);
        indice++;
    }

    const turno = recepcion.llamarSiguiente();

    if (!turno) {
        if (indice === turnos.length) break;
        tiempoActual = minutos(turnos[indice].hora);
        continue;
    }

    const espera = tiempoActual - minutos(turno.hora);

    atenciones.push({
        mascota: turno.mascota,
        tipo: turno.tipo,
        llegada: turno.hora,
        atencion: formatearHora(tiempoActual),
        espera
    });

    tiempoActual += 20;
}

console.table(atenciones);

for (const tipo of ["Urgencia", "General"]) {
    const grupo = atenciones.filter((atencion) => atencion.tipo === tipo);
    const promedio = grupo.reduce((total, atencion) => total + atencion.espera, 0) / grupo.length;

    console.log(`Espera promedio de ${tipo.toLowerCase()}: ${promedio.toFixed(2)} minutos`);
}

function minutos(hora) {
    const [horas, minutos] = hora.split(":").map(Number);
    return horas * 60 + minutos;
}

function formatearHora(tiempo) {
    const horas = Math.floor(tiempo / 60);
    const minutos = tiempo % 60;
    return `${horas}:${String(minutos).padStart(2, "0")}`;
}
