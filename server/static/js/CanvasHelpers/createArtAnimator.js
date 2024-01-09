import { animator } from "./CreateFabricAnimation.js";
import { loadAnimator } from "./LoadAnimation.js";
// (function () {
// var objectArray = new Array();
export const createArtAnimator = (canvas, id, path, objectArray) => {

    console.log("DID I CLICK ", id);

  const textAnimView = document.getElementById(id);
  var textanimView = bodymovin.loadAnimation({
    container: textAnimView,
    renderer: "svg",
    loop: true,
    rendererSettings: {
      progressiveLoad: false
    },
    path: path
  });

  const textCanvas = document.createElement("canvas");
  textCanvas.width = 800;
  textCanvas.height = 800;
  textCanvas.setAttribute("id", `${id}-canvas`);
  const textanimItem = loadAnimator(canvas, textCanvas, path);
  console.log("YOO ")
  // var objectArray = new Array();
  document.querySelector("#" + id).onclick = () => {
    const resultsContainer = document.getElementById("animation-result");
    resultsContainer.innerHTML = ""; // Clear previous results
    $("li").removeClass("actived");
    canvas.discardActiveObject();

    const textfabricImage = new animator(textCanvas, {
      scaleX: 0.5,
      scaleY: 0.5,
      needsItsOwnCache: () => {
        return true;
      },
      objectCaching: true
    });
    canvas.add(textfabricImage);
    objectArray.push(textfabricImage);
    canvas.requestRenderAll();
    console.log("MOVING INTO ", objectArray);

    function onObjectSelected(e) {
      console.log("Animation selected", e.target.get("type"));
    }
    canvas.on("object:selected", onObjectSelected);
    // layer
    let id = canvas.getObjects().length - 1;
    $("#containerLayers").prepend(
      '<li id="' +
        id +
        '" class="ui-state-default actived"><span class="ui-icon ui-icon-arrow-2-n-s"></span> art ' +
        id +
        "</li>"
    );
    $("#" + id).click(function (evt) {
      if ($(this).hasClass("actived")) {
        // remove active state of all layers and objects
        $("li").removeClass("actived");
        canvas.discardActiveObject();
        canvas.renderAll();
        console.log("ACTIVE ", id);
      } else {
        // remove active state of all layers and objects
        $("li").removeClass("actived");
        canvas.discardActiveObject();
        canvas.renderAll();
        // activate layer and object
        $(this).addClass("actived");
        var obj = canvas.item(id);
        canvas.setActiveObject(obj);
        canvas.renderAll();
        console.log("DE ACTIVE ", id);
      }
    });

    textfabricImage.on("selected", function () {
      console.log("SELECTED ANIM");
      $("li").removeClass("actived");
      $("#" + id).addClass("actived");
    });

    $("#containerLayers").sortable({
      update: function (event, ui) {
        $($("#containerLayers li").get().reverse()).each(function (
          index,
          list
        ) {
          if (objectArray[$(list).attr("id")]) {
            console.log(
              "MOVINGSORTS",
              objectArray,
              "Indexes ",
              index,
              "ids ",
              $(list).attr("id")
            );
            canvas.moveTo(objectArray[$(list).attr("id")], index);
            // canvas.renderAll();
          }
        });
        canvas.renderAll();
      }
    });
    $("#containerLayers").disableSelection();
  };

      // document.getElementById("play").addEventListener("click", function (e) {
      //   console.log("It was clicked");
      //   textanimItem.play();
      // });
      // document.getElementById("pause").addEventListener("click", function (e) {
      //   console.log("It was clicked");
      //   textanimItem.pause();
      // });
      // document.getElementById("stop").addEventListener("click", function (e) {
      //   console.log("It was clicked");
      //   textanimItem.stop();
      // });
};
