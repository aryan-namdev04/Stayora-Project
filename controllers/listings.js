const Listing=require("../models/listing.js");
const axios = require("axios");
const getCoordinates = require("../utils/geocoding");

module.exports.index=async(req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}

module.exports.newForm=(req, res)=>{
    res.render("listings/new");
}

module.exports.showListing=async(req, res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path: "reviews", populate: {
        path: "author",
    },
}).populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show", {
    listing,
    coordinates: listing.geometry.coordinates
});
}


module.exports.createListing=async(req, res, next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url, filename};
    const coords = await getCoordinates(newListing.location);

    if (coords) {
    newListing.geometry = {
        type: "Point",
        coordinates: [coords.longitude, coords.latitude],
    };
}
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}

module.exports.editListing=async(req, res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit", { listing, originalImageUrl });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);

    // Update normal fields
    listing.title = req.body.listing.title;
    listing.description = req.body.listing.description;
    listing.price = req.body.listing.price;
    listing.location = req.body.listing.location;
    listing.country = req.body.listing.country;

    // Get new coordinates after location change
    const coords = await getCoordinates(listing.location);

    if (coords) {
        listing.geometry = {
            type: "Point",
            coordinates: [coords.longitude, coords.latitude],
        };
    }

    // Update image if uploaded
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
    }

    await listing.save();

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing=async(req, res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}