const connect = require('../db_connect.js')
exports.selectPosts = (cb) => {
  let sql = 'SELECT u.name, p.id, p.body FROM users u INNER JOIN posts p on u.id=p.user_id;';
  connect.query(sql, (err, result) => {
    if (err) return cb(new Error(err));
    cb(result.rows)
  })
}
exports.selectPost = (post_id,cb) => {
  let sql = {
    text:'SELECT u.name, p.id, p.body FROM users u INNER JOIN posts p on u.id=p.user_id where p.id=($1); ',
    values:[post_id]
  }
  connect.query(sql, (err, result) => {
    if (err) return cb(new Error(err));
    cb(result.rows)
  })
}

exports.selectUsers = (email, cb) => {
  let sql = {
    text: 'SELECT * FROM users where email=($1) ',
    values: [email]
  }
  connect.query(sql, (err, result) => {
    if (err) return cb(new Error(err));
    cb(result.rows)
  })
}
exports.selectUser = (name, cb) => {
  let sql = {
    text: 'SELECT * FROM users where name=($1) ',
    values: [name]
  }
  connect.query(sql, (err, result) => {
    if (err) return cb(new Error(err));
    cb(result.rows)
  })
}

exports.selectComments = (post_id,cb) => {
  let sql = {
    text:'SELECT c.body,u.name FROM comments c inner join users u on c.user_id=u.id where post_id=($1);',
    values:[post_id]

  }
  connect.query(sql, (err, result) => {
    if (err) return cb(new Error(err));
    cb(result.rows)
  })
}
