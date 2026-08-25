// ============================================
// LedgerLogic — Break-Even & Profit Visualizer
// Step 2: Calculation Logic
// ============================================

// --- 1. Grab all the DOM elements we'll need ---
const fixedCostInput = document.getElementById('fixedCost');
const variableCostInput = document.getElementById('variableCost');
const sellingPriceInput = document.getElementById('sellingPrice');
const calculateBtn = document.getElementById('calculateBtn');

const beQuantityEl = document.getElementById('beQuantity');
const beRevenueEl = document.getElementById('beRevenue');
const tcEquationEl = document.getElementById('tcEquation');
const trEquationEl = document.getElementById('trEquation');
const statusBox = document.getElementById('statusBox');

const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');


// --- 2. Listen for the button click ---
calculateBtn.addEventListener('click', () => {

  // Read the three input values.
  // Inputs always come in as STRINGS — convert them to numbers.
  const fixedCost = parseFloat(fixedCostInput.value);
  const variableCost = parseFloat(variableCostInput.value);
  const sellingPrice = parseFloat(sellingPriceInput.value);

  // Basic guard: don't proceed if any field is empty / not a number
  if (isNaN(fixedCost) || isNaN(variableCost) || isNaN(sellingPrice)) {
    statusBox.textContent = 'Please fill all three fields with valid numbers.';
    return;
  }



  function totalCost(Q) {
  return fixedCost + variableCost * Q;  
}

  function totalRevenue(Q) {
     return sellingPrice * Q;
  }

  let breakEvenQ = 0;
  if (sellingPrice > variableCost) {
    breakEvenQ = fixedCost / (sellingPrice - variableCost);
  }


  const breakEvenRevenue = totalRevenue(breakEvenQ);

  // Display the equations in human-readable form
  tcEquationEl.textContent = `TC = ${fixedCost} + ${variableCost}Q`;
  trEquationEl.textContent = `TR = ${sellingPrice}Q`;

  beQuantityEl.textContent = isFinite(breakEvenQ) ? breakEvenQ.toFixed(2) + ' units' : '—';
  beRevenueEl.textContent = isFinite(breakEvenRevenue) ? 'Rs. ' + breakEvenRevenue.toFixed(2) : '—';

  if (sellingPrice <= variableCost) {
    statusBox.textContent = 'Selling price must be greater than variable cost per unit.';
    statusBox.className = 'status neutral';
    return;
  }

  statusBox.textContent = `At ${breakEvenQ.toFixed(0)} units, cost = revenue. Below that, loss. Above that, profit.`;
  statusBox.className = 'status neutral';

  drawGraph(fixedCost, variableCost, sellingPrice, breakEvenQ, totalCost, totalRevenue);
});


// --- 3. Drawing the graph (Canvas logic — this part is given, not an exercise) ---
function drawGraph(fixedCost, variableCost, sellingPrice, breakEvenQ, totalCost, totalRevenue) {
  const width = canvas.width = canvas.offsetWidth;
  const height = canvas.height = canvas.offsetHeight;
  ctx.clearRect(0, 0, width, height);

  // We need to decide the range of Q (x-axis) we plot.
  // Let's plot from 0 up to 2x the break-even quantity, so the
  // intersection point sits roughly in the middle of the graph.
  const maxQ = breakEvenQ > 0 ? breakEvenQ * 2 : 100;
  const maxY = totalRevenue(maxQ);

  const padding = 40;

  // This function maps a REAL math point (Q, value) to a PIXEL
  // coordinate on the canvas. This is the "coordinate geometry in code"
  // moment — math's origin is bottom-left, canvas's origin is top-left.
  function toPixel(Q, value) {
    const x = padding + (Q / maxQ) * (width - 2 * padding);
    const y = height - padding - (value / maxY) * (height - 2 * padding);
    return { x, y };
  }

  // Draw axes
  ctx.strokeStyle = '#444';
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  // Draw TC line
  const tcStart = toPixel(0, totalCost(0));
  const tcEnd = toPixel(maxQ, totalCost(maxQ));
  ctx.strokeStyle = '#e55353';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(tcStart.x, tcStart.y);
  ctx.lineTo(tcEnd.x, tcEnd.y);
  ctx.stroke();

  // Draw TR line
  const trStart = toPixel(0, totalRevenue(0));
  const trEnd = toPixel(maxQ, totalRevenue(maxQ));
  ctx.strokeStyle = '#5b8def';
  ctx.beginPath();
  ctx.moveTo(trStart.x, trStart.y);
  ctx.lineTo(trEnd.x, trEnd.y);
  ctx.stroke();

  // Mark the break-even point
  const bePoint = toPixel(breakEvenQ, totalCost(breakEvenQ));
  ctx.fillStyle = '#ffd166';
  ctx.beginPath();
  ctx.arc(bePoint.x, bePoint.y, 5, 0, Math.PI * 2);
  ctx.fill();
}