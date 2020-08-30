let db = require("../configs/db");
let { normaliseString , create_UUID} = require("../configs/type");

let read_all = () => {
    return db
    .query("SELECT * FROM Recipe")
    .then(function({rows}) {
      return rows;
    })
    .catch((err) => {
      throw { http: 400, code: "INVALID_ID", message: "Recipe's info of this ID does not exsist"};
    });
}

let read_by_id = (recipe_id) => {
  return db
  .query("SELECT * FROM Recipe where recipe_id = $1",[recipe_id])
  .then(function({rows}) {
    return rows[0];
  })
  .catch((err) => {
    throw { http: 400, code: "INVALID_ID", message: "Recipe's info of this ID does not exsist"};
  });
}

let read_by_user_id = (user_id) => {
  return db
  .query("SELECT * FROM Recipe where user_id = $1",[user_id])
  .then(function({rows}) {
    return rows;
  })
  .catch((err) => {
    throw { http: 400, code: "INVALID_ID", message: "Recipe's info of this ID does not exsist"};
  });
}

let remove_by_id = (recipe_id) => {
  return db
  .query("DELETE FROM Recipe where recipe_id = $1", [recipe_id])
  .then(function({rows}) {
    return {"status" : "Success"};

  })
  .catch((err) => {
    throw { http: 400, code: "INVALID_ID", message: "Section Status's info of this ID does not exsist"};
  });
}

//Update a new User
let update = (patch) => {
  let recipe_id = patch.recipe_id
  delete patch.recipe_id
  let modifier = Object.keys(patch)
    .map((key, idx) => `${key} = $${idx + 1}`)
    .join(", ");

  console.log("Modifier la:" + modifier)
  //console.log(Object.values(patch))
  return db
    .query(
      `UPDATE Recipe SET ${modifier} WHERE (recipe_id = '${recipe_id}') RETURNING *;`, 
      Object.values(patch)
    )
    .then(function({ rows }) {
      if (rows.length !== 1) {
        throw { http: 404, code: "NO_USER", message: "Recipe does not exist" };
      }
      return {"status" : "Success"}
    })
    .catch(function(err) {
      if (err.hint) {
        throw { http: 400, code: "INVALID_INFO", message: err.hint };
      }
      console.log(err)
      throw err;
    });
}
//Create a new User Row
function create(patch) {
  uuid = create_UUID()
  patch['recipe_id'] = uuid
  let modifier = Object.values(patch)
    .map((value) => `'${value}'`)
    .join(", ");
  console.log(modifier)
  return db
    .query(
      `INSERT INTO Recipe(recipe_id,user_id,title,lotus, time, serving, calo, type_ingredient, type_time, type_calo, type_meal, type_country) VALUES (${modifier});`)
    .then(function({ rows }) {
      console.log('xxxxxxx')
      return {"recipe_id" : uuid};
    })
    .catch((err) => {throw (err)});
}
let search_by_name = (name) =>{
  return db
  .query(`SELECT * FROM Recipe where title LIKE '%${name}%';`)
  .then(function({rows}) {
    return rows;
  })
  .catch((err) => {
    console.log(err)
    throw { http: 400, code: "INVALID_ID", message: "Recipe's info of this ID does not exsist"};
  });
}
let search_by_ingredient = (type_ingredient) =>{
  return db
  .query("SELECT * FROM Recipe where type_ingredient = $1",[type_ingredient])
  .then(function({rows}) {
    return rows;
  })
  .catch((err) => {
    throw { http: 400, code: "INVALID_ID", message: "Recipe's info of this ID does not exsist"};
  });
}
let search_by_meal = (type_meal) =>{
  return db
  .query("SELECT * FROM Recipe where type_meal = $1",[type_meal])
  .then(function({rows}) {
    return rows;
  })
  .catch((err) => {
    throw { http: 400, code: "INVALID_ID", message: "Recipe's info of this ID does not exsist"};
  });
}
let search_by_calo = (type_calo) =>{
  return db
  .query("SELECT * FROM Recipe where type_calo = $1",[type_calo])
  .then(function({rows}) {
    return rows;
  })
  .catch((err) => {
    throw { http: 400, code: "INVALID_ID", message: "Recipe's info of this ID does not exsist"};
  });
}
let search_by_country = (type_country) =>{
  return db
  .query("SELECT * FROM Recipe where type_country = $1",[type_country])
  .then(function({rows}) {
    return rows;
  })
  .catch((err) => {
    throw { http: 400, code: "INVALID_ID", message: "Recipe's info of this ID does not exsist"};
  });
}
let search_by_time = (type_time) =>{
  return db
  .query("SELECT * FROM Recipe where type_time = $1",[type_time])
  .then(function({rows}) {
    return rows;
  })
  .catch((err) => {
    throw { http: 400, code: "INVALID_ID", message: "Recipe's info of this ID does not exsist"};
  });
}

module.exports = {  
  read_all,
  read_by_id,
  read_by_user_id,
  remove_by_id, 
  create,
  update,
  search_by_ingredient,
  search_by_meal,
  search_by_time,
  search_by_calo,
  search_by_country,
  search_by_name 
};