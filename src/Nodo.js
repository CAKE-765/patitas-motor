class Nodo {
    constructor(dato){
        // dato contiene la información que guardamos en este nodo.
        this.dato = dato;
        // siguiente apunta al próximo nodo; null indica que no hay otro todavía.
        this.siguiente = null;
    }
}

// Permite crear nodos desde otros archivos.
module.exports = Nodo;