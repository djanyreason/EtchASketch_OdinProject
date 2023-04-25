//Builds an Etch-a-Sketch in the HTML of grid size dimension x dimension
//Takes one parameter: dimension, which should be an integer
function buildEAS(dimension) {
 const frame = document.getElementById("etchFrame");

 //Define the size of each square in the Etch a Sketch so the total size is as
 //close to 512px as possible without going over; remove 1px extra for border
 const boxSize = ((dimension * Math.round(512 / dimension)) <= 512) ? 
                 (Math.round(512 / dimension) - 1) : 
                 (Math.round(512 / dimension) - 2);

 for(let i = 0; i < dimension; i++) { // for loop to add rows to frame
  const row = document.createElement("div");
  (i === 0) ? row.className = "etchRow topRow" : row.className = "etchRow";
  for(let j = 0; j < dimension; j++) { //for loop to add boxes to each row
    const box = document.createElement("div");
    box.className = "etchBox";
    box.style.height = boxSize + "px";
    box.style.width = boxSize + "px";

    // Add drawing/Etch-a-Sketching functionality
    box.addEventListener("mouseover", () => 
                         { box.style.backgroundColor = "black"; });
    
    row.appendChild(box);
  }
  frame.appendChild(row);
 }
}

buildEAS(16); //start with a 16x16 grid