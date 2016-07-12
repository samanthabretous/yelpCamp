var mongoose    = require("mongoose")
var Campground  = require("./models/campground")
var Comment     = require("./models/comment")

var data = [
  { 
    name: "Cloud's Rest", 
    image: "http://www.photosforclass.com/download/15944090146", 
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti."
  },  
  { 
    name: "Dessert Mesa", 
    image: "http://www.photosforclass.com/download/5733464781", 
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti."
  },
  { 
    name: "Wet Lands", 
    image: "http://www.photosforclass.com/download/2240973954", 
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti."
  }
]

function seedDB(){
  Campground.remove({}, function(err){
    //Remove all campgrounds
    if (err){
      console.log(err)
    }
    console.log("removed campgrounds")
      //add a few campgrounds
    data.forEach(function (seed){
      Campground.create(seed, function(err, campground){
        if (err){
          console.log(err)
        } else {
          console.log("added")
          //create a comment
          Comment.create(
            {
              text: "This place was great",
              author: "Homer"
            }, function(err, comment){
              if(err){
                console.log(err)
              } else {
                campground.comments.push(comment)
                campground.save()
                console.log("created new comment")
              }
          });
        }
      })
    });
  });

}

module.exports = seedDB;