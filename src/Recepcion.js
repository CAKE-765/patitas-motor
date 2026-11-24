class Recepcion {
    constructor() {
        this.urgencias = new Cola();
        this.generales = new Cola();
    }
    // turno = { mascota, tipo: "Urgencia" | "General" }
    registrarLlegada(turno) {
        if (turno.tipo === "Urgencia") this.urgencias.encolar(turno);
        else this.generales.encolar(turno);
    }
    // Urgencias primero; dentro de cada tipo, orden de llegada
    llamarSiguiente() {
        if (this.urgencias.tamanio() > 0) return this.urgencias.desencolar();
        return this.generales.desencolar();
    }
}

module.exports = Recepcion;