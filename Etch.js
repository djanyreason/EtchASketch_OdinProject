//Recursively removes all descendents of parameter node
function clearChildren(node) {
  while (node.childNodes.length > 0) {
    clearChildren(node.childNodes[0]);
    node.removeChild(node.childNodes[0]);
  }
}

//Helper function to recursively convert an integer - dec - into a Hex string
function dec2hex(dec) {
  if(dec >= 16) return dec2hex(Math.floor(dec / 16)) + dec2hex(dec % 16);
  switch(dec) {
    case 15:
      return "F";
      break;
    case 14:
      return "E";
      break;
    case 13:
      return "D";
      break;
    case 12:
      return "C";
      break;
    case 11:
      return "B";
      break;
    case 10:
      return "A";
      break;
    default:
      return "" + dec;
  }

  return "" + dec;
}

//Takes a RGB formatted color and returns a string that is a HEX RGB formatted
//shade of gray 26 RGB units closer to black than the Red value of the input
//Parameter color - a string of the format "rgb(r, g, b)"
function shade(color) {
  const currShade = parseInt(color.substring(4,7));
  //Regardless of how many digits in the r value, this will always parse to its
  //value correctly

  const newShade = ((currShade < 16) ? "0" : "") + //Add a leading 0 if needed
                   dec2hex(Math.max(0, currShade - 26));
  
  return "#" + newShade + newShade + newShade; //return hex RGB format string
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
      box.style.backgroundColor = "#FFFFFF"

      // Add drawing/Etch-a-Sketching functionality
      box.addEventListener("mouseover", () => 
                           { box.style.backgroundColor = shade(box.style.backgroundColor); });
    
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