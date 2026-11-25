// Recepcion usa colas para organizar los turnos que esperan.
const Cola = require("./cola");

class Recepcion {
    constructor() {
        // Las urgencias y las consultas generales esperan en filas separadas.
        this.urgencias = new Cola();
        this.generales = new Cola();
    }
    // turno = { mascota, tipo: "Urgencia" | "General" }
    registrarLlegada(turno) {
        // Agrega cada turno al final de la fila que le corresponde.
        if (turno.tipo === "Urgencia") this.urgencias.encolar(turno);
        else this.generales.encolar(turno);
    }
    // Urgencias primero; dentro de cada tipo, orden de llegada
    llamarSiguiente() {
        if (this.urgencias.tamanio() === 0 && this.generales.tamanio() === 0) {
            console.log("No hay mascotas esperando.");
            return null;
        }

        // Si hay urgencias, llama la primera; si no, llama la primera general.
        if (this.urgencias.tamanio() > 0) return this.urgencias.desencolar();
        return this.generales.desencolar();
    }
}

// Permite que la simulación use la clase Recepcion.
module.exports = Recepcion;