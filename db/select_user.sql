SELECT username, user_password FROM h_users
WHERE
username = ${username}
AND
user_password = ${user_password};