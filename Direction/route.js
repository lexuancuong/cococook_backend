let router = require("express").Router();
let Model = require("./model");
let { tokenValidator } = require("../User/token");
//Done: get all recipes, post a recipe, update a recipe, delete a recipe
router.get("/", tokenValidator, function(req, res, next) {
  Model.read_by_recipe_id(req.body.recipe_id)
    .then(function(user){
      res.status(200).send(user);
    }) 
    .catch(next);
}); 

router.post("/", tokenValidator, function(req, res, next) {
  console.log(req.body)
  console.log('xxxxx-----')
  Model.create(req.body.recipe_id, req.body.content)
  .then((rows) =>{
    res.send(rows)
  })
  .catch((err) => {
    res.status(400).send(err);
    return;
  })
}); 
module.exports = router;
 