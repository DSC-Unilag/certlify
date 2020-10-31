/**
 * 
 */
function increaseValue() {
    var value = Number(document.getElementById('number').value);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;
   // let width = document.getElementById('container').offsetWidth;
    //let height = width / rat;
    boundary.fontsize = value / rat;
    mark();
    console.log(value);
}

/**
 * 
 */
function decreaseValue() {
    var value = Number(document.getElementById('number').value);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    document.getElementById('number').value = value;
    //let width = document.getElementById('container').offsetWidth;
  //  let height = width / rat;
    boundary.fontsize = value / rat;
    mark();
    console.log(value);
}

/**
 * 
 */
function newfont() {
    var value = Number(document.getElementById('number').value);
    let width = document.getElementById('container').offsetWidth;
    let height = width / rat;
    boundary.fontsize = value / height;
    mark();
}