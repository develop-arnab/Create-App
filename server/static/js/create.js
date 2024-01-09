import { create } from "./CanvasHelpers/CreateFabricArt.js";
import { createAndAddShapeToCanvas } from "../js/CanvasHelpers/shapesHelper.js";
import { createTextAnimator } from "./CanvasHelpers/createTextAnimator.js";
import { createArtAnimator } from "./CanvasHelpers/createArtAnimator.js";
import { createTextBox } from "./CanvasHelpers/createTextBox.js";
import { createImage } from "./CanvasHelpers/createImage.js";
const initCanvas = (id) => {
  return new fabric.Canvas(id, {
    width: 700,
    height: 680,
    selection: false,
    backgroundColor: "grey"
  });
};
const canvas = initCanvas("canvas");

// const canvas = new fabric.Canvas("canvas");
document.getElementById("canvas").fabric = canvas;

// $(document).ready(function () {
  ///// Create side panel div animations ////////
  var objectArray = new Array();
  const canvasCenter = canvas.getCenter();
  const circle = new fabric.Circle({
    radius: 50,
    fill: "#cccccc",
    left: canvasCenter.left,
    top: -50,
    originX: "center",
    originY: "center",
    cornerColor: "grey"
  });
  const createCirc = createAndAddShapeToCanvas(
    canvas,
    "createCircle",
    circle,
    objectArray
  );
  const rect = new fabric.Rect({
    width: 100,
    height: 100,
    fill: "#333",
    left: canvasCenter.left,
    top: canvasCenter.top,
    originX: "center",
    originY: "center",
    cornerColor: "blue",
    objectCaching: false
  });
  const createRec = createAndAddShapeToCanvas(
    canvas,
    "createRect",
    rect,
    objectArray
  );
  // const createText = createTextAnimator(
  //   canvas,
  //   "text-anim",
  //   "/assets/anim/Text/TextComp1.json",
  //   objectArray
  // );

  // const createText2 = createTextAnimator(
  //   canvas,
  //   "text-anim2",
  //   "/assets/anim/Text/TextComp25.json",
  //   objectArray
  // );

  const createArt = createArtAnimator(
    canvas,
    "doctor-anim",
    "http://localhost:8080/uploads/2022-01-24T20-01-36.288Z-cow.json",
    objectArray
  );

  const createArt2 = createArtAnimator(
    canvas,
    "demo-anim",
    "http://localhost:8080/uploads/2022-01-30T17-59-45.084Z-bat.json",
    objectArray
  );

  const textbox = createTextBox(canvas, "btnCreateText", objectArray);

  // var imageSource =
  //   "https://images.unsplash.com/photo-1475598322381-f1b499717dda?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&fit=crop&h=280&q=100";
  // const imageBox = createImage(
  //   canvas,
  //   "btnCreateImage",
  //   imageSource,
  //   objectArray
  // );
// })

document.addEventListener("DOMContentLoaded", function () {
  function handleAddImageClick(clickedImageSrc) {
    console.log("CALLING IMAGE with ", clickedImageSrc);
    createImage(canvas, "btnCreateImage", clickedImageSrc, objectArray);
  }

    document
      .getElementById("performSearch")
      .addEventListener("click", async function () {
        console.log("Searching animations");
        var searchQuery = document.getElementById("searchInput").value;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          search: searchQuery
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };

        // Make API call
        await fetch("https://server.shelltunes.com/api/search", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log("Returned data ", data);
            // Process the response and create divs
            const resultsContainer =
              document.getElementById("animation-result");
            resultsContainer.innerHTML = ""; // Clear previous results

            data.result.forEach((item, idx) => {
              const newDiv = document.createElement("div");
              newDiv.className = "panel__img";
              newDiv.id = `anim-${idx}`
              // var textanimView = bodymovin.loadAnimation({
              //   container: newDiv,
              //   renderer: "svg",
              //   loop: true,
              //   rendererSettings: {
              //     progressiveLoad: false
              //   },
              //   path: item.url.split("?")[0]
              // });
              resultsContainer.appendChild(newDiv);
              createArtAnimator(
                canvas,
                `anim-${idx}`,
                item.url.split("?")[0],
                objectArray
              );
            });
          })
          .catch((error) => console.error("Error fetching data:", error));
      });

  // Add an event listener to the "Add Image" button
  document
    .getElementById("btnCreateImage")
    .addEventListener("click", function () {
      console.log("CALLING IMAGE ");
      handleAddImageClick(lastClickedImageSrc);
    });

  var lastClickedImageSrc = "";

  // Add click event listeners to all images inside the panel__images div
  var images = document.querySelectorAll(".panel__images img");
  images.forEach(function (img) {
    img.addEventListener("click", function () {
      // Store the clicked image URL in lastClickedImageSrc variable
      lastClickedImageSrc = img.getAttribute("src");
      console.log("IMAGE SRC ", lastClickedImageSrc);
    });
  });

    const canvasColorListener = () => {
      const picker = document.getElementById("canvas-color-picker");
      picker.addEventListener("change", (event) => {
        console.log("COLOR", event.target.value);
        // color = event.target.value;
        // // canvas.freeDrawingBrush.color = color;
        // // canvas.freeDrawingBrush.width = 15;
        // canvas.getActiveObject().set("fill", color);
        // canvas.renderAll();
      });
       canvas.setBackgroundColor(
         event.target.value,
         canvas.renderAll.bind(canvas)
       );
    };
    canvasColorListener();

  // Function to update canvas properties
  function updateCanvas() {
    const newWidth =
      parseInt(document.getElementById("canvas-width").value) ||
      canvas.getWidth();
    const newHeight =
      parseInt(document.getElementById("canvas-height").value) ||
      canvas.getHeight();
    const newColor = document.getElementById("canvas-color-picker").value;

    // Update canvas properties
    canvas.setDimensions({
      width: newWidth,
      height: newHeight
    });

    canvas.setBackgroundColor(newColor, canvas.renderAll.bind(canvas));
  }

  // Event listeners for input changes
  document
    .getElementById("canvas-width")
    .addEventListener("input", updateCanvas);
  document
    .getElementById("canvas-height")
    .addEventListener("input", updateCanvas);
  document
    .getElementById("canvas-color-picker")
    .addEventListener("input", updateCanvas);

  // Initial canvas setup
  updateCanvas();
});
let color = "#000";

(function () {
  var oldVal;
  const setColorListener = () => {
    const picker = document.getElementById("color-picker");
    picker.addEventListener("change", (event) => {
      console.log("COLOR", event.target.value);
      color = event.target.value;
      // canvas.freeDrawingBrush.color = color;
      // canvas.freeDrawingBrush.width = 15;
      canvas.getActiveObject().set("fill", color);
      canvas.renderAll();
    });
  };
  setColorListener();
  $("#width").on("change textInput input", function () {
    var val = this.value;
    if (val !== oldVal) {
      oldVal = val;
      const scale = canvas.getActiveObject().getObjectScaling();
      console.log("Width", val);
      canvas.getActiveObject().set("width", val / scale.scaleX);
      canvas.getActiveObject().setCoords();
      canvas.renderAll();
    }
  });
})();

canvas.on({
  "selection:updated": OnAnimationSelected,
  "selection:created": OnAnimationSelected
});

function OnAnimationSelected(obj) {
  //Handle the object here
  // console.log("Animation SELECTED", obj.target._AECanvas.id);
}

// document.querySelector("#play").onclick = () => {
//   textanimItem2.play();
// };
// document.querySelector("#pause").onclick = () => {
//   textanimItem2.pause();
// };
// document.querySelector("#stop").onclick = () => {
//   textanimItem2.stop();
// };

slider.oninput = (e) => {
  console.log(
    e.target.value,
    parseInt(e.target.value, 10) / 25,
    doctoranimItem.frameModifier
  );
  doctoranimItem.goToAndStop((parseInt(e.target.value, 10) / 25) * 1000, false);
};

function objectMovedListener(ev) {
  let target = ev.target;
  console.log(
    "left",
    target.left,
    "top",
    target.top,
    "width",
    target.width * target.scaleX,
    "height",
    target.height * target.scaleY
  );
  document.getElementById("width").value = (
    target.width * target.scaleX
  ).toFixed(2);
  document.getElementById("height").value = (
    target.height * target.scaleY
  ).toFixed(2);
}

// canvas.on('object:added', objectAddedListener);
canvas.on("object:modified", objectMovedListener);


$(document).ready(function () {
  console.log("ready!");
  const restoreSavedCanvas = localStorage.getItem("savedItem");
  const restoreSelectedAnimation = localStorage.getItem("selectedAnim");

  const retrieveCanvasState = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/" + `retrieveCanvas`
      );
      console.log("RETURNED SEARCHED FILES", data);
      return data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };

  const retrieveCanvasAndAnim = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/" + `retrieveCanvasAndAnim`
      );
      console.log("Canvas and Anim ", data);
      return data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };

  if (restoreSelectedAnimation) {
    console.log("Canvas exists");

    retrieveCanvasAndAnim().then((savedCanvasAndAnim) => {
      console.log("Received Canvas And Anim: ", savedCanvasAndAnim);

      var selectedAnim = savedCanvasAndAnim.anim[0].fileName;
      console.log("SELECTED ANIM", selectedAnim);
      const fabricImage = new create(`http://localhost:8080/${selectedAnim}`, {
        scaleX: 0.5
      });

      var restoredCanvas = {
        version: savedCanvasAndAnim.canvas[0].version,
        objects: savedCanvasAndAnim.canvas[0].objects
      };

      console.log("Restored", restoredCanvas);

      localStorage.removeItem("selectedAnim");
      canvas.loadFromJSON(restoredCanvas);
      canvas.add(fabricImage);
      canvas.requestRenderAll();
    });
  } else {
    console.log("Canvas is not found");
  }

  if (restoreSavedCanvas) {
    console.log("Canvas exists");

    retrieveCanvasState().then((savedCanvas) => {
      console.log("Received : ", savedCanvas);

      var restoredCanvas = {
        version: savedCanvas[0].version,
        objects: savedCanvas[0].objects
      };

      console.log("Restored", restoredCanvas);

      localStorage.removeItem("savedItem");
      canvas.loadFromJSON(restoredCanvas);
      canvas.requestRenderAll();
    });
  } else {
    console.log("Canvas is not found");
  }
});



let currentMode;
const modes = {
  pan: "pan",
  drawing: "drawing"
};

const toggleMode = (mode) => {
  if (mode === modes.pan) {
    if (currentMode === modes.pan) {
      currentMode = "";
    } else {
      currentMode = modes.pan;
      canvas.isDrawingMode = false;
      canvas.renderAll();
    }
  } else if (mode === modes.drawing) {
    if (currentMode === modes.drawing) {
      currentMode = "";
      canvas.isDrawingMode = false;
      canvas.renderAll();
    } else {
      console.log(canvas.freeDrawingBrush.color);
      // canvas.freeDrawingBrush.color = color
      // canvas.freeDrawingBrush.width = 15

      currentMode = modes.drawing;
      canvas.isDrawingMode = true;
      canvas.renderAll();
    }
  }

  console.log(mode);
};


const svgState = {};
const clearCanvas = (canvas, svgState) => {
  svgState.val = canvas.toSVG();
  let obj = canvas.getObjects();
  console.log(obj);

  obj.forEach((o) => {
    // if(o !== canvas.backgroundImage) {
    //   canvas.remove(o)
    // }
    canvas.remove(o);
  });
};

const restoreCanvas = (canvas, svgState) => {
  if (svgState.val) {
    fabric.loadSVGFromString(svgState.val, (objects) => {
      console.log(objects);
      // objects = objects.filter((o) => o["xlink:href"] !== bgUrl);
      canvas.add(...objects);
      canvas.requestRenderAll();
    });
  }
};

// var imageSaver = document.getElementById("lnkDownload");
// imageSaver.addEventListener("click", saveImage, false);

function saveImage(e) {
  this.href = canvas.toDataURL({
    format: "png",
    quality: 0.8
  });
  console.log("Href", this.href);
  this.download = "canvas.png";
}

// var canvasSaver = document.getElementById("saveCanvasButton");
// canvasSaver.addEventListener("click", saveCanvas, false);

var jsonCanvas;

function saveCanvas(e) {
  jsonCanvas = JSON.stringify(canvas);
  console.log("Saved Canvas", jsonCanvas);
}

// var canvasLoader = document.getElementById("loadCanvasButton");
// canvasLoader.addEventListener("click", loadCanvas, false);

function loadCanvas() {
  // canvas.clear();
  console.log("Called Load CANVAS", jsonCanvas);
  // canvas.loadFromJSON(jsonCanvas, (objects) => {
  //   console.log("Objects", objects);
  //   // objects = objects.filter((o) => o["xlink:href"] !== bgUrl);
  //   canvas.add(...objects);
  //   canvas.requestRenderAll();
  //   console.log("LOADED CANVAS", jsonCanvas);
  // }).catch(console.error("Error"));
  //  canvas.clear();
  canvas.loadFromJSON(jsonCanvas);
  canvas.requestRenderAll();
}

var canvas_to_capture = $("canvas#canvas")[0];
var fps = 30,
  mediaRecorder;

function create_stream() {
  var canvasStream = canvas_to_capture.captureStream(fps);
  //create media recorder from the MediaStream object
  mediaRecorder = new MediaRecorder(canvasStream);
  var chunks = [];
  mediaRecorder.ondataavailable = function (e) {
    chunks.push(e.data);
  };
  //create dynamic video tag to
  mediaRecorder.onstop = function (e) {
    var blob = new Blob(chunks, { type: "video/mp4" });
    chunks = [];
    var videoURL = URL.createObjectURL(blob);
    var tag = document.createElement("a");
    tag.href = videoURL;
    tag.download = "sample.mp4";
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  };
  //build the data chunk
  mediaRecorder.ondataavailable = function (e) {
    chunks.push(e.data);
  };
  //start recording
  mediaRecorder.start();
}

var recordToggle = false;

const record = () => {
  if (!recordToggle) {
    startRecording();
    recordToggle = true;
  } else {
    stopRecording();
    recordToggle = false;
  }
};
const startRecording = () => {
  create_stream();
};
const stopRecording = () => {
  mediaRecorder.stop();
};
/*==================== SHOW NAVBAR ====================*/
// const showMenu = (headerToggle, navbarId) => {
//   const toggleBtn = document.getElementById(headerToggle),
//     nav = document.getElementById(navbarId);

//   // Validate that variables exist
//   if (headerToggle && navbarId) {
//     toggleBtn.addEventListener("click", () => {
//       // We add the show-menu class to the div tag with the nav__menu class
//       nav.classList.toggle("show-menu");
//       // change icon
//       toggleBtn.classList.toggle("bx-x");
//     });
//   }
// };
// showMenu("header-toggle", "navbar");

/*==================== LINK ACTIVE ====================*/
const linkColor = document.querySelectorAll(".nav__link");

function colorLink() {
  linkColor.forEach((l) => l.classList.remove("active"));
  this.classList.add("active");
}

linkColor.forEach((l) => l.addEventListener("click", colorLink));
