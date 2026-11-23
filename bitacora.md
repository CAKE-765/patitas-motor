## Prueba: enlace perdido en la lista enlazada

### Diagrama original

```text
cabeza
  |
  v
+------+     siguiente     +------+     siguiente     +------+     siguiente
| n1   | ----------------> | n2   | ----------------> | n3   | ----------->
| dato |                    | dato |                    | dato |
+------+                    +------+                    +------+
  02/02                      15/03                      20/05
  vacunación                 control de peso            limpieza dental
  Dra. Ríos                  Dr. Gómez                  Dra. Ríos
  $85.000                    $40.000                    $150.000
```

### Enlace perdido

Si se asigna `null` al siguiente del primer nodo, `n1` deja de apuntar a `n2`:

```js
n1.siguiente = null;
```

El diagrama queda así:

```text
cabeza
  |
  v
+------+     siguiente
| n1   | ----------------> null
| dato |
+------+

n2 y n3 siguen existiendo en memoria, pero ya no forman parte de la cadena que comienza en `cabeza`.
```

### Qué ocurre con el recorrido

El recorrido `while` comienza en `cabeza`, que ahora es `n1`, procesa el dato de `n1` y luego pasa a `n1.siguiente`, que vale `null`.

```js
let actual = cabeza;

while (actual !== null) {
    console.log(actual.dato);
    actual = actual.siguiente;
}
```

Como `actual` pasa a `null`, el ciclo termina. Solo se muestra la atención del 02/02. Las atenciones de `n2` y `n3` no aparecen, aunque los objetos sigan creados.

En el recorrido del costo total ocurre lo mismo: solo se suma el costo de `n1`.

```text
Resultado del costo total: $85000
```

Esto ocurre porque una lista enlazada no busca los nodos por posición: para llegar a `n2`, el recorrido necesita seguir la referencia `n1.siguiente`. Al reemplazarla por `null`, se rompe la ruta hacia `n2` y `n3`.