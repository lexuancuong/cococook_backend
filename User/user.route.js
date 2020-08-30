let router = require("express").Router();
let Account = require("./user.model");
let { generateToken, tokenValidator } = require("./token");

router.post("/register", function(req, res, next) {
    console.log('Got request: Register....')
    //Get Username, password and type in body request that was sent from client
    let { username, password, email} = req.body;
    console.log(req.body)
    Account.createAccount(username, password, email)
      .then(function(rows) {
        console.log('xxxx----',rows.user_id)
        res.status(201).send({
          ...rows, //Get everything in row
          token: generateToken(username,rows.id)
        }); 
      })
      .catch(next);
});

router.post("/login", function(req, res, next) {
  console.log('Got request: Login....')
  //Get Username, password in body request that was sent from client
  let { username, password } = req.body;
  Account.login(username, password)
    .then(function(user) {
      res.status(200).send({
        token: generateToken(username,user.id) //return token of user's login
      });
    })
    .catch(next);
});

router.get("/", tokenValidator, function(req, res, next) {
  let { username } = req.body;
  console.log(req.body)
  Account.findByUsername(username)
    .then(function(user) {
      res.status(200).send(user);
    })
    .catch(next);
});

router.put("/email", tokenValidator, function(req, res, next) {
  let { user_id, email } = req.body;
  console.log('Got requst')
  console.log(req.body)
  Account.update_email(user_id, email)
    .then(function(user) {
      res.status(200).send(user);
    })
    .catch(next);
});
router.put("/password", tokenValidator, function(req, res, next) {
  let { user_id, password } = req.body;
  console.log(req.body)
  Account.update_password(user_id, password)
    .then(function(user) {
      res.status(200).send(user);
    })
    .catch(next);
});
module.exports = router;
 