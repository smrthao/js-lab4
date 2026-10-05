const SortLib = (function() {
    // Допоміжна функція для обробки розріджених масивів
    function processSparse(arr) {
        let cleanArr = [];
        let undefinedCount = 0;
        
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === undefined) {
                undefinedCount++;
            } else {
                cleanArr.push(arr[i]);
            }
        }
        
        if (undefinedCount > 0) {
            console.log(`Знайдено та оброблено ${undefinedCount} undefined-елементів (розріджений масив).`);
        }
        
        return { cleanArr, undefinedCount };
    }

    // Відновлення масиву з undefined елементами (додаємо в кінець)
    function restoreSparse(cleanArr, undefinedCount) {
        for (let i = 0; i < undefinedCount; i++) {
            cleanArr.push(undefined);
        }
        return cleanArr;
    }

    return {
        // 1. Сортування обміном (Bubble Sort)
        bubbleSort: function(arr, asc = true) {
            let { cleanArr, undefinedCount } = processSparse(arr);
            let comps = 0, swaps = 0;
            let n = cleanArr.length;
            
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - i - 1; j++) {
                    comps++;
                    let condition = asc ? cleanArr[j] > cleanArr[j + 1] : cleanArr[j] < cleanArr[j + 1];
                    if (condition) {
                        swaps++;
                        let temp = cleanArr[j];
                        cleanArr[j] = cleanArr[j + 1];
                        cleanArr[j + 1] = temp;
                    }
                }
            }
            console.log(`BubbleSort: Порівнянь - ${comps}, Обмінів - ${swaps}`);
            return restoreSparse(cleanArr, undefinedCount);
        },

        // 2. Сортування вибором (Selection Sort - мінімальних/максимальних елементів)
        selectionSort: function(arr, asc = true) {
            let { cleanArr, undefinedCount } = processSparse(arr);
            let comps = 0, swaps = 0;
            let n = cleanArr.length;

            for (let i = 0; i < n - 1; i++) {
                let targetIdx = i;
                for (let j = i + 1; j < n; j++) {
                    comps++;
                    let condition = asc ? cleanArr[j] < cleanArr[targetIdx] : cleanArr[j] > cleanArr[targetIdx];
                    if (condition) {
                        targetIdx = j;
                    }
                }
                if (targetIdx !== i) {
                    swaps++;
                    let temp = cleanArr[i];
                    cleanArr[i] = cleanArr[targetIdx];
                    cleanArr[targetIdx] = temp;
                }
            }
            console.log(`SelectionSort: Порівнянь - ${comps}, Обмінів - ${swaps}`);
            return restoreSparse(cleanArr, undefinedCount);
        },

        // 3. Сортування вставками (Insertion Sort)
        insertionSort: function(arr, asc = true) {
            let { cleanArr, undefinedCount } = processSparse(arr);
            let comps = 0, moves = 0;
            let n = cleanArr.length;

            for (let i = 1; i < n; i++) {
                let key = cleanArr[i];
                let j = i - 1;
                
                comps++;
                while (j >= 0 && (asc ? cleanArr[j] > key : cleanArr[j] < key)) {
                    cleanArr[j + 1] = cleanArr[j];
                    moves++;
                    j = j - 1;
                    if (j >= 0) comps++;
                }
                cleanArr[j + 1] = key;
                moves++;
            }
            console.log(`InsertionSort: Порівнянь - ${comps}, Переміщень - ${moves}`);
            return restoreSparse(cleanArr, undefinedCount);
        },

        // 4. Сортування Шелла (Shell Sort)
        shellSort: function(arr, asc = true) {
            let { cleanArr, undefinedCount } = processSparse(arr);
            let comps = 0, moves = 0;
            let n = cleanArr.length;

            for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
                for (let i = gap; i < n; i++) {
                    let temp = cleanArr[i];
                    let j;
                    
                    comps++;
                    for (j = i; j >= gap && (asc ? cleanArr[j - gap] > temp : cleanArr[j - gap] < temp); j -= gap) {
                        cleanArr[j] = cleanArr[j - gap];
                        moves++;
                        if (j - gap >= gap) comps++;
                    }
                    cleanArr[j] = temp;
                    moves++;
                }
            }
            console.log(`ShellSort: Порівнянь - ${comps}, Переміщень - ${moves}`);
            return restoreSparse(cleanArr, undefinedCount);
        },

        // 5. Швидке сортування (Хоара - Quick Sort)
        quickSort: function(arr, asc = true) {
            let { cleanArr, undefinedCount } = processSparse(arr);
            let comps = 0, swaps = 0;

            function partition(arr, low, high) {
                let pivot = arr[Math.floor((low + high) / 2)];
                let i = low;
                let j = high;

                while (i <= j) {
                    comps++;
                    while (asc ? arr[i] < pivot : arr[i] > pivot) {
                        i++;
                        comps++;
                    }
                    comps++;
                    while (asc ? arr[j] > pivot : arr[j] < pivot) {
                        j--;
                        comps++;
                    }
                    if (i <= j) {
                        swaps++;
                        let temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                        i++;
                        j--;
                    }
                }
                return i;
            }

            function qs(arr, low, high) {
                if (arr.length > 1) {
                    let index = partition(arr, low, high);
                    if (low < index - 1) {
                        qs(arr, low, index - 1);
                    }
                    if (index < high) {
                        qs(arr, index, high);
                    }
                }
                return arr;
            }

            cleanArr = qs(cleanArr, 0, cleanArr.length - 1);
            console.log(`QuickSort (Hoare): Порівнянь - ${comps}, Обмінів - ${swaps}`);
            return restoreSparse(cleanArr, undefinedCount);
        }
    };
})();