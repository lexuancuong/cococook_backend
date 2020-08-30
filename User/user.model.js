let db = require("../configs/db");
let bcrypt = require("bcrypt");
let { normaliseString } = require("../configs/type");
const { isMainThread } = require("worker_threads");

let findByUsername = (username) => {
    return db
      .query("SELECT * FROM account where username = $1", [username])
      .then(function({rows}) {
        rows = normaliseString(rows[0])
        delete rows.password
        return rows;
      })
      .catch(function(err) {
        if (err.hint) {
          throw { http: 400, code: "Username", message: "ID does not exsist"};
        }
        throw err;
    });
}

let findIDByUsername = (username) => {
  return db
    .query("SELECT user_id FROM account where username = $1", [username])
    .then(function({rows}) {
      rows = normaliseString(rows[0])
      return rows.user_id;
    })
    .catch(function(err) {
      if (err.hint) {
        throw { http: 400, code: "Username", message: "ID does not exsist"};
      }
      throw err;
  });
}

//Register
let createAccount = (username, password, email) => {
    console.log(username)
    username = username.trim()

    password = bcrypt.hashSync(password, 10);
    return db
    // Call function because in database, we must made a lot of query for solve it  
      .query("SELECT * FROM create_user($1, $2, $3)", [username, password, email])
      .then(function({ rows }) {
        rows = normaliseString(rows[0])
        delete rows.hashed_password
        return rows;
      })
      .catch(function(err) {
        console.log(err)
        if (err.hint) {
          throw { http: 400, code: "INVALID_INFO", message: err.hint };
        }
        throw err;
      });
}


let login = (username, password) => {
  return db.query("SELECT * FROM Users WHERE username=$1", [username])
  .then(function({ rows }) {
    if (rows.length !== 1) {
      throw { http: 404, code: "NO_USER", message: "User does not exist" };
    }
    let user = normaliseString(rows[0]);
    //Compare password with hashed password in db
    if (bcrypt.compareSync(password, user.hashed_password)){
      delete user.hashed_password;
      return user;
    } else {
      throw { http: 400, code: "WRONG_PASSWORD", message: "Wrong password" };
    }
  });
}

let update_password = (id, password) => {
  if (password == null){
    throw { http: 404, code: "INVALID_INFO", message: "Dont have enough parameter" };
  }
  console.log(password)
  password = bcrypt.hashSync(password, 10);
  return db
    .query("UPDATE Users SET hashed_password = $1 where user_id = $2", [password, id])
    .then(function({ rows }) {
      return {status : "Success"};
    })
    .catch(function(err) {
      if (err.hint) {
        throw { http: 400, code: "INVALID_INFO", message: err.hint };
      }
      throw err;
    });
}
let update_email = (id, email) => {
  return db
    .query("UPDATE Users SET email = $1 where user_id = $2", [email, id])
    .then(function({ rows }) {
      return {status : "Success"};
    })
    .catch(function(err) {
      if (err.hint) {
        throw { http: 400, code: "INVALID_INFO", message: err.hint };
      }
      throw err;
    });
}
module.exports = {
    createAccount, 
    login,
    update_password, 
    update_email
};