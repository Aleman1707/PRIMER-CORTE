
let numeros = [5, 10, 15];
console.log("Inicial:", numeros);

// push - Agrega un número al final
numeros.push(20);
console.log("Después de push:", numeros);

// pop - Quita el último número
let ultimo = numeros.pop();
console.log("Después de pop:", numeros, "(quitado:", ultimo + ")");

// map - Crea un nuevo array con cada número multiplicado por 2
let dobles = numeros.map(function(num) {
  return num * 2;
});
console.log("Map (dobles):", dobles);

// filter - Filtra solo los números mayores a 10
let mayores = numeros.filter(function(num) {
  return num > 10;
});
console.log("Filter (>10):", mayores);

// forEach - Muestra cada número en consola
console.log("forEach:");
numeros.forEach(function(num, index) {
  console.log("Índice " + index + ": " + num);
});

// find - Busca el primer número mayor a 8
let encontrado = numeros.find(function(num) {
  return num > 8;
});
console.log("Find (>8):", encontrado);
