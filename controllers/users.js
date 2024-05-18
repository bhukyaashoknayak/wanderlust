const User = require("../models/user.js");

module.exports.signupRenderForm = (req,res) => {
    res.render("./users/signup.ejs");
}

module.exports.signUp = async(req,res) => {
    try{
    let { email,username,password } = req.body;
    let newuser = new User({ email, username });
    let registeduser = await User.register(newuser,password);
    req.flash("success","Wellcome to Wanderlust");
    console.log(registeduser);
    req.login(registeduser, (err) => {
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to Wanderlust");
        res.redirect("/listings");
    });
    }catch(er){
        req.flash("error",er.message);
        res.redirect("/signup");
    }
}

module.exports.loginFormRender = (req,res) => {
    res.render("./users/login.ejs");
}

module.exports.Login = async(req,res) => {
    req.flash("success","Wellcome back!");
    let RedirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(RedirectUrl);
}

module.exports.Logout = (req,res,next) => {
    req.logout((err) => {
     if(err){
        return next(err);
     }
     req.flash("success","You Logged out!");
     res.redirect("/listings");
    })
 }