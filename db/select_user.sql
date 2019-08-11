SELECT * FROM h_users
WHERE
username = ${username}
AND
user_password = ${user_password}
RETURNING *;


-- username, user_password