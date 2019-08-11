SELECT * FROM posts
WHERE (user_id != $1 AND
post_title LIKE $2)