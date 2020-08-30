DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Recipe;
DROP TABLE IF EXISTS Ingredient;
DROP TABLE IF EXISTS Direction;
DROP TABLE IF EXISTS RecipeImage;
DROP TABLE IF EXISTS UserProfile;
DROP TABLE IF EXISTS TypeIngredient;
DROP TABLE IF EXISTS TypeCalo;
DROP TABLE IF EXISTS TypeCountry;
DROP TABLE IF EXISTS TypeMeal;
DROP TABLE IF EXISTS TypeTime;
DROP TABLE IF EXISTS Notification;
CREATE TABLE Users(
    user_id serial,
    username char(255),
    hashed_password varchar(255),
    email varchar(255),
    PRIMARY KEY (user_id)
);
CREATE TABLE Recipe(
    recipe_id varchar(255),
    user_id int, 
    title varchar(255),
    lotus int,
    time int,
    serving int,
    calo int,
    type_ingredient int,
    type_time int,
    type_calo int,
    type_meal int,
    type_country int,
    PRIMARY KEY (recipe_id)
);
CREATE TABLE Ingredient(
    number int,
    recipe varchar(255),
    content varchar(255),
    PRIMARY KEY (number, recipe)
);

CREATE TABLE Direction(
    number int,
    recipe varchar(255),
    content varchar(255),
    PRIMARY KEY (number, recipe)
);
CREATE TABLE RecipeImage(
    recipe varchar(255),
    url_image varchar(255),
    PRIMARY KEY (recipe)
);
CREATE TABLE UserProfile(
    user_id int, 
    intro varchar(255), 
    role varchar(255),
    PRIMARY KEY (user_id)
);
CREATE TABLE TypeIngredient(
    id int,
    content varchar(255),
    PRIMARY KEY (id)
);
CREATE TABLE TypeCalo(
    id int,
    content varchar(255),
    PRIMARY KEY (id)
);
CREATE TABLE TypeTime(
    id int,
    content varchar(255),
    PRIMARY KEY (id)
);
CREATE TABLE TypeMeal(
    id int,
    content varchar(255),
    PRIMARY KEY (id)
);
CREATE TABLE TypeCountry(
    id int,
    content varchar(255),
    PRIMARY KEY (id)
);
CREATE TABLE Notification(
    user_id int,
    num_order int, 
    content varchar(255),
    PRIMARY KEY (user_id, num_order)
);