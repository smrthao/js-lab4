// Генерація масивів
function generateDenseArray(size) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 1000));
    }
    return arr;
}

function generateSparseArray(size) {
    let arr = new Array(size);
    for (let i = 0; i < size; i++) {
        if (Math.random() > 0.2) { // 80% шанс на число, 20% - undefined
            arr[i] = Math.floor(Math.random() * 1000);
        }
    }
    return arr;
}

const N = 100;
let denseArr = generateDenseArray(N);
let sparseArr = generateSparseArray(N);

console.log("=== Демонстрація на нерозрідженому масиві (100 елементів) ===");
console.log("Bubble Sort (за спаданням):", SortLib.bubbleSort([...denseArr], false));
console.log("Selection Sort (за зростанням):", SortLib.selectionSort([...denseArr], true));
console.log("Insertion Sort (за зростанням):", SortLib.insertionSort([...denseArr], true));
console.log("Shell Sort (за спаданням):", SortLib.shellSort([...denseArr], false));
console.log("Quick Sort (за зростанням):", SortLib.quickSort([...denseArr], true));

console.log("\n=== Демонстрація на розрідженому масиві (100 елементів) ===");
console.log("Bubble Sort (за зростанням):", SortLib.bubbleSort([...sparseArr], true));
console.log("Quick Sort (за спаданням):", SortLib.quickSort([...sparseArr], false));