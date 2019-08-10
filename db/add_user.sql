INSERT INTO h_users(username, user_password)
VALUES
(${username}, ${user_password} )
RETURNING *;