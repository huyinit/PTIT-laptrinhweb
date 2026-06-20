document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('paintCanvas');
  const ctx = canvas.getContext('2d');
  
  const colorPicker = document.getElementById('colorPicker');
  const brushSize = document.getElementById('brushSize');
  const sizeValue = document.getElementById('sizeValue');
  const btnBrush = document.getElementById('btnBrush');
  const btnEraser = document.getElementById('btnEraser');
  const btnClear = document.getElementById('btnClear');
  const btnSave = document.getElementById('btnSave');

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let currentColor = colorPicker.value;
  let currentSize = brushSize.value;
  let isEraserMode = false;

  // Initialize canvas dimensions and fill with a solid white background
  function initCanvas() {
    canvas.width = canvas.offsetWidth || 800;
    canvas.height = canvas.offsetHeight || 500;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    resetContextSettings();
  }

  // Restore context properties since resizing or clearing resets context settings
  function resetContextSettings() {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }

  // Preserve drawings during browser/container resize
  function resizeCanvas() {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(canvas, 0, 0);

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tempCanvas, 0, 0);
    resetContextSettings();
  }

  // Get mouse/touch coordinates relative to canvas
  function getCoordinates(e) {
    if (e.touches && e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      return [
        e.touches[0].clientX - rect.left,
        e.touches[0].clientY - rect.top
      ];
    }
    return [e.offsetX, e.offsetY];
  }

  // Drawing event handlers
  function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = getCoordinates(e);
  }

  function draw(e) {
    if (!isDrawing) return;
    const [x, y] = getCoordinates(e);
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = isEraserMode ? '#ffffff' : currentColor;
    ctx.lineWidth = currentSize;
    ctx.stroke();
    
    [lastX, lastY] = [x, y];
  }

  function stopDrawing() {
    isDrawing = false;
  }

  // Attach mouse listeners
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseleave', stopDrawing);

  // Attach touch listeners for mobile
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startDrawing(e);
  });
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    draw(e);
  });
  canvas.addEventListener('touchend', stopDrawing);

  // Controls input listeners
  colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
    isEraserMode = false;
    btnBrush.classList.add('active');
    btnEraser.classList.remove('active');
  });

  brushSize.addEventListener('input', (e) => {
    currentSize = e.target.value;
    sizeValue.textContent = currentSize;
  });

  // Tool selection buttons
  btnBrush.addEventListener('click', () => {
    isEraserMode = false;
    btnBrush.classList.add('active');
    btnEraser.classList.remove('active');
  });

  btnEraser.addEventListener('click', () => {
    isEraserMode = true;
    btnEraser.classList.add('active');
    btnBrush.classList.remove('active');
  });

  // Action buttons
  btnClear.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the canvas?')) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  });

  btnSave.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'canvas-drawing.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

  // Initialize and handle window resizing
  initCanvas();
  window.addEventListener('resize', resizeCanvas);
});
