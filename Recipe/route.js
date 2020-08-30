let router = require("express").Router();
let Model = require("./model");
let { tokenValidator } = require("../User/token");
router.get("/ingredient/:ingredient", tokenValidator, function(req, res, next) {
  let ingredient = req.params.ingredient
  Model.search_by_ingredient(ingredient)
    .then(function(user){
      res.status(200).send(user);
    }) 
    .catch(next);
}); 
router.get("/search/:name", tokenValidator, function(req, res, next) {
  let name = req.params.name 
  console.log(name)
  Model.search_by_name(name)
    .then(function(user){
      res.status(200).send(user);
    }) 
    .catch(next);
}); 

//Done: get all recipes, post a recipe, update a recipe, delete a recipe
router.get("/", tokenValidator, function(req, res, next) {
  Model.read_all()
    .then(function(user){
      res.status(200).send(user);
    }) 
    .catch(next);
}); 

router.post("/", tokenValidator, function(req, res, next) {
  let allowedFields = ["recipe_id","user_id","title", "lotus","time","serving","calo","type_ingredient","type_time","type_calo", "type_meal", "type_country"];
  let patch = {};
  try {
    allowedFields.forEach(function(key) {
      patch[key] = req.body[key];
    });
  } catch (message) {
    res.status(400).send({
      http: 400,
      code: "INVALID_INFO",
      message
    });
    return;
  }
  Model.create(patch)
  .then((rows) =>{
    res.send(rows)
  })
  .catch((err) => {
    res.status(400).send(err);
    return;
  })
}); 

router.put("/", tokenValidator, function(req, res, next) {
  let allowedFields = ["recipe_id","user_id","title", "lotus","time","serving","calo","type_ingredient","type_time","type_calo", "type_meal", "type_country"];
  let patch = {};
  try {
    allowedFields.forEach(function(key) {
      patch[key] = req.body[key];
    });
  } catch (message) {
    res.status(400).send({
      http: 400,
      code: "INVALID_INFO",
      message
    });
    return;
  }
  Model.update(patch)
  .then((rows) =>{
    res.send(rows)
  })
  .catch((err) => {
    res.status(400).send(err);
    return;
  })
}); 
router.delete("/", tokenValidator, function(req, res, next) {
  let { recipe_id } = req.body;
  Model.remove_by_id(recipe_id)
  .then((rows) =>{
    res.status(200).send(rows)
  })
  .catch((err) => {
    res.status(400).send(err);
    return;
  })
}); 
module.exports = router;
 