CREATE TABLE h_users(
user_id SERIAL PRIMARY KEY,
username VARCHAR(50),
user_password VARCHAR(50),
user_image VARCHAR(600)
);


SELECT * FROM h_users;

SELECT username, user_password FROM h_users;

SELECT username, user_password FROM h_users
WHERE
username = 'a'
AND
user_password = 'a';

INSERT INTO h_users(username, user_password, user_image)
VALUES
('Dad', '1234', 'https://comicvine1.cbsistatic.com/uploads/scale_small/0/40/322001-149958-roland-deschain.jpg')
RETURNING *;
--things I need to do/things I need to pass off.
-- match   &    alter table join statement 

-- CREATE TABLE posts(
-- post_id SERIAL PRIMARY KEY,
-- user_id INT REFERENCES h_users(user_id),
-- post_title VARCHAR(150),
-- post_image VARCHAR(600),
-- post_content VARCHAR(1000)
-- );

-- INSERT INTO posts(post_title, post_image, post_content)
-- VALUES
-- ('Gunslinger Code', 'https://horrornovelreviews.files.wordpress.com/2013/01/darktowergunslinger1.jpg','I do not aim with my eye, He who aims with his eye has forgoteen the face of his father. I aim with my hand.')
-- RETURNING *;

-- SELECT * FROM posts;


CREATE TABLE halo_posts(
post_id SERIAL PRIMARY KEY,
post_title VARCHAR(255),
post_image VARCHAR(500),
post_content VARCHAR(255),
user_id INT,
FOREIGN KEY (user_id) REFERENCES halo_users (user_id)
);

-- join table
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
INNER JOIN posts p ON u.user_id = p.user_id;

SELECT * FROM posts
WHERE post_title = 'Gunslinger Code';

--creating a new post
INSERT INTO posts (user_id, post_title, post_image, post_content)
VALUES
(2, 'kids', 'https://longreadsblog.files.wordpress.com/2015/05/x0e59pobdtmmcbptzgknl6dlwol.jpg?w=1112', 'Not the best show');

--select user from h_users table.
SELECT * FROM h_users
WHERE user_id = 1;