"use strict";

const express = require("express");
const { upload } = require("../helpers/filehelper");
const {
  singleFileUpload,
  multipleFileUpload,
  getallSingleFiles,
  getallMultipleFiles,
  getSearchedFiles,
  saveCanvas,
  retrieveCanvas,
  saveSelectedAnim,
  retrieveCanvasAnim,
  serveMainPage,
  serverMainJavascript,
  serveJsColor,
  serveFontFaceObserver,
  serveSearchMorph,
  serveAnimationService,
  serveStyleSheet,
  serveTextJsonFile
} = require("../controllers/fileuploaderController");
const router = express.Router();

router.post("/singleFile", upload.single("file"), singleFileUpload);
router.post("/multipleFiles", upload.array("files"), multipleFileUpload);
router.get("/main", serveMainPage);
router.get("/js/main.js", serverMainJavascript);
router.get("/lib/jscolor.js", serveJsColor);
router.get("/lib/fontfaceobserver.js", serveFontFaceObserver);
router.get("/js/searchMorph.js", serveSearchMorph);
router.get("/services/animationsServices.js", serveAnimationService);
router.get("/api/assets/anim/Text/TextComp2.json", serveTextJsonFile);

router.get("/assets/css/styles.css", serveStyleSheet);
router.get("/getSingleFiles", getallSingleFiles);
router.get("/getMultipleFiles", getallMultipleFiles);
router.get("/getSearchedFiles", getSearchedFiles);

router.post("/saveSelectedAnim", saveSelectedAnim);

router.get("/retrieveCanvas", retrieveCanvas);
router.get("/retrieveCanvasAndAnim", retrieveCanvasAnim);
router.post("/saveCanvas", saveCanvas);

module.exports = {
  routes: router,
};
