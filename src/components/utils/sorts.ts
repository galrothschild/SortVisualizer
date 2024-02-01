export const getInsertionSortAnimations = (items: number[]): [number[], number[][]] => {
    const newArray: number[] = [...items];
    const animationsArray = [[1]];
    for (let i = 1; i < newArray.length; i++) {
        let j = i;
        while (j > 0 && newArray[j] < newArray[j - 1]) {
            const temp = newArray[j - 1];
            newArray[j - 1] = newArray[j];
            animationsArray.push([j - 1, j]);
            newArray[j] = temp;
            j--;
        }
    }
    return [newArray, animationsArray];
};
export const getBubbleSortAnimations = (items: number[]): [number[], number[][]] => {
    const newArray: number[] = [...items];
    const animationsArray = [[1]];
    for (let i = 0; i < newArray.length; i++) {
        for (let j = 0; j < newArray.length - i; j++) {
            if (newArray[j] > newArray[j + 1]) {
                const temp = newArray[j];
                newArray[j] = newArray[j + 1];
                newArray[j + 1] = temp;
                animationsArray.push([j, j + 1]);
            }
        }
    }
    return [newArray, animationsArray];
};

const merge = (
    items: number[],
    aux: number[],
    animationsArray: number[][],
    low: number,
    mid: number,
    high: number
) => {
    for (let k = low; k <= high; k++) {
        aux[k] = items[k];
    }
    let i = low, j = mid + 1;
    for (let k = low; k <= high; k++) {
        if (i > mid) {
            animationsArray.push([aux[j], k]);
            items[k] = aux[j];
            j++;
        } else if (j > high) {
            animationsArray.push([aux[i], k]);
            items[k] = aux[i];
            i++;
        } else if (aux[i] <= aux[j]) {
            animationsArray.push([aux[i], k]);
            items[k] = aux[i];
            i++;
        } else {
            animationsArray.push([aux[j], k]);
            items[k] = aux[j];
            j++;
        }
    }
};
export const getMergeSortAnimations = (items: number[], aux: number[], animationsArray: number[][], low: number, high: number): void => {
    if (low >= high) return;

    const mid = low + Math.floor((high - low) / 2);

    getMergeSortAnimations(items, aux, animationsArray, low, mid);
    getMergeSortAnimations(items, aux, animationsArray, mid + 1, high);
    merge(items, aux, animationsArray, low, mid, high);
};