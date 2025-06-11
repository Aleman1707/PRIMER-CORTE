// Variables y tipos primitivos
var nombre = "Ana";      // string
let edad = 20;           // number
const esEstudiante = true; // boolean

// Operadores y expresiones
let resultado = (10 + 5) * 2;         // operadores aritméticos y precedencia
let esMayor = edad > 18;             // comparación
let puedeEntrar = esMayor && esEstudiante; // operador lógico

// Condicionales
if (puedeEntrar) {
  console.log(nombre + " puede entrar.");
} else {
  console.log(nombre + " no puede entrar.");
}

// switch
let dia = "lunes";
switch (dia) {
  case "lunes":
    console.log("Comienza la semana");
    break;
  case "viernes":
    console.log("¡Por fin viernes!");
    break;
  default:
    console.log("Otro día más");
}

// Bucles
// for
for (let i = 1; i <= 3; i++) {
  console.log("Repetición #" + i);
}

// while
let contador = 0;
while (contador < 2) {
  console.log("while -> " + contador);
  contador++;
}

// do-while
let x = 0;
do {
  console.log("do-while -> " + x);
  x++;
} while (x < 1);

// Función declarada
function saludar(nombre) {
  return "Hola, " + nombre;
}

// Función como expresión
const despedir = function(nombre) {
  return "Adiós, " + nombre;
};

console.log(saludar("Luis"));
console.log(despedir("Luis"));
