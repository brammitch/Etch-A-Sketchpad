/**
 * @typedef {{h: number, s: number, v: number}} HSV
 */

const sketchContainerElement = document.getElementById("sketch-container");

// Grid color
let gridColor = "grayscale";
const grayscaleRadioElement = document.getElementById("grayscale");
const colorfulRadioElement = document.getElementById("colorful");

grayscaleRadioElement.addEventListener("click", () => {
  gridColor = "grayscale";
  generateGrid();
});

colorfulRadioElement.addEventListener("click", () => {
  gridColor = "colorful";
  generateGrid();
});

// Colorful grid
// https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
const GOLDEN_RATIO_CONJUGATE = 0.618033988749895;
let h = Math.random();

function getRandomColor() {
  h += GOLDEN_RATIO_CONJUGATE;
  h %= 1;
  const {r, g, b} = HSVtoRGB(h, 0.5, 0.95);
  return `rgb(${r}, ${g}, ${b})`;
}


/**
 * https://stackoverflow.com/a/17243070/4245038
 * @param {HSV | number} h either an object with h, s, v or a number
 * @param {number} s not required if h is an object
 * @param {number} v not required if h is an object
 * @returns r, g, b values
 */
function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
      s = h.s, v = h.v, h = h.h;
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
  }
  return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
  };
}

// Grid sizing
const sizeSelectorElement = document.getElementById("size-selector");
const sketchSizeElement = document.getElementById("sketch-size");
let size = 16;

generateGrid(parseInt(sketchSizeElement.innerText));

sizeSelectorElement.addEventListener("input", (e) => {
  size = e.target.value;
  sketchSizeElement.innerText = e.target.value;
});

sizeSelectorElement.addEventListener("change", (e) => {
  generateGrid();
});

function generateGrid() {
  clearGrid();

  const width = sketchContainerElement.clientWidth;
  const gridCount = Math.pow(size, 2);
  const gridSize = width / size - 2; // subtract 2 for the border

  for (i = 1; i <= gridCount; i++) {
    const d = document.createElement("div");
    d.style.height = gridSize + "px";
    d.style.width = gridSize + "px";
    d.style.border = "1px solid rgba(0, 0, 0, 0.75)";

    if (gridColor === "grayscale") {
      d.classList.add("grayscale-0");

      d.addEventListener("mouseenter", () => {
        const c = d.classList[0];
        let [color, num] = c.split("-");
        num = parseInt(num);
        if (num < 10) {
          num++;
          d.classList.remove(c);
          d.classList.add(`${color}-${num}`);
        }
      })
    } else {
        d.addEventListener("mouseenter", () => {
        d.style.backgroundColor = getRandomColor();
      });
    }

    sketchContainerElement.appendChild(d);
  }
}

function clearGrid() {
  while (sketchContainerElement.firstElementChild) {
    sketchContainerElement.firstElementChild.remove();
  }
}
