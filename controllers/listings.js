const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
let mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req,res) => {
    const allLastings = await Listing.find({});
    res.render("./listings/index.ejs",{allLastings});
}

module.exports.RenderNewForm = (req,res) => {
    res.render("./listings/new.ejs");
}

module.exports.showListings = async (req,res) => {
    let { id } = req.params;
    const founddata = await Listing.findById(id).populate({
        path:"Reviews",
        populate: {
            path:"author",
        },
    }).populate("owner");
    if(!founddata){
        req.flash("error","Data is Not Found!");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { founddata });
}

module.exports.newListings = async (req,res,next) => {
   let response =await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
        .send()
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body.listing);
    newListing.image = {url, filename};
    newListing.owner = req.user._id;
    newListing.geometry = response.body.features[0].geometry;
    await newListing.save();
    req.flash("success","New Listing Was Created!");
    res.redirect("/listings");
}

module.exports.editListings = async (req,res) => {
    let { id } = req.params;
    const data = await Listing.findById(id);
    if(!data){
        req.flash("error","Data is Not Found!");
        res.redirect("/listings");
    }
    let originalimageurl = data.image.url;
    originalimageurl = originalimageurl.replace("/upload","/upload/h_220,w_350");
    res.render("./listings/edit.ejs", { data, originalimageurl });
}

module.exports.updateListings = async(req,res) => {
    let { id } = req.params;
   let listing =  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
   if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
   }
    req.flash("success","Listing Was Updated!");
    res.redirect(`/listings/${id}`)
}

module.exports.destroyListings = async (req,res) => {
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Was Deleted!");
    console.log("deleted sucessful");
    res.redirect("/listings");
}