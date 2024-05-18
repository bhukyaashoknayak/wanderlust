const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapasync.js")
const { isLoggedIn, isOwner,validatelisting } = require("../middleware.js");
const listingcontroller = require("../controllers/listings.js");
const multer  = require('multer');
const { storage } = require("../CloudConfig.js");
const upload = multer({ storage });

router.route("/")
.get(wrapasync(listingcontroller.index))
.post(isLoggedIn,upload.single("listing[image]"),validatelisting, wrapasync(listingcontroller.newListings))

router.get("/new",isLoggedIn,listingcontroller.RenderNewForm)


router.route("/:id")
.get(wrapasync(listingcontroller.showListings))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validatelisting, wrapasync(listingcontroller.updateListings))
.delete(isLoggedIn,isOwner, wrapasync(listingcontroller.destroyListings))


router.get("/:id/edit",isLoggedIn,isOwner,wrapasync(listingcontroller.editListings))


module.exports = router;