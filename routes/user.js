const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const listingcontroller = require("../controllers/users.js");

router.route("/signup")
.get(listingcontroller.signupRenderForm)
.post( wrapasync(listingcontroller.signUp))

router.route("/login")
.get(listingcontroller.loginFormRender)
.post(saveRedirectUrl,
passport.authenticate("local", { failureRedirect: '/login',failureFlash:true }),listingcontroller.Login);


router.get("/logout",listingcontroller.Logout)


module.exports = router;