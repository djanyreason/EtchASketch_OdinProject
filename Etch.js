//Builds an Etch-a-Sketch in the HTML of grid size dimension x dimension
//Takes one parameter: dimension, which should be an integer
function buildEAS(dimension) {
 const frame = document.getElementById("etchFrame");

 for(let i = 0; i < dimension; i++) { // for loop to add rows to frame
  const row = document.createElement("div");
  row.className = "etchRow";
  for(let j = 0; j < dimension; j++) { //for loop to add boxes to each row
    const box = document.createElement("div");
    box.className = "etchBox";
    row.appendChild(box);
  }
  frame.appendChild(row);
 }
}

buildEAS(16); //start with a 16x16 grid