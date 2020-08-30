let db = require("../configs/db");
let { normaliseString , create_UUID} = require("../configs/type");

let read_by_recipe_id = (recipe_id) => {
    return db
    .query("SELECT * FROM Direction where recipe = $1",[recipe_id])
    .then(function({rows}) {
      return rows;
    })
    .catch((err) => {
      throw { http: 400, code: "INVALID_ID", message: "Recipe's info of this ID does not exsist"};
    });
}
//Create a new User Row
function create(recipe_id, url_image) {
  values = `('${recipe_id}','${url_image}')`
  console.log(values)
  return db
    .query(`INSERT INTO RecipeImage(recipe,url_image) VALUES ${values};`)
    .then(function({ rows }) {
      return {"status" : "Success"};
    })
    .catch((err) => {throw (err)});
}  
module.exports = {  
  read_by_recipe_id,
  create
};