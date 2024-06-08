const prompt = require('prompt-sync')();
// Debemos definir el grafo con sus nodos, sus valores y los nodos
vecinos de cada nodo
const graph = {
A: { value: 3, neighbors: ['E', 'D', 'C'] },
B: { value: 1, neighbors: ['I', 'G', 'C'] },
C: { value: 5, neighbors: ['B', 'G', 'H', 'A'] },
D: { value: 8, neighbors: ['A', 'F', 'H'] },
E: { value: 10, neighbors: ['I', 'A', 'F'] },
F: { value: 12, neighbors: ['E', 'D', 'H'] },
G: { value: 7, neighbors: ['I', 'B', 'C'] },
H: { value: 2, neighbors: ['C', 'D', 'F'] },
I: { value: 5, neighbors: ['G', 'B', 'E'] }
};
// Definimos la funci�n de b�squeda tab�, que recibir� como
par�metro el nodo desde el que se comenzar� la b�squeda
function tabuSearch(startNode) {
let currentNode = startNode; // Nodo actual
let bestNode = currentNode; // Nodo con mejor utilidad
encontrado (cuando reci�n arrancamos el programa es el mismo nodo de
inicio)
let tabuList = []; // Lista tab� guardar los nodos prohibidos,
es decir, los nodos que ya no podemos visitar porque ya los hemos
visitado una vez
let iterations = 0;
let maxIterations = Object.keys(graph).length * 2; // M�ximo de
iteraciones, lo que nos dar� una chance m�s grande de que el
algoritmo explore el grafo, pero no tanta como para colapsar en
tiempo de ejecuci�n
while (iterations < maxIterations) {
let neighbors = graph[currentNode].neighbors; // Vecinos
del nodo actual
let bestNeighbor = null; // Mejor utilidad del nodo vecino
no visitado, es decir, no tab� encontrado
let bestValue = Infinity; // Valor del mejor vecino, como
buscamos el m�nimo ponemos nuestra variable a un valor alto para que
cualquier valor de los nodos sea menor que el valor inicial
// Evaluaamos cada nodo vecino del nodo actual
neighbors.forEach(neighbor => {
// Si el nodo vecino no est� en la lista tab� (nodos
prohibidos) y tiene un valor menor que el mejor valor encontrado
entonces
if (!tabuList.includes(neighbor) &&
graph[neighbor].value < bestValue) {
bestNeighbor = neighbor; // Actualizamos el mejor
nodo vecino
bestValue = graph[neighbor].value; // Actualizamos
el mejor valor utilidad
}
});
// Si no encuentra ning�n vecino v�lido, terminamos la
b�squeda
if (bestNeighbor === null) {
break;
}
currentNode = bestNeighbor; // Movemos al mejor nodo vecino
que hemos encontrado
// Si el valor del nodo actual es mejor que el mejor valor
encontrado o utilidad entonces
if (graph[currentNode].value < graph[bestNode].value) {
bestNode = currentNode; // Actualizamos el mejor nodo
}
// Agregamos el nodo actual a la lista tab� o lista de nodos
prohibidos
tabuList.push(currentNode);
iterations++; // Vamos incrementando el valor de las
iteraciones que hemos hecho
}
return bestNode; // Retornamos oregresamos el mejor nodo
encontrado o utilidad
}
function getStartNode() {
while (true) {
const startNode = prompt("Ingrese el nodo de inicio
(A-I):").toUpperCase();
if (graph[startNode]) {
return startNode; // S�lo si el nodo es v�lido lo
retornamos
} else {
alert("Nodo no v�lido. Por favor, ingrese un nodo
v�lido (A-I)."); // De lo contrario, mostramos una alerta
}
}
}
// Solicitamos que el usuario digite el nodo de inicio del cual
quiere empezar la b�squeda tab�
const startNode = getStartNode();
const bestNode = tabuSearch(startNode);
console.log(`El mejor estado posible es: ${bestNode} con un valor
de: ${graph[bestNode].value}`)