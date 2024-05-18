const express = require("express");
const router = express.Router({mergeParams: true});
const wrapasync = require("../utils/wrapasync.js")
const { validateReview,isLoggedIn,isReviewAuthor } = require("../middleware.js");
const listingcontroller = require("../controllers/reviews.js");


//post review route
router.post("/",isLoggedIn,validateReview,wrapasync(listingcontroller.ReviewNewPost));

//delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapasync(listingcontroller.destroyReview));

module.exports = router;