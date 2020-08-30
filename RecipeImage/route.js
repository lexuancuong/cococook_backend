let router = require("express").Router();
let Model = require("./model");
let { tokenValidator } = require("../User/token");
var multer  = require('multer')
var upload = multer()

//Done: get all recipes, post a recipe, update a recipe, delete a recipe
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './public/images')
    },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() +'.jpg');
  }
})
var upload = multer({ storage: storage}); 

router.get("/", tokenValidator,function(req, res, next) {
  Model.read_by_recipe_id(req.body.recipe_id)
    .then(function(user){
      res.status(200).send(user);
    }) 
    .catch(next);
}); 

router.post("/", tokenValidator, upload.single('file'),function(req, res, next) {
  let recipe_id  = req.body.recipe_id;
  let {filename} = req.file
  console.log('xxxxx' + recipe_id)
  Model.create(recipe_id, '/public/images/'+ filename)
  .then((rows) =>{
    res.send(rows)
  })
  .catch((err) => {
    res.status(400).send(err);
    return;
  })
}); 
module.exports = router;
