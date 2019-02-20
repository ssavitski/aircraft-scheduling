/**
 * remove specific value or values from array
 * @param {*} array - array of items
 */

export default function(array) {
  let what, a = arguments, L = a.length, ax;

  while(L > 1 && array.length) {
    what = a[--L];

    while((ax = array.indexOf(what)) !== -1) {
      array.splice(ax, 1);
    }
  }

  return array;
}