window.addEventListener("load", () => {
  const colorPallette = document.querySelectorAll(".color-pallette div");
  const brushes = document.querySelectorAll(".thickness div");
  const eraser = document.querySelector(".eraser");
  const rectangle = document.querySelector(".rectangle");
  const fillBrush = document.querySelector(".fill-color");
  let drawControl = { drawing: false, control: false };
  let shapeControl = { shapeDraw: false, shapeDrawing: false };
  let brushProperties = { brushColor: "#58b19f", brushSize: "25px" };
  let shapeProperties = {
    shapeX: null,
    shapeY: null,
    divPrevious: null,
    fillColor: false
  };

  fillBrush.addEventListener("click", () => {
    shapeProperties.fillColor = true;
    shapeControl.shapeDraw = false;
    drawControl.drawing = false;
  });

  rectangle.addEventListener("click", () => {
    shapeControl.shapeDraw = true;
    drawControl.drawing = false;
    shapeProperties.fillColor = false;
  });

  eraser.addEventListener("click", () => {
    brushProperties.brushColor = "#F8EFBA";
    shapeControl.shapeDraw = false;
    shapeProperties.fillColor = false;
  });

  brushes.forEach(brush => {
    brush.addEventListener("click", () => {
      brushProperties.brushSize = brush.className.split(" ")[0];
      shapeControl.shapeDraw = false;
      shapeProperties.fillColor = false;
    });
  });

  colorPallette.forEach(color => {
    color.addEventListener("click", () => {
      brushProperties.brushColor = color.className.split(" ")[0];
      shapeControl.shapeDraw = false;
    });
  });

  document.addEventListener("keydown", event => {
    if (event.ctrlKey) {
      drawControl.control = true;
    }
  });
  document.addEventListener("keyup", event => {
    if (event.keyCode == 17) {
      drawControl.control = false;
    }
  });

  document.body.addEventListener("mousedown", event => {
    if (!shapeControl.shapeDraw && !shapeProperties.fillColor) {
      drawControl.drawing = true;
    } else if (shapeControl.shapeDraw) {
      shapeControl.shapeDrawing = true;
      shapeProperties.shapeX = event.clientX;
      shapeProperties.shapeY = event.clientY;
    }
  });
  document.body.addEventListener("mouseup", () => {
    drawControl.drawing = false;
    shapeControl.shapeDrawing = false;
    shapeProperties.divPrevious = null;
  });

  document.body.addEventListener("mousemove", function(event) {
    if (drawControl.drawing) {
      const div = document.createElement("div");
      div.classList.add("drawing");
      div.style.top = `${event.clientY}px`;
      div.style.left = `${event.clientX}px`;
      div.style.background = brushProperties.brushColor;
      div.style.height = brushProperties.brushSize;
      div.style.width = brushProperties.brushSize;
      document.body.addEventListener("keydown", function(event) {
        if (event.keyCode == 67 && drawControl.control) {
          document.body.removeChild(div);
        }
      });
      document.body.appendChild(div);
    } else if (shapeControl.shapeDrawing) {
      if (shapeProperties.divPrevious)
        document.body.removeChild(shapeProperties.divPrevious);
      const div = document.createElement("div");
      div.classList.add("shape");
      div.style.top = `${shapeProperties.shapeY}px`;
      div.style.left = `${shapeProperties.shapeX}px`;
      div.style.height = `${event.clientY - shapeProperties.shapeY}px`;
      div.style.width = `${event.clientX - shapeProperties.shapeX}px`;
      shapeProperties.divPrevious = div;
      div.addEventListener("click", () => {
        console.log("click");
      });
      document.body.appendChild(div);
      document.body.addEventListener("keydown", function(event) {
        if (event.keyCode == 67 && drawControl.control) {
          document.body.removeChild(div);
        }
      });
    }
  });
});
