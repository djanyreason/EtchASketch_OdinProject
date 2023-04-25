//Recursively removes all descendents of parameter node
function clearChildren(node) {
  while (node.childNodes.length > 0) {
    clearChildren(node.childNodes[0]);
    node.removeChild(node.childNodes[0]);
  }
}

//Builds an Etch-a-Sketch in the HTML of grid size dimension x dimension, with
//the total Etch-a-Sketch size being 513px x 513px
//Takes one parameter: dimension, which should be an integer, and is max 100
function buildEAS(dimension) {
  if(dimension > 100) return buildEAS(100);

  const frame = document.getElementById("etchFrame");
  clearChildren(frame); //reset the Etch Frame

  //Define the size of each square in the Etch a Sketch so the total size of
  //all boxes is as close to 513px as possible without going over; uses 512
  //instead of 513 to account for 1px borders around each etch box; 1px is 
  //subtracted from calculation to account for the 1px etch box border
  const boxSize = Math.floor(512 / dimension) - 1;

  //Get the total borders needed around the grid to maintain 512px
  const gridBorder = 513 - (dimension * (boxSize + 1));

  for(let i = 0; i < dimension; i++) { // for loop to add rows to frame
    const row = document.createElement("div");
    row.className = "etchRow";

    //set borders around the grid to maintain 512px
    row.style.borderLeft = Math.floor(gridBorder/2) + "px solid black";
    row.style.borderRight = Math.round(gridBorder/2) + "px solid black";
    if(i === 0) row.style.borderTop = Math.round(gridBorder / 2) + 
                                      "px solid black";
    else if (i === dimension - 1) 
                row.style.borderBottom = Math.floor(gridBorder / 2) + 
                                      "px solid black";
    
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

function resetButton() {
  const gridSize = parseInt(prompt("Enter an integer from 1-100 for the size of the new Etch-a-Sketch"));

  if(isNaN(gridSize)) return alert("Error: Invalid Entry");
  else if (gridSize <= 0) return alert("Error: Entry must be positive");
  else if (gridSize > 100) return alert ("Error: Entry must be less than or equal to 100");
  else buildEAS(gridSize);
}

buildEAS(16); //start with a 16x16 grid