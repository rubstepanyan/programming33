var express = require("express");
var app = express();

app.use(express.static("gameOfLife"));

app.get("/", function(req, res){
   res.redirect("html.html");
});

app.listen(3000, function(){
   console.log("Example is running on port 3000");
});
