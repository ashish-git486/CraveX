
// Using bubble sort algorithm for demonstration

/**
 * Bubble sort implementation for sorting food items
 * @param {Array} arr - Array of food items
 * @param {string} sortBy - Field to sort by ('price', 'rating', 'name', 'restaurant')
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted array
 */
export function bubbleSort(arr, sortBy, order = 'asc') {
  const array = [...arr]; 
  const n = array.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      let shouldSwap = false;
      
      // Compare based on sort criteria
      switch (sortBy) {
        case 'price':
          const price1 = parseFloat(array[j].price.replace(/[^\d.]/g, ''));
          const price2 = parseFloat(array[j + 1].price.replace(/[^\d.]/g, ''));
          shouldSwap = order === 'asc' ? price1 > price2 : price1 < price2;
          break;
          
        case 'rating':
          const rating1 = parseFloat(array[j].rating);
          const rating2 = parseFloat(array[j + 1].rating);
          shouldSwap = order === 'asc' ? rating1 > rating2 : rating1 < rating2;
          break;
          
        case 'name':
          shouldSwap = order === 'asc' 
            ? array[j].name.localeCompare(array[j + 1].name) > 0
            : array[j].name.localeCompare(array[j + 1].name) < 0;
          break;
          
        case 'restaurant':
          shouldSwap = order === 'asc'
            ? array[j].restaurant.localeCompare(array[j + 1].restaurant) > 0
            : array[j].restaurant.localeCompare(array[j + 1].restaurant) < 0;
          break;
          
        default:
          shouldSwap = false;
      }
      
      // Swap elements if needed
      if (shouldSwap) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  
  return array;
}

/**
 * Selection sort implementation for sorting food items
 * @param {Array} arr - Array of food items
 * @param {string} sortBy - Field to sort by ('price', 'rating', 'name', 'restaurant')
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted array
 */
export function selectionSort(arr, sortBy, order = 'asc') {
  const array = [...arr];
  const n = array.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      let shouldUpdate = false;
      
      switch (sortBy) {
        case 'price':
          const price1 = parseFloat(array[j].price.replace(/[^\d.]/g, ''));
          const price2 = parseFloat(array[minIndex].price.replace(/[^\d.]/g, ''));
          shouldUpdate = order === 'asc' ? price1 < price2 : price1 > price2;
          break;
          
        case 'rating':
          const rating1 = parseFloat(array[j].rating);
          const rating2 = parseFloat(array[minIndex].rating);
          shouldUpdate = order === 'asc' ? rating1 < rating2 : rating1 > rating2;
          break;
          
        case 'name':
          shouldUpdate = order === 'asc'
            ? array[j].name.localeCompare(array[minIndex].name) < 0
            : array[j].name.localeCompare(array[minIndex].name) > 0;
          break;
          
        case 'restaurant':
          shouldUpdate = order === 'asc'
            ? array[j].restaurant.localeCompare(array[minIndex].restaurant) < 0
            : array[j].restaurant.localeCompare(array[minIndex].restaurant) > 0;
          break;
          
        default:
          shouldUpdate = false;
      }
      
      if (shouldUpdate) {
        minIndex = j;
      }
    }
    
    // Swap the found minimum element with the first element
    if (minIndex !== i) {
      const temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
    }
  }
  
  return array;
}

/**
 * Insertion sort implementation for sorting food items
 * @param {Array} arr - Array of food items
 * @param {string} sortBy - Field to sort by ('price', 'rating', 'name', 'restaurant')
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted array
 */
export function insertionSort(arr, sortBy, order = 'asc') {
  const array = [...arr];
  const n = array.length;
  
  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;
    
    while (j >= 0) {
      let shouldMove = false;
      
      switch (sortBy) {
        case 'price':
          const price1 = parseFloat(key.price.replace(/[^\d.]/g, ''));
          const price2 = parseFloat(array[j].price.replace(/[^\d.]/g, ''));
          shouldMove = order === 'asc' ? price1 < price2 : price1 > price2;
          break;
          
        case 'rating':
          const rating1 = parseFloat(key.rating);
          const rating2 = parseFloat(array[j].rating);
          shouldMove = order === 'asc' ? rating1 < rating2 : rating1 > rating2;
          break;
          
        case 'name':
          shouldMove = order === 'asc'
            ? key.name.localeCompare(array[j].name) < 0
            : key.name.localeCompare(array[j].name) > 0;
          break;
          
        case 'restaurant':
          shouldMove = order === 'asc'
            ? key.restaurant.localeCompare(array[j].restaurant) < 0
            : key.restaurant.localeCompare(array[j].restaurant) > 0;
          break;
          
        default:
          shouldMove = false;
      }
      
      if (shouldMove) {
        array[j + 1] = array[j];
        j--;
      } else {
        break;
      }
    }
    
    array[j + 1] = key;
  }
  
  return array;
}

/**
 * Main sorting function that uses bubble sort by default
 * @param {Array} data - Array of food items
 * @param {string} sortBy - Field to sort by
 * @param {string} order - Sort order
 * @param {string} algorithm - Sorting algorithm to use ('bubble', 'selection', 'insertion')
 * @returns {Array} - Sorted array
 */
export function sortFoodItems(data, sortBy, order = 'asc', algorithm = 'bubble') {
  if (!data || data.length === 0) return data;
  
  switch (algorithm) {
    case 'selection':
      return selectionSort(data, sortBy, order);
    case 'insertion':
      return insertionSort(data, sortBy, order);
    case 'bubble':
    default:
      return bubbleSort(data, sortBy, order);
  }
} 