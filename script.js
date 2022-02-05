const sizeSelectorElement = document.getElementById("size-selector");
const sketchContainerElement = document.getElementById("sketch-container");
const sketchSizeElement = document.getElementById("sketch-size");
generateGrid(parseInt(sketchSizeElement.innerText));

sizeSelectorElement.addEventListener("input", (e) => {
  sketchSizeElement.innerText = e.target.value;
});

sizeSelectorElement.addEventListener("change", (e) => {
  generateGrid(parseInt(e.target.value));
});

/**
 *
 * @param {number} size size of the grid
 */
function generateGrid(size) {
  clearGrid();

  const width = sketchContainerElement.clientWidth;
  const gridCount = Math.pow(size, 2);
  const gridSize = width / size - 2; // subtract 2 for the border

  console.table({ gridCount, gridSize });

  for (i = 1; i <= gridCount; i++) {
    const d = document.createElement("div");
    d.style.height = gridSize + "px";
    d.style.width = gridSize + "px";
    d.style.border = "1px solid black";
    d.classList.add("sketch-item");
    sketchContainerElement.appendChild(d);
  }
}

function clearGrid() {
  while (sketchContainerElement.firstElementChild) {
    sketchContainerElement.firstElementChild.remove();
  }
}
