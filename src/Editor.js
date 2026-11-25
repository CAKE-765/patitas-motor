const Pila = require("./Pila");
const { RegistroClinico } = require("./ListaEnlazada");

class Editor {
    constructor(registro = new RegistroClinico()) {
        // El editor trabaja sobre este registro clínico.
        this.registro = registro;
        // Una pila guarda lo que se puede deshacer y la otra lo que se puede rehacer.
        this.pilaDeshacer = new Pila();
        this.pilaRehacer = new Pila();
    }

    agregar(mascota, atencion) {
        // Recordamos si el historial ya existía para poder revertir también su creación.
        const historialExistia = this.registro.obtenerHistorial(mascota) !== null;

        // Primero hacemos el cambio real en el registro.
        this.registro.registrarAtencion(mascota, atencion);
        // Guardamos los datos necesarios para deshacerlo.
        this.pilaDeshacer.apilar({
            tipo: "agregar",
            mascota,
            atencion,
            historialExistia
        });
        // Una acción nueva elimina la posibilidad de rehacer acciones antiguas.
        this.pilaRehacer = new Pila();
        return atencion;
    }

    eliminar(mascota, condicion) {
        const historial = this.registro.obtenerHistorial(mascota);
        // No se puede eliminar si la mascota no tiene historial.
        if (!historial) return null;

        // Buscamos la posición para poder restaurar la atención en el mismo lugar.
        const atenciones = historial.aArreglo();
        const indice = atenciones.findIndex(condicion);
        if (indice === -1) return null;

        const atencion = historial.eliminar(condicion);
        // Guardamos la atención anterior y la condición para deshacer y rehacer.
        this.pilaDeshacer.apilar({
            tipo: "eliminar",
            mascota,
            atencion,
            anterior: indice > 0 ? atenciones[indice - 1] : null,
            condicion
        });
        // Al cambiar el historial, se descarta la rama de rehacer.
        this.pilaRehacer = new Pila();
        return atencion;
    }

    deshacer() {
        // Sacamos la acción más reciente que todavía se puede deshacer.
        const accion = this.pilaDeshacer.desapilar();
        if (!accion) return false;

        if (accion.tipo === "agregar") {
            // Deshacer un agregado significa quitar esa atención.
            const historial = this.registro.obtenerHistorial(accion.mascota);
            const eliminada = historial.eliminar(
                (atencion) => atencion === accion.atencion
            );
            if (eliminada === null) {
                throw new Error("No se encontró la atención que se debía deshacer.");
            }

            // Si el agregado creó el historial y lo dejó vacío, lo quitamos también.
            if (!accion.historialExistia && historial.estaVacia()) {
                this.registro.historiales.delete(accion.mascota);
            }
        } else {
            // Deshacer una eliminación significa restaurar la atención.
            this._restaurar(accion);
        }

        // La acción revertida ahora puede rehacerse.
        this.pilaRehacer.apilar(accion);
        return true;
    }

    rehacer() {
        // Sacamos la acción más reciente que se había deshecho.
        const accion = this.pilaRehacer.desapilar();
        if (!accion) return false;

        // Volvemos a aplicar el cambio original.
        if (accion.tipo === "agregar") {
            this.registro.registrarAtencion(accion.mascota, accion.atencion);
        } else {
            const historial = this.registro.obtenerHistorial(accion.mascota);
            const eliminada = historial.eliminar(accion.condicion);
            if (eliminada === null) {
                throw new Error("No se encontró la atención que se debía rehacer.");
            }
        }

        // Después de rehacer, la acción vuelve a estar disponible para deshacer.
        this.pilaDeshacer.apilar(accion);
        return true;
    }

    _restaurar(accion) {
        const historial = this.registro.obtenerHistorial(accion.mascota);
        if (!historial) {
            throw new Error("No existe el historial donde se debía restaurar la atención.");
        }

        // Si no había una atención anterior, la eliminada era la primera.
        if (accion.anterior === null) {
            historial.agregarAlInicio(accion.atencion);
            return;
        }

        // Si no era la primera, se coloca después de la atención que estaba antes.
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
