var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")


//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
})

var Campground = mongoose.model("Campground", campgroundSchema)

// Campground.create(
//   {
//     name: "Mountain Goat's Rest", 
//     image: "https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",
//     description: "This is a huge granite hill, no bathrooms. No Water. Beautiful granite!"
    
//   }, function(err, campground){
//     if(err){
//       console.log("Error")
//     } else {
//       console.log("New Camp")
//       console.log(campground)
//     }
//   })


app.get("/", function(req, res){
  res.render("landing")
})

// INDEX route - show all campgrounds
app.get("/campgrounds", function(req, res){
  //get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log("ERROR")
    } else {
      res.render("index", {campgrounds: allCampgrounds})
    }
  })
})

//CREATE route- add new campground to database
app.post("/campgrounds", function(req, res){
  //get data from forn and add to campgrounds array
  var name = req.body.name
  var image = req.body.image
  var desc = req.body.description
  var newCampground = {name: name, image: image, description: desc}
  //Create a new campground and save to database
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log("ERROR")
    } else {
      //redirect back to campgrounds page
      res.redirect("/campgrounds")
    }
  })
})

//NEW route - show form to create new campground
app.get("/campgrounds/new", function(req, res){
  res.render("new.ejs")
})

//SHOW route - info about one item
app.get("/campgrounds/:id", function(req, res){
  //find the campground with provided ID
  Campground.findById(req.params.id, function(err, foundCampground){
    if (err){
      console.log(err)
    } else {
      //render show template with that campground
      res.render("show", {campground: foundCampground})
    }
  })
})

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("The YelpCamp Server Has Started!")
})