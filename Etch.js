//Builds an Etch-a-Sketch in the HTML of grid size dimension x dimension
//Takes one parameter: dimension, which should be an integer, and is max 100
function buildEAS(dimension) {
  if(dimension > 100) return buildEAS(100);

  const frame = document.getElementById("etchFrame");

  //Define the size of each square in the Etch a Sketch so the total size is as
  //close to 512px as possible without going over; minimum size of 2px is 
  //enforced for aesthetic purposes (this can cause box to exceed 512px); 1px is
  //subtracted to account for the 1px border
  const boxSize = ((dimension * Math.round(512 / dimension)) <= 512) ? 
                  Math.max((Math.round(512 / dimension) - 1),2) : 
                  Math.max((Math.round(512 / dimension) - 2),2);

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