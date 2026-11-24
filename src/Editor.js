const Pila = require("./Pila");
const { RegistroClinico } = require("./ListaEnlazada");

class Editor {
    constructor(registro = new RegistroClinico()) {
        this.registro = registro;
        this.pilaDeshacer = new Pila();
        this.pilaRehacer = new Pila();
    }

    agregar(mascota, atencion) {
        const historialExistia = this.registro.obtenerHistorial(mascota) !== null;

        this.registro.registrarAtencion(mascota, atencion);
        this.pilaDeshacer.apilar({
            tipo: "agregar",
            mascota,
            atencion,
            historialExistia
        });
        this.pilaRehacer = new Pila();
        return atencion;
    }

    eliminar(mascota, condicion) {
        const historial = this.registro.obtenerHistorial(mascota);
        if (!historial) return null;

        const atenciones = historial.aArreglo();
        const indice = atenciones.findIndex(condicion);
        if (indice === -1) return null;

        const atencion = historial.eliminar(condicion);
        this.pilaDeshacer.apilar({
            tipo: "eliminar",
            mascota,
            atencion,
            anterior: indice > 0 ? atenciones[indice - 1] : null,
            condicion
        });
        this.pilaRehacer = new Pila();
        return atencion;
    }

    deshacer() {
        const accion = this.pilaDeshacer.desapilar();
        if (!accion) return false;

        if (accion.tipo === "agregar") {
            const historial = this.registro.obtenerHistorial(accion.mascota);
            const eliminada = historial.eliminar(
                (atencion) => atencion === accion.atencion
            );
            if (eliminada === null) {
                throw new Error("No se encontró la atención que se debía deshacer.");
            }

            if (!accion.historialExistia && historial.estaVacia()) {
                this.registro.historiales.delete(accion.mascota);
            }
        } else {
            this._restaurar(accion);
        }

        this.pilaRehacer.apilar(accion);
        return true;
    }

    rehacer() {
        const accion = this.pilaRehacer.desapilar();
        if (!accion) return false;

        if (accion.tipo === "agregar") {
            this.registro.registrarAtencion(accion.mascota, accion.atencion);
        } else {
            const historial = this.registro.obtenerHistorial(accion.mascota);
            const eliminada = historial.eliminar(accion.condicion);
            if (eliminada === null) {
                throw new Error("No se encontró la atención que se debía rehacer.");
            }
        }

        this.pilaDeshacer.apilar(accion);
        return true;
    }

    _restaurar(accion) {
        const historial = this.registro.obtenerHistorial(accion.mascota);
        if (!historial) {
            throw new Error("No existe el historial donde se debía restaurar la atención.");
        }

        if (accion.anterior === null) {
            historial.agregarAlInicio(accion.atencion);
            return;
        }

        const insertada = historial.insertarDespuesDe(
            (atencion) => atencion === accion.anterior,
            accion.atencion
        );
        if (!insertada) {
            throw new Error("No se encontró la atención anterior para restaurar el orden.");
        }
    }
}

module.exports = Editor;
