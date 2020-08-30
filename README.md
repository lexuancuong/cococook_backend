## Endpoints in Backend
### Le Xuan Cuong
- `POST /api/account/register`: register a new account. Body must contain 3 fields (username, password, type). Response will contain the information of the newly created user along with a USER TOKEN. This token must be passed along <b>with every request </b> as a header "Authorization" in the form "Bearer \<token>". <br>
<i>A body accepted:</i>

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


## Achievement Criterion

- `GET /api/achievement-criterion/:id`: get achievement row of :id

- `POST /api/achievement-criterion/`: create a new achievement

<i>A body accepted:</i>

```

{
    "id": "Achv000008",
    "name":"asdasd",
    "description" : "asdasdasd"
}

```

- `PUT /api/achievement-criterion/`: update a existed achievement row.

- `DELETE /api/achievement-criterion/:id`: delete a existed achievement row have ID is :id


## Achievement Criterion Achievement

- `GET /api/achievement-criterion-achievement/:id1/:id2`: get the row that has accrit_id = :id1 and achv_id = id2

- `POST /api/achievement-criterion-achievement/`: create a new row

<i>A body accepted:</i>

```

{
    "id": "Achv000008",
    "name":"asdasd",
    "description" : "asdasdasd"
}

```

- `PUT /api/achievement-criterion-achievement/`: update a existed row.

- `DELETE /api/achievement-criterion-achievement/:id1/:id2`: delete the row that has accrit_id = :id1 and achv_id = id2
  


## Activity Data

- `GET /api/activity-data/:id`: get the row that has id = :id

- `POST /api/activity-data/`: create a new row

<i>A body accepted:</i>

```
{
    "id": "Act0000005",
    "type": 0,
    "header": "Ban Dau",
    "is_required": true,
    "max_score": 100,
    "sec_id": "Sec0000001"
}

```

- `PUT /api/activity-data/`: update a existed row.

- `DELETE /api/activity-data/:id`: delete the row that has id = :id

## Activity Progress

- `GET /api/activity-progress/:id`: get the row that has id = :id

- `POST /api/activity-progress/`: create a new row

<i>A body accepted:</i>

```

{
    "id": "aP00000015",
    "score": 0,
    "done": false,
    "sec_id": "Sec0000001"
}

```

- `PUT /api/activity-progress/`: update a existed row.

- `DELETE /api/activity-progress/:id`: delete the row that has id = :id

## Artifact

- `GET /api/artifact/:id`: get the row that has id = :id

- `POST /api/artifact/`: create a new row

<i>A body accepted:</i>

```
{
    "id": "Arti000003",
    "name": "Hoa sen",
    "description": "xxxxxx"
}

```

- `PUT /api/artifact/`: update a existed row.

- `DELETE /api/artifact/:id`: delete the row that has id = :id
  

## Chapter

- `GET /api/chapter/:id`: get the row that has id = :id

- `POST /api/chapter/`: create a new row

<i>A body accepted:</i>

```
{
    "id": "Ch00001",
    "name": "Hoa sen",
    "part_id": "P00001"
}
```

- `PUT /api/chapter/`: update a existed row.

- `DELETE /api/chapter/:id`: delete the row that has id = :id


## Collection

- `GET /api/collection/:id`: get the row that has id = :id

- `POST /api/collection/`: create a new row

<i>A body accepted:</i>

```
{
    "id": "Clt000002",
    "name": "Huys's  Collection",
    "description": "Bo suu tap cool ngau cua Huy",
    "style": "",
    "user_id": 0
}
```
Thank for w
