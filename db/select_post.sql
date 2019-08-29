SELECT 
    u.user_id id,
    u.username username,
    u.user_image user_image,
    p.post_id  post_id,
    p.post_title title,
    p.post_image image,
    p.post_content post_content
FROM
    h_users u
JOIN posts p ON u.user_id = $1; --$1 reps p.user_id