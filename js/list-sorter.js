const sortedListEl = document.querySelector('#js-sortedlist');
const unsortedListEl = document.querySelector('#js-unsortedlist');
const addToListBtn = document.querySelector('#addToList');
/**
 * @type {HTMLInputElement}
 */
const listItemTxtBox = document.querySelector('#listitem');
const sortBtn = document.querySelector('#sort');

const defaultComparator = (a, b) => {
    if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b);
    } else if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
    }
    throw TypeError('Unsupported type');
};

/*
 * Upon adding an item to the unsorted list and then clicking the sort button, sort
 * the list in ascending order and display it in the ordered list.
 */


function mergeSort(array, comparator = defaultComparator, order = 'ascending') {
    const orderDigit = order === 'ascending' ? 1 : -1;
    function mergeSortRec(left, right) {
        // If the left index is greater than or equal to the right index, return
        if (left >= right) {
            return
        }

        // Calculate the middle index and recursively call mergeSortRec on the left and right sub-arrays
        const middle = Math.floor((left + right) / 2)
        mergeSortRec(left, middle)
        mergeSortRec(middle + 1, right)

        // Merge the two sorted sub-arrays within the input array using merge function
        mergeRec(array, left, middle, right)
    }
    function mergeRec(array, left, middle, right) {
        // Create two new arrays to hold the left and right sub-arrays
        const leftArray = array.slice(left, middle + 1)
        const rightArray = array.slice(middle + 1, right + 1)

        // Initialize pointers for the left and right sub-arrays and the merged array
        let leftIndex = 0
        let rightIndex = 0
        let mergedIndex = left

        // Merge the two sub-arrays into the merged array in ascending or descending order
        while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
            if (Math.sign(comparator(leftArray[leftIndex], rightArray[rightIndex]) * orderDigit) < 0) {
                array[mergedIndex] = leftArray[leftIndex]
                leftIndex++
            } else {
                array[mergedIndex] = rightArray[rightIndex]
                rightIndex++
            }
            mergedIndex++
        }

        // Add any remaining elements from the left sub-array to the merged array
        while (leftIndex < leftArray.length) {
            array[mergedIndex] = leftArray[leftIndex]
            leftIndex++
            mergedIndex++
        }

        // Add any remaining elements from the right sub-array to the merged array
        while (rightIndex < rightArray.length) {
            array[mergedIndex] = rightArray[rightIndex]
            rightIndex++
            mergedIndex++
        }
    }

    // Call mergeSortRec function with the input array and the left and right indices
    mergeSortRec(0, array.length - 1)

    // Return the sorted input array
    return array
}

const addToList = () => {
    const text = listItemTxtBox.value;
    if (text.trim().length > 0) {
        const li = document.createElement('li');
        li.textContent = text;
        unsortedListEl.append(li);
        listItemTxtBox.value = '';
    }
};

addToListBtn.addEventListener('click', addToList);

const sortList = () => {
    const elements = [...unsortedListEl.children];
    mergeSort(elements, (a, b) => {
        return a.textContent.localeCompare(b.textContent);
    }, 'ascending');
    sortedListEl.replaceChildren(...elements);
};

sortBtn.addEventListener('click', sortList);