import { animator } from "./CreateFabricAnimation.js";
import { loadTextAnimator } from "./LoadTextAnimation.js";
// (function () {
// var objectArray = new Array();
export const createTextAnimator = (canvas, id, path, objectArray) => {
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
  const textanimItem = loadTextAnimator(canvas, textCanvas, path);
  // var objectArray = new Array();
  document.querySelector("#" + id).onclick = () => {
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
    // layer
    let id = canvas.getObjects().length - 1;
    $("#containerLayers").prepend(
      '<li id="' +
        id +
        '" class="ui-state-default actived"><span class="ui-icon ui-icon-arrow-2-n-s"></span> text ' +
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
};
