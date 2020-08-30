const express = require('express')
const bodyParser = require('body-parser')
require("dotenv").config();
const app = express()
app.use(express.static('public'))
let PORT = process.env.PORT || 3000;
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/', (request, response) => {
  response.json({ info: 'Cococook.net Backend API' })
})
app.use("/api/user", require("./User/user.route"));
app.use("/api/recipe", require("./Recipe/route"));
app.use("/api/ingredient", require("./Ingredient/route"));
app.use("/api/direction", require("./Direction/route"));
app.use("/api/recipeimage", require("./RecipeImage/route"));

//Error handling
app.use(function(err, req, res, next) {
  if (err.http) {
    res.status(err.http).send(err);
  } else {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})