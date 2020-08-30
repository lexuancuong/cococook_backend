CREATE OR REPLACE FUNCTION create_user(
    _username varchar(255),
    _hashed_password varchar(255),
    _email varchar(255)
)
RETURNS SETOF users AS
$$
BEGIN
	-- 	Check if username has been used yet
	IF EXISTS (SELECT * FROM users WHERE username = _username) THEN
 		RAISE unique_violation USING HINT = 'Username ' || _username || ' has been used';
	END IF;
	
	RETURN QUERY
	INSERT INTO
		users(username, hashed_password, email)
	VALUES
		(_username, _hashed_password, _email)
	RETURNING *;
END;
$$ LANGUAGE plpgsql;
SELECT * FROM create_user('xxxxx','12345','cuongle5033');	