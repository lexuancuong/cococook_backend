## Endpoints in Backend
### Le Xuan Cuong
``` POST /api/user/register ```
Example body:
```
{
    "username":"xxxx",
    "password":"xxx",
    "email":"cuong@gmail.com"
}
```

``` POST /api/user/login```
Example body:
```
{
    "username":"xxxx",
    "password":"xxx"
}
```

``` PUT /api/user/email```
Example body:
```
{
    "email":"xxxxx"
}
```

``` PUT /api/user/password```
Example body:
```
{
    "password":"xxxxx"
}
```

``` POST /api/recipe/```
Example body:
```
{
    "title":"xxxxx",
    "lotus":"0",
    "time":10,
    "serving":1,
    "calo":120,
    "type_ingredient":1,
    "type_time":1,
    "type_calo":1,
    "type_meal":1,
    "type_contry":1
}
```

``` GET /api/recipe/search/:name```

``` GET /api/recipe/``` - Get All Recipes

