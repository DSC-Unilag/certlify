/**
 * Increases font size value by 1
 */
function increaseValue() {
    var value = Number(document.getElementById('number').value);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;
    let width = document.getElementById('container').offsetWidth;
    //let height = width / rat;
    boundary.fontsize = value / width;
    mark();
}

/**
 * Decreases font size value by 1
 */
function decreaseValue() {
    var value = Number(document.getElementById('number').value);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    document.getElementById('number').value = value;
    let width = document.getElementById('container').offsetWidth;
  //  let height = width / rat;
    boundary.fontsize = value / width;
    mark();
}

/**
 * Sets the font to the user selected font
 */
function newfont() {
    var value = Number(document.getElementById('number').value);
    let width = document.getElementById('container').offsetWidth;
   // let height = width / rat;
    boundary.fontsize = value / width;
    mark();
}