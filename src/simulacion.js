// Recepcion organiza las filas y decide a quién llamar primero.
const Recepcion = require("./Recepcion");
const Editor = require("./Editor");

// Horario de llegada de cada mascota. El Map guarda la lista bajo la clave "mascotas".
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

// La recepción tiene una fila de urgencias y otra de consultas generales.
const recepcion = new Recepcion();
const editor = new Editor();
const turnos = citas.get("mascotas");
// Aquí guardaremos la hora en que se atendió a cada mascota y cuánto esperó.
const atenciones = [];
// Toby ya tiene un historial inicial con su nombre y especie.
const claveHistorial = (mascota) => mascota === "Toby" ? "Toby (perro)" : mascota;
let errorRecepcionSimulado = false;
// indice señala cuál es la próxima llegada que todavía no registramos.
let indice = 0;
// Guardamos el tiempo como minutos desde las 00:00 para poder hacer cuentas.
let tiempoActual = 0;

// Repetimos hasta registrar y atender todos los turnos.
while (true) {
    // Registra todas las mascotas que ya llegaron a la hora actual.
    while (
        indice < turnos.length &&
        minutos(turnos[indice].hora) <= tiempoActual
    ) {
        recepcion.registrarLlegada(turnos[indice]);
        indice++;
    }

    // Si la sala está vacía, esperamos la próxima llegada sin llamar a recepción.
    if (recepcion.urgencias.tamanio() === 0 && recepcion.generales.tamanio() === 0) {
        if (indice === turnos.length) break;
        tiempoActual = minutos(turnos[indice].hora);
        continue;
    }

    // Recepcion elige una urgencia antes que una consulta general.
    const turno = recepcion.llamarSiguiente();

    if (!turno) {
        throw new Error("La recepción no pudo llamar un turno que estaba en espera.");
    }

    // La espera es la hora de atención menos la hora de llegada.
    const espera = tiempoActual - minutos(turno.hora);

    // Guardamos los datos que queremos mostrar al final.
    const atencion = {
        mascota: turno.mascota,
        tipo: turno.tipo,
        motivo: turno.motivo,
        llegada: turno.hora,
        atencion: formatearHora(tiempoActual),
        espera
    };
    atenciones.push(atencion);

    // Registramos cada atención en la lista enlazada de la mascota mediante Editor.
    const mascotaCorrecta = claveHistorial(turno.mascota);
    const registroClinico = {
        fecha: atencion.atencion,
        motivo: turno.motivo,
        tipo: turno.tipo,
        llegada: turno.hora,
        espera
    };

    if (!errorRecepcionSimulado) {
        // La primera atención se registra por error en otra mascota y luego se deshace.
        const mascotaEquivocada =
            mascotaCorrecta === "Max" ? "Toby (perro)" : "Max";
        editor.agregar(mascotaEquivocada, registroClinico);
        console.log(
            `Error detectado: la atención era de ${mascotaCorrecta}, no de ${mascotaEquivocada}.`
        );

        if (!editor.deshacer()) {
            throw new Error("No se pudo deshacer el registro equivocado.");
        }

        editor.agregar(mascotaCorrecta, registroClinico);
        errorRecepcionSimulado = true;
    } else {
        editor.agregar(mascotaCorrecta, registroClinico);
    }

    // El consultorio queda ocupado durante 20 minutos.
    tiempoActual += 20;
}

// Muestra una tabla con las horas y la espera de cada mascota.
console.table(atenciones);

// Calcula por separado la espera promedio de urgencias y de consultas generales.
for (const tipo of ["Urgencia", "General"]) {
    const grupo = atenciones.filter((atencion) => atencion.tipo === tipo);
    const promedio = grupo.reduce((total, atencion) => total + atencion.espera, 0) / grupo.length;

    console.log(`Espera promedio de ${tipo.toLowerCase()}: ${promedio.toFixed(2)} minutos`);
}

// Muestra el historial actualizado de cada mascota atendida.
console.log("Historiales clínicos actualizados:");
for (const mascota of new Set(atenciones.map((atencion) => atencion.mascota))) {
    const historial = editor.registro.obtenerHistorial(claveHistorial(mascota));
    console.log(`Historial de ${mascota}:`);
    console.table(historial.aArreglo());
}

// Convierte una hora como "8:05" en minutos para poder compararla y restarla.
function minutos(hora) {
    const [horas, minutos] = hora.split(":").map(Number);
    return horas * 60 + minutos;
}

// Convierte los minutos nuevamente a una hora legible como "8:05".
function formatearHora(tiempo) {
    const horas = Math.floor(tiempo / 60);
    const minutos = tiempo % 60;
    return `${horas}:${String(minutos).padStart(2, "0")}`;
}
