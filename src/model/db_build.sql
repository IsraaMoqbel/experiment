BEGIN;
DROP TABLE IF EXISTS users,posts,comments,votes CASCADE;
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(40) NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  phone VARCHAR(10),
  email VARCHAR NOT NULL
);
CREATE TABLE posts(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  body TEXT NOT NULL
);
CREATE TABLE comments(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  post_id INTEGER REFERENCES posts(id),
  body TEXT NOT NULL,
  parent_id INTEGER REFERENCES comments(id)
);
CREATE TABLE votes(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  post_id INTEGER REFERENCES posts(id)
);
INSERT INTO users (name,password,phone,email) VALUES
('israa','123','1234567890','israa@gmail.com'),
('salam','123','1234567890','sallam@gmail.com');

INSERT INTO posts (user_id,body) VALUES
(1,'This is my first post in this website!!!'),
(2,'This is the seconed post in this website!!!');

INSERT INTO comments (user_id,post_id,body,parent_id) VALUES
(1,2,'This is my first comment in this website!!!',1),
(1,2,'This is my second comment in this post!!!',2),
(2,1,'This is the second comment in this website!!!',1);

INSERT INTO votes (user_id, post_id) VALUES
(1,1),
(2,1);

COMMIT;
