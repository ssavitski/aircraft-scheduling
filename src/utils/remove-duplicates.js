/**
 * Remove duplicates from an array of objects
 * @param arr - array of objects
 * @param prop - property of each object to compare
 * @returns {Array}
 */

export default function(arr, prop) {
  const obj = {};

  for (let i = 0, len = arr.length; i < len; i++) {
    if (!obj[arr[i][prop]]) {
      obj[arr[i][prop]] = arr[i];
    }
  }

  const newArr = [];

  for (const key in obj) {
    newArr.push(obj[key]);
  }

  return newArr;
}