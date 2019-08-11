SELECT
    u.user_id id_u,
    u.username username_u,
    u.user_image image_u,
    p.post_id  id_p,
    p.post_title title_p,
    p.post_image image_p,
    p.post_content content_p,
    p.user_id user_id_p
FROM
    halo_users u
INNER JOIN posts p ON u.user_id = $1; --$1 reps p.user_id