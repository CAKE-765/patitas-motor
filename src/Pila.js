class Pila {
    constructor() {
        this.tope = null;
        this.cantidad = 0;
    }

    apilar(dato) {
        this.tope = { dato, siguiente: this.tope };
        this.cantidad++;
    }

    desapilar() {
        if (this.estaVacia()) return null;

        const dato = this.tope.dato;
        this.tope = this.tope.siguiente;
        this.cantidad--;
        return dato;
    }

    verTope() {
        return this.tope ? this.tope.dato : null;
    }

    estaVacia() {
        return this.cantidad === 0;
    }

    tamanio() {
        return this.cantidad;
    }
}

module.exports = Pila;
