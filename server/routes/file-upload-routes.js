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
  serveConstantsFile,
  serveFontFaceObserver,
  serveSearchMorph,
  serveAnimationService,
  serveStyleSheet,
  serveTextJsonFile,
  serveTextJsonFile2
} = require("../controllers/fileuploaderController");
const router = express.Router();

router.post("/singleFile", upload.single("file"), singleFileUpload);
router.post("/multipleFiles", upload.array("files"), multipleFileUpload);
router.get("/main", serveMainPage);
router.get("/js/main.js", serverMainJavascript);
router.get("/lib/jscolor.js", serveJsColor);
router.get("/lib/fontfaceobserver.js", serveFontFaceObserver);
router.get("/js/searchMorph.js", serveSearchMorph);
router.get("/js/constants.js", serveConstantsFile);
router.get("/services/animationsServices.js", serveAnimationService);
router.get("/assets/anim/Text/TextComp2.json", serveTextJsonFile);
router.get("/assets/anim/Text/TextComp1.json", serveTextJsonFile2);

router.get("/assets/css/styles.css", serveStyleSheet);
router.get("/getSingleFiles", getallSingleFiles);
router.get("/getMultipleFiles", getallMultipleFiles);
router.get("/getSearchedFiles", getSearchedFiles);
router.get("/getSearchedFiles", getSearchedFiles);


router.post("/saveSelectedAnim", saveSelectedAnim);

router.get("/retrieveCanvas", retrieveCanvas);
router.get("/retrieveCanvasAndAnim", retrieveCanvasAnim);
router.post("/saveCanvas", saveCanvas);

module.exports = {
  routes: router,
};
